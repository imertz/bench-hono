import express from "express";
import Database from "better-sqlite3";

const app = express();
const db = new Database("db.sqlite", { readonly: true });
// db.pragma("journal_mode = WAL");

// Prepare statements
const getAllUsers = db.prepare("SELECT * FROM users");
const getUserById = db.prepare("SELECT * FROM users WHERE id = ?");
const getPaginatedUsers = db.prepare("SELECT * FROM users LIMIT ? OFFSET ?");

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

app.get("/db/users", (req, res) => {
  const users = getAllUsers.all();
  res.json(users);
});

app.get("/db/users/:id", (req, res) => {
  const user = getUserById.get(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.get("/db/users/paginated", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const users = getPaginatedUsers.all(limit, offset);
  res.json(users);
});

app.listen(3031, () => {
  console.log("Express server running on port 3031");
});
