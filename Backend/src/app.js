const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



app.use((error, req, res, next) => {
    console.error(error)
    if (error instanceof multer.MulterError) {
        const message = error.code === "LIMIT_FILE_SIZE"
            ? "Resume must be 3 MB or smaller."
            : "Only PDF resumes are supported."
        return res.status(400).json({ message })
    }
    if (error.status === 503 && error.message?.includes("AI service is temporarily busy")) {
        return res.status(503).json({ message: error.message })
    }
    res.status(error.status || 500).json({
        message: error.message || "Unable to generate the interview report. Please try again."
    })
})

module.exports = app
