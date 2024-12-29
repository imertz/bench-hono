import { Hono } from "hono";
const app = new Hono();

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

export default {
  port: 3001,
  fetch: app.fetch,
};
