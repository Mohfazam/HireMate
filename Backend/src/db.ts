// src/db.ts
import mongoose from 'mongoose';

// Job Seeker
const JobSeekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  }
});

// Recruiter
const RecruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  }
});

// Job Listing (Simplified)
const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required']
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: {
    type: [String],
    required: [true, 'At least one requirement is needed']
  },
  location: {
    type: String,
    required: [true, 'Job location is required']
  },
  salaryRange: {
    type: String,
    required: [true, 'Salary range is required']
  }
});

export const JobSeeker = mongoose.model('JobSeeker', JobSeekerSchema);
export const Recruiter = mongoose.model('Recruiter', RecruiterSchema);
export const Job = mongoose.model('Job', JobSchema);