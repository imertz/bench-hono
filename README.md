# Express vs Hono Benchmark

A performance benchmark comparison between Express.js running on Node.js and Hono.js running on Bun.js. This benchmark tests various HTTP scenarios including simple responses, query parameters, route parameters, and POST request handling.

## Prerequisites

- Node.js >= 18.0.0
- Bun >= 1.0.0
- npm

## Installation

```bash
# Clone the repository
git clone https://github.com/imertz/bench-hono.git
cd bench-hono

# Install dependencies
npm install
```

## Usage

1. Start the Express server:

```bash
npm run start:express
```

2. In a new terminal, start the Hono server:

```bash
npm run start:hono
```

3. In a third terminal, run the benchmark:

```bash
npm run benchmark
```

## Benchmark Scenarios

The benchmark tests four different scenarios:

1. Simple Response (`/hello`)

   - Basic JSON response
   - Tests raw framework performance

2. Query Parameters (`/search?q=test&limit=5`)

   - URL parameter parsing
   - Array generation based on parameters

3. Route Parameters (`/users/:id`)

   - URL route parameter extraction
   - Object creation with dynamic values

4. POST with Body Parsing (`/users`)
   - JSON body parsing
   - Request body validation

## Benchmark Results

Results from different hardware configurations:

### OVH VPS (1 CPU, 2GB RAM)

| Scenario         | Framework | Requests/sec | Latency (ms) | Throughput (MB/sec) |
| ---------------- | --------- | ------------ | ------------ | ------------------- |
| Simple Response  | Express   | 1,897.70     | 52.21        | 0.47                |
|                  | Hono      | 9,043.21     | 10.65        | 1.16                |
| Query Parameters | Express   | 1,955.46     | 50.61        | 0.68                |
|                  | Hono      | 8,978.80     | 10.72        | 2.03                |
| Route Parameters | Express   | 2,038.30     | 48.53        | 0.58                |
|                  | Hono      | 9,339.21     | 10.25        | 1.52                |
| POST with Body   | Express   | 1,577.40     | 62.89        | 0.50                |
|                  | Hono      | 9,222.40     | 10.40        | 1.79                |

### Hetzner ARM (2 CPU, 4GB RAM)

| Scenario         | Framework | Requests/sec | Latency (ms) | Throughput (MB/sec) |
| ---------------- | --------- | ------------ | ------------ | ------------------- |
| Simple Response  | Express   | 3,790.55     | 25.87        | 0.94                |
|                  | Hono      | 18,732.41    | 4.92         | 2.39                |
| Query Parameters | Express   | 3,466.82     | 28.34        | 1.20                |
|                  | Hono      | 19,278.41    | 4.78         | 4.36                |
| Route Parameters | Express   | 3,862.70     | 25.41        | 1.10                |
|                  | Hono      | 18,676.41    | 4.95         | 3.05                |
| POST with Body   | Express   | 2,923.50     | 33.72        | 0.92                |
|                  | Hono      | 20,316.80    | 4.39         | 3.95                |

### Raspberry Pi 4 Model B (4GB RAM)

| Scenario         | Framework | Requests/sec | Latency (ms) | Throughput (MB/sec) |
| ---------------- | --------- | ------------ | ------------ | ------------------- |
| Simple Response  | Express   | 712.90       | 139.60       | 0.18                |
|                  | Hono      | 5,035.40     | 19.66        | 0.64                |
| Query Parameters | Express   | 850.30       | 117.01       | 0.30                |
|                  | Hono      | 6,078.80     | 16.19        | 1.37                |
| Route Parameters | Express   | 965.50       | 102.89       | 0.27                |
|                  | Hono      | 6,065.20     | 16.25        | 0.99                |
| POST with Body   | Express   | 682.00       | 145.78       | 0.22                |
|                  | Hono      | 5,428.40     | 18.03        | 1.06                |

## Key Findings

1. Performance Advantage:

   - Hono.js consistently outperforms Express.js across all hardware configurations
   - The performance gap widens on lower-power devices
   - Raspberry Pi shows the largest relative difference (6.3x-8.0x faster)

2. Hardware Impact:

   - Both frameworks perform best on ARM architecture (Hetzner)
   - Express.js shows more sensitivity to hardware limitations
   - Hono.js maintains more consistent performance across different hardware

3. Operation Types:

   - POST operations with body parsing show the biggest performance gap
   - Query parameter handling is consistently efficient in Hono
   - Simple responses and route parameters show similar ratios within each setup

4. Latency Patterns:
   - Express latency increases dramatically on lower-power hardware
   - Hono maintains relatively stable latency even on Raspberry Pi
   - ARM hardware shows the best latency for both frameworks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
