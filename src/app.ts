import express from 'express';
import dotenv from 'dotenv';
import { register, hello, login } from './controllers/auth.controller.js';
import { requireAuth } from './middlewares/auth.middleware.js';
import authRoutes from './routes/auth.route.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(express.json());

// Health check
app.get("/health", (req: express.Request, res: express.Response) => {
  res.json({ status: "OK" });
});

// Example API route
app.post("/api/v1", (req: express.Request, res: express.Response) => {
  res.json({
    message: "API is working",
    body: req.body,
  });
});

app.use("/api/", authRoutes);

app.post("/api/register", register);

app.post("/api/hello", requireAuth, hello);

app.post("/api/login", login);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
