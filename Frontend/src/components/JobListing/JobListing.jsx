import React from 'react';

const JobListing = ({ job }) => {
  return (
    <div className="job-listing">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>{job.description}</p>
      <ul>
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobListing;