import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import http from 'node:http';

const numCPUs = availableParallelism() - 1;
const PORT = process.env.PORT || 5000;

export const createLoadBalancer = () => {
  console.log(`Master process started on port ${PORT}`);

  const workerPorts: number[] = [];

  for (let i = 0; i < numCPUs; i++) {
    const workerPort = +PORT + i + 1;
    cluster.fork({ WORKER_PORT: workerPort });
    workerPorts.push(workerPort);
  }

  let currentWorkerIndex = 0;

  const loadBalancer = http.createServer((req, res) => {
    const targetPort = workerPorts[currentWorkerIndex];

    const options = {
      hostname: 'localhost',
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxy = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode ?? 404, proxyRes.headers);
      proxyRes.pipe(res);
    });

    req.pipe(proxy);

    currentWorkerIndex = (currentWorkerIndex + 1) % workerPorts.length;
  });

  loadBalancer.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
  });

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
    cluster.fork();
  });
};
