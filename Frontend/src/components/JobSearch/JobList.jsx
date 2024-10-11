import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobListing from '../JobListing/JobListing';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      {jobs.map(job => (
        <JobListing key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;