// src/index.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { JobSeeker, Recruiter } from "./db";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://mohfazam:wPlvY91k1HgmrD13@cluster0.f8f0e.mongodb.net/HireMateDB?retryWrites=true&w=majority")
  .then(() => console.log("Successfully Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));

// Job Seeker Routes
//@ts-ignore

app.post('/api/jobseeker/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await JobSeeker.findOne({ email });
    if(existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newJobSeeker = new JobSeeker({ name, email, password: hashedPassword });
    await newJobSeeker.save();
    
    res.status(201).json({ message: "Job seeker created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
//@ts-ignore

app.post('/api/jobseeker/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await JobSeeker.findOne({ email });

    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Recruiter Routes
//@ts-ignore

app.post('/api/recruiter/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, company } = req.body;
    
    const existingUser = await Recruiter.findOne({ email });
    if(existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRecruiter = new Recruiter({ name, email, password: hashedPassword, company });
    await newRecruiter.save();
    
    res.status(201).json({ message: "Recruiter created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//@ts-ignore

app.post('/api/recruiter/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Recruiter.findOne({ email });

    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server Running at port 3000");
});