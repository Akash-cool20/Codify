import express from "express";

const app = express();

app.get("/", (req, res) => {
    return res.status(200).send("OK");
});

app.listen(4000, () => {
    console.log("http://localhost:4000");
});
