const Job = require('../models/Job');

class JobMatcher {
  static async findMatchingJobs(resumeData) {
    const { skills } = resumeData;

    if (!skills || skills.length === 0) {
      return [];
    }

    const matchingJobs = await Job.find({
      requirements: { $in: skills.map(skill => new RegExp(skill, 'i')) }
    }).limit(10);

    return matchingJobs;
  }
}

module.exports = JobMatcher;