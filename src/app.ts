import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(express.json());


// Stats Check
app.get("/api/v1", (req: express.Request, res: express.Response) => {
    res.json({
        message: "API is working",
        body: req.body,
    });
});

// Routes
app.use("/api/", authRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
