const express = require("express"); //Erm, what the sigma
const { MongoClient } = require("mongodb");
const path = require("path");
const { check, validationResult } = require("express-validator");

const app = express();
const port = process.env.PORT || 8080;
const mongoUrl = process.env.MONGO_URL;
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!mongoUrl || !adminUsername || !adminPassword) {
    console.error(
        "Missing environment variables. Please check the .env file. Required variables are MONGO_URL, ADMIN_USERNAME, and ADMIN_PASSWORD."
    );
    process.exit(1);
}

app.use(express.json());
app.use(express.static("build"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    const mongodb = new MongoClient(mongoUrl);
    const db = mongodb.db("dromtorp-ticket-system");
    const tickets = db.collection("tickets");

    app.get("/api/health", (req, res) => {
        res.send("API is healthy");
    });

    app.post(
        "/api/add-new-ticket",
        [
            check("fullName").notEmpty().withMessage("Full name is required"),
            check("contactInfo").notEmpty().withMessage("Contact info is required"),
            check("shortDes").notEmpty().withMessage("Short description is required"),
            check("longDes").notEmpty().withMessage("Long description is required"),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const ticket = req.body;
            await tickets.insertOne(ticket);
            res.status(200).send("Ticket created");
        }
    );
});
