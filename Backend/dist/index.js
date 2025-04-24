"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// MongoDB Connection
mongoose_1.default.connect("mongodb+srv://mohfazam:wPlvY91k1HgmrD13@cluster0.f8f0e.mongodb.net/HireMateDB?retryWrites=true&w=majority")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
// Job Seeker Auth
//@ts-ignore
app.post('/api/jobseeker/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (yield db_1.JobSeeker.findOne({ email }))
            return res.status(400).json({ message: "User exists" });
        const newUser = new db_1.JobSeeker({
            name,
            email,
            password: yield bcrypt_1.default.hash(password, 10)
        });
        yield newUser.save();
        res.status(201).json({ message: "Job seeker created" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
//@ts-ignore
app.post('/api/jobseeker/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield db_1.JobSeeker.findOne({ email });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login success" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
// Recruiter Auth\
//@ts-ignore
app.post('/api/recruiter/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, company } = req.body;
        if (yield db_1.Recruiter.findOne({ email }))
            return res.status(400).json({ message: "User exists" });
        const newUser = new db_1.Recruiter({
            name,
            email,
            password: yield bcrypt_1.default.hash(password, 10),
            company
        });
        yield newUser.save();
        res.status(201).json({ message: "Recruiter created" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
//@ts-ignore
app.post('/api/recruiter/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield db_1.Recruiter.findOne({ email });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login success" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
// Job Listings
app.post('/api/jobs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, requirements, location, salaryRange } = req.body;
        const newJob = new db_1.Job({ title, description, requirements, location, salaryRange });
        yield newJob.save();
        res.status(201).json(newJob);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create job" });
    }
}));
app.get('/api/jobs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield db_1.Job.find();
        res.json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get jobs" });
    }
}));
//@ts-ignore
app.post('/api/jobs/:jobId/apply', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId } = req.params;
        // Add validation for jobId
        if (!mongoose_1.default.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid job ID" });
        }
        const { name, email, resume, analysis } = req.body;
        const job = yield db_1.Job.findById(jobId);
        if (!job)
            return res.status(404).json({ message: "Job not found" });
        // Add validation for required fields
        if (!name || !email || !resume || !analysis) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newApplication = new db_1.Application({
            jobId,
            name,
            email,
            resume,
            analysis
        });
        yield newApplication.save();
        res.status(201).json({
            message: "Application submitted",
            application: newApplication
        });
    }
    catch (error) {
        console.error("Application Error:", error);
        res.status(500).json({
            message: "Application failed",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}));
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
