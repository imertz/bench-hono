import autocannon from "autocannon";
import BetterSqlite3 from "better-sqlite3";

// Add new database scenario
const DB_SIZE = 100000;

// Setup function to create and populate databases
async function setupDatabases() {
  // Setup Bun:SQLite database
  const db = new BetterSqlite3("db.sqlite");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Populate databases
  console.log("Populating databases with 100,000 records...");

  const bunInsert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");

  db.transaction(() => {
    for (let i = 0; i < DB_SIZE; i++) {
      bunInsert.run(`User${i}`, `user${i}@example.com`);
    }
  })();

  db.close();

  console.log("Databases populated successfully!");
}

const scenarios = [
  {
    name: "Simple Response",
    method: "GET",
    path: "/hello",
  },
  {
    name: "Query Parameters",
    method: "GET",
    path: "/search?q=test&limit=5",
  },
  {
    name: "Route Parameters",
    method: "GET",
    path: "/users/123",
  },
  {
    name: "POST with Body",
    method: "POST",
    path: "/users",
    body: JSON.stringify({
      username: "testuser",
      email: "test@example.com",
    }),
    headers: {
      "content-type": "application/json",
    },
  },
  // Add new database scenarios
  {
    name: "Database Select All",
    method: "GET",
    path: "/db/users",
  },
  {
    name: "Database Select Single",
    method: "GET",
    path: "/db/users/150000", // Middle record
  },
  {
    name: "Database Select with Limit",
    method: "GET",
    path: "/db/users/paginated?page=1&limit=10",
  },
];

async function runBenchmark(baseUrl, scenario) {
  const result = await autocannon({
    url: `${baseUrl}${scenario.path}`,
    connections: 100,
    duration: 10,
    method: scenario.method,
    headers: scenario.headers,
    body: scenario.body,
    title: `${baseUrl.includes("3031") ? "Express" : "Hono"} - ${
      scenario.name
    }`,
  });

  return result;
}

async function compareBenchmarks() {
  console.log("Starting benchmarks...\n");

  for (const scenario of scenarios) {
    console.log(`Testing: ${scenario.name}`);

    // Test Express.js
    const expressResult = await runBenchmark("http://localhost:3031", scenario);

    // Test Hono.js
    const honoResult = await runBenchmark("http://localhost:3032", scenario);

    console.log("\nResults:");
    console.log("\nExpress.js:");
    console.log(`Requests/sec: ${expressResult.requests.average}`);
    console.log(`Latency (ms): ${expressResult.latency.average}`);
    console.log(
      `Throughput (MB/sec): ${(
        expressResult.throughput.average /
        1024 /
        1024
      ).toFixed(2)}`
    );

    console.log("\nHono.js:");
    console.log(`Requests/sec: ${honoResult.requests.average}`);
    console.log(`Latency (ms): ${honoResult.latency.average}`);
    console.log(
      `Throughput (MB/sec): ${(
        honoResult.throughput.average /
        1024 /
        1024
      ).toFixed(2)}`
    );
    console.log("\n" + "-".repeat(50) + "\n");
  }
}

async function main() {
  await setupDatabases();
  await compareBenchmarks();
}

main().catch(console.error);
