"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = exports.Recruiter = exports.JobSeeker = exports.Application = void 0;
// src/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
// Job Seeker
const JobSeekerSchema = new mongoose_1.default.Schema({
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
const RecruiterSchema = new mongoose_1.default.Schema({
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
const JobSchema = new mongoose_1.default.Schema({
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
const ApplicationSchema = new mongoose_1.default.Schema({
    jobId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    resume: {
        type: String // Store URL or text
    }
}, { timestamps: true });
exports.Application = mongoose_1.default.model('Application', ApplicationSchema);
exports.JobSeeker = mongoose_1.default.model('JobSeeker', JobSeekerSchema);
exports.Recruiter = mongoose_1.default.model('Recruiter', RecruiterSchema);
exports.Job = mongoose_1.default.model('Job', JobSchema);
