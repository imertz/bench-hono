import { Hono } from "hono";
import { Database } from "bun:sqlite";

const app = new Hono();
const db = new Database("db.sqlite", { readonly: true });
// db.exec("PRAGMA journal_mode = WAL;");

// Prepare statements
const getAllUsers = db.prepare("SELECT * FROM users");
const getUserById = db.prepare("SELECT * FROM users WHERE id = ?");
const getPaginatedUsers = db.prepare("SELECT * FROM users LIMIT ? OFFSET ?");

// Simple response
app.get("/hello", (c) => {
  return c.json({ message: "Hello World!" });
});

// Query parameters
app.get("/search", (c) => {
  const q = c.req.query("q");
  const limit = parseInt(c.req.query("limit") || "10");
  return c.json({
    query: q,
    limit,
    results: Array(limit).fill(`Result for ${q}`),
  });
});

// Route parameters
app.get("/users/:id", (c) => {
  const { id } = c.req.param();
  return c.json({
    id,
    username: `user${id}`,
    email: `user${id}@example.com`,
  });
});

// POST with body parsing
app.post("/users", async (c) => {
  const body = await c.req.json();
  return c.json({
    id: Math.floor(Math.random() * 1000),
    username: body.username,
    email: body.email,
    created: new Date().toISOString(),
  });
});

// Add new database routes
app.get("/db/users", (c) => {
  const users = getAllUsers.all();
  return c.json(users);
});

app.get("/db/users/:id", (c) => {
  const { id } = c.req.param();
  const user = getUserById.get(id);
  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
});

app.get("/db/users/paginated", (c) => {
  const page = parseInt(c.req.query("page")) || 1;
  const limit = parseInt(c.req.query("limit")) || 10;
  const offset = (page - 1) * limit;

  const users = getPaginatedUsers.all(limit, offset);
  return c.json(users);
});

export default {
  port: 3032,
  fetch: app.fetch,
};
