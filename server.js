import express from "express";
import 'dotenv/config';
import cors from "cors";
import { getSummary } from "./exaService.js"; // ✅ Import the function

const app = express();
const PORT = 5002;

console.log("Backend EXA API Key:", process.env.EXA_API_KEY);

app.use(cors({
    origin: ["http://localhost:5173", "https://hybin21.github.io"],
    credentials: true,
}));
app.use(express.json());

app.post("/api/movie-summary", async (req, res) => {
    const { movieTitle } = req.body;

    if (!movieTitle) {
        return res.status(400).json({ error: "Movie title is required" });
    }

    try {
        const summary = await getSummary(movieTitle);  // ✅ Use function from exaService.js
        res.json({ summary });
    } catch (error) {
        console.error("Error fetching movie summary:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
