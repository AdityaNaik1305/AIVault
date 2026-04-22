import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, getAuth, clerkClient } from '@clerk/express'
import { v2 as cloudinary } from 'cloudinary'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './configs/cloudinart.js'
import userRouter from './routes/UserRoutes.js'

const app = express()

await connectCloudinary()
app.use(cors())
app.use(express.json())

// ✅ Clerk middleware
app.use(
  clerkMiddleware({
    // 👇 THIS IS IMPORTANT
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  })
);

app.use('/api/ai',aiRouter)
app.use('/api/user', userRouter)

app.post("/api/update-plan", async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        plan: "premium",
      },
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});
const PORT = process.env.PORT || 3000
// server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Public route
app.get('/', (req, res) => {
  res.send('server is live')
})

// ✅ Protected route (NEW WAY)
app.get('/protected', async (req, res) => {
  const { userId } = getAuth(req)

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})

//const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})