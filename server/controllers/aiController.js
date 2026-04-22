import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from 'cloudinary';
import { getAuth } from '@clerk/express'
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import axios from "axios";
import FormData from "form-data";
import { error } from "console";
import Replicate from "replicate";
import { createRequire } from "module";


export const generateArticle = async (req, res) => {
  try {
    console.log("STEP 1: Controller hit");

    // 🔐 Auth
    const { userId } = getAuth(req);
    console.log("USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 📥 Input
    const { prompt, length } = req.body;

    if (!prompt) {
      return res.json({
        success: false,
        message: "Prompt is required",
      });
    }

    // 🔥 Init Gemini
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY, // ✅ FIXED
    });
    console.log("API KEY:", process.env.GEMINI_API_KEY);

    let content = "Failed to generate content";

    try {
      console.log("STEP 2: Calling AI");

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview", // ✅ FIXED
        contents: `${prompt}. Write in ${length || 800} words.`,
      });

      content = result.text || content;

      console.log("STEP 3: AI success");

    } catch (err) {
      console.error("Gemini error:", err.message);
      content = "AI service temporarily unavailable. Please try again.";
    }

    // 💾 Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    console.log("STEP 4: Saved to DB");

    // ✅ Response
    return res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const generateBlogTitles = async (req, res) => {
  try {
    console.log("STEP 1: BlogTitles Controller hit");

    // 🔐 Auth
    const { userId } = getAuth(req);
    console.log("USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 📥 Input
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({
        success: false,
        message: "Prompt is required",
      });
    }

    // 🔥 Init Gemini (same as generateArticle)
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    let content = "Failed to generate titles";

    try {
      console.log("STEP 2: Calling AI (Blog Titles)");

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate 5 catchy, SEO-friendly blog titles for: ${prompt}. Return each title on a new line.`,
      });

      content = result.text || content;

      console.log("STEP 3: AI success (Blog Titles)");

    } catch (err) {
      console.error("Gemini error:", err.message);
      content = "AI service temporarily unavailable. Please try again.";
    }

    // 💾 Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog_titles')
    `;

    console.log("STEP 4: Saved to DB (Blog Titles)");

    // ✅ Response
    return res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const socialMediaGenerator = async (req, res) => {
  try {
    console.log("STEP 1: SocialMedia Controller hit");

    // 🔐 Auth
    const { userId } = getAuth(req);
    console.log("USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 📥 Input
    const { prompt, platform } = req.body;

    if (!prompt || !platform) {
      return res.json({
        success: false,
        message: "Prompt and platform are required",
      });
    }

    // 🔥 Init Gemini (same as generateArticle)
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    let content = "Failed to generate social media post";

    try {
      console.log("STEP 2: Calling AI (Social Media)");

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate an engaging and highly-shareable social media post for ${platform} about: ${prompt}. Include appropriate hashtags and emojis. Make the tone suitable for the specific platform.`,
      });

      content = result.text || content;

      console.log("STEP 3: AI success (Social Media)");

    } catch (err) {
      console.error("Gemini error:", err.message);
      content = "AI service temporarily unavailable. Please try again.";
    }

    // 💾 Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'social_media')
    `;

    console.log("STEP 4: Saved to DB (Social Media)");

    // ✅ Response
    return res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const reviewResume = async (req, res) => {
  try {
    console.log("STEP 1: Resume Review Controller hit");

    // 🔐 Auth
    const { userId } = getAuth(req);
    console.log("USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 📄 File check
    if (!req.file) {
      return res.json({
        success: false,
        message: "File not received",
      });
    }

    // 📥 Extract PDF text
    const uint8Array = new Uint8Array(req.file.buffer);

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      resumeText += pageText + "\n";
    }

    console.log("PDF TEXT:", resumeText.slice(0, 200));

    // ❌ Validation
    if (!resumeText.trim()) {
      return res.json({
        success: false,
        message: "Could not extract text from resume",
      });
    }

    // 🤖 Init Gemini
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    let content = "Failed to review resume";

    try {
      console.log("STEP 2: Calling AI (Resume Review)");

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `
You are an expert resume reviewer and ATS system.

Analyze the following resume and provide:

1. Overall Score (out of 10)
2. ATS Compatibility Score (out of 100)
3. Strengths (bullet points)
4. Weaknesses (bullet points)
5. Suggestions for improvement
6. Missing keywords/skills
7. Improved summary (rewrite professionally)

Resume:
${resumeText}
        `,
      });

      content = result.text || content;

      console.log("STEP 3: AI success (Resume Review)");
    } catch (err) {
      console.error("Gemini error:", err.message);
      content = "AI service temporarily unavailable. Please try again.";
    }

    // 💾 Save to DB
    await sql`
  INSERT INTO creations (user_id, prompt, content, type)
  VALUES (${userId}, ${"Resume Review"}, ${content}, 'resume-review')
  `;

    console.log("STEP 4: Saved to DB (Resume Review)");

    // ✅ Response
    return res.json({
      success: true,
      review: content,
    });

  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};