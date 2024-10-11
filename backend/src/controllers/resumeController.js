const { spawn } = require('child_process');
const path = require('path');
const JobMatcher = require('../services/jobMatcher');

exports.parseResume = async (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: 'Resume text is required' });
  }

  const pythonProcess = spawn('python', [
    path.join(__dirname, '..', '..', 'nlp_module', 'src', 'resume_parser.py')
  ]);

  let parsedData = '';

  pythonProcess.stdout.on('data', (data) => {
    parsedData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on('close', async (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Error parsing resume' });
    }
    try {
      const result = JSON.parse(parsedData);
      const matchingJobs = await JobMatcher.findMatchingJobs(result);
      res.json({ parsedResume: result, matchingJobs });
    } catch (error) {
      res.status(500).json({ error: 'Error parsing resume data' });
    }
  });

  pythonProcess.stdin.write(resumeText);
  pythonProcess.stdin.end();
};