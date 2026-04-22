import express from "express";
import { generateArticle } from "../controllers/aiController.js";
import { getAuth } from '@clerk/express'
import { generateBlogTitles } from "../controllers/aiController.js";
import { socialMediaGenerator } from "../controllers/aiController.js";
import upload from "../configs/multer.js";
import { reviewResume } from "../controllers/aiController.js";


const requireAuthMiddleware = (req, res, next) => {
  const { userId } = getAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })
  next()
}
const aiRouter = express.Router();

aiRouter.post('/generate-article', generateArticle)
aiRouter.post('/generate-blog-titles', requireAuthMiddleware, generateBlogTitles)
aiRouter.post('/social-media-generator', requireAuthMiddleware, socialMediaGenerator)
aiRouter.post("/resume-review",upload.single("file"), reviewResume);





export default aiRouter;