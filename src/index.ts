import 'dotenv/config';
import { createServer, Server } from 'http';
import { userRoutes } from './routes/users';
import cluster from 'cluster';
import { runWorker } from './cluster/worker';
import { createLoadBalancer } from './cluster/main';

const PORT = process.env.PORT || 5000;

let server: Server | undefined;

if (process.env.MULTI_PROCESS) {
  if (cluster.isPrimary) {
    createLoadBalancer();
  } else {
    runWorker();
  }
} else {
  server = createServer(userRoutes);
  server.listen(PORT, () => console.log(`serv started on ${PORT}`));
}

export default server as Server;
