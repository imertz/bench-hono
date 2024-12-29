import express from "express";
const app = express();

// Enable JSON body parsing
app.use(express.json());

// Simple response
app.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Query parameters
app.get("/search", (req, res) => {
  const { q, limit = "10" } = req.query;
  res.json({
    query: q,
    limit: parseInt(limit),
    results: Array(parseInt(limit)).fill(`Result for ${q}`),
  });
});

// Route parameters
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    username: `user${id}`,
    email: `user${id}@example.com`,
  });
});

// POST with body parsing
app.post("/users", (req, res) => {
  const { username, email } = req.body;
  res.json({
    id: Math.floor(Math.random() * 1000),
    username,
    email,
    created: new Date().toISOString(),
  });
});

app.listen(3031, () => {
  console.log("Express server running on port 3031");
});
