# Express vs Hono Benchmark

A performance benchmark comparison between Express.js running on Node.js and Hono.js running on Bun.js. This benchmark tests various HTTP scenarios including simple responses, query parameters, route parameters, and POST request handling.

## Prerequisites

- Node.js >= 18.0.0
- Bun >= 1.0.0
- npm

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/express-hono-benchmark.git
cd express-hono-benchmark

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

## Sample Results

```
Testing: Simple Response
Express.js:
Requests/sec: 18,880
Latency (ms): 4.68
Throughput (MB/sec): 4.70

Hono.js:
Requests/sec: 116,337
Latency (ms): 0.15
Throughput (MB/sec): 16.53
```

## Project Structure

- `express-server.js` - Express.js server implementation
- `hono-server.js` - Hono.js server implementation
- `benchmark.js` - Benchmark implementation using autocannon
- `package.json` - Project configuration and dependencies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
