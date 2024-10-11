const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      postedBy: req.user._id
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'username');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'username');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ error: 'Job not found or unauthorized' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id });
    if (!job) {
      return res.status(404).json({ error: 'Job not found or unauthorized' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Additional function to search jobs
exports.searchJobs = async (req, res) => {
  try {
    const { query } = req.query;
    const jobs = await Job.find({ 
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).populate('postedBy', 'username');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get jobs by user
exports.getJobsByUser = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).populate('postedBy', 'username');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};