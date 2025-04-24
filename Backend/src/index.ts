// src/index.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { JobSeeker, Recruiter, Job, Application } from "./db";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://mohfazam:wPlvY91k1HgmrD13@cluster0.f8f0e.mongodb.net/HireMateDB?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Job Seeker Auth
//@ts-ignore

app.post('/api/jobseeker/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (await JobSeeker.findOne({ email })) return res.status(400).json({ message: "User exists" });
    
    const newUser = new JobSeeker({ 
      name, 
      email, 
      password: await bcrypt.hash(password, 10) 
    });
    await newUser.save();
    res.status(201).json({ message: "Job seeker created" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
//@ts-ignore

app.post('/api/jobseeker/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await JobSeeker.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login success" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Recruiter Auth\
//@ts-ignore

app.post('/api/recruiter/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, company } = req.body;
    if (await Recruiter.findOne({ email })) return res.status(400).json({ message: "User exists" });
    
    const newUser = new Recruiter({ 
      name, 
      email, 
      password: await bcrypt.hash(password, 10),
      company 
    });
    await newUser.save();
    res.status(201).json({ message: "Recruiter created" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
//@ts-ignore
app.post('/api/recruiter/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Recruiter.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login success" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Job Listings
app.post('/api/jobs', async (req: Request, res: Response) => {
  try {
    const { title, description, requirements, location, salaryRange } = req.body;
    const newJob = new Job({ title, description, requirements, location, salaryRange });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
});

app.get('/api/jobs', async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to get jobs" });
  }
});
//@ts-ignore
app.post('/api/jobs/:jobId/apply', async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const { name, email, resume, analysis } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const newApplication = new Application({
      jobId,
      name,
      email,
      resume,
      analysis
    });

    await newApplication.save();
    
    res.status(201).json({
      message: "Application submitted",
      application: newApplication
    });

  } catch (error) {
    res.status(500).json({ message: "Application failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});