import autocannon from "autocannon";

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
];

async function runBenchmark(baseUrl, scenario) {
  const result = await autocannon({
    url: `${baseUrl}${scenario.path}`,
    connections: 100,
    duration: 10,
    method: scenario.method,
    headers: scenario.headers,
    body: scenario.body,
    title: `${baseUrl.includes("3000") ? "Express" : "Hono"} - ${
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
    const expressResult = await runBenchmark("http://localhost:3000", scenario);

    // Test Hono.js
    const honoResult = await runBenchmark("http://localhost:3001", scenario);

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

compareBenchmarks().catch(console.error);
