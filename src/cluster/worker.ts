import http from 'http';
import { userRoutes } from '../routes/users';

export const runWorker = () => {
  const PORT = process.env.WORKER_PORT;

  const server = http.createServer(userRoutes);

  server.listen(PORT, () => {
    console.log(`Worker listening on port ${PORT}`);
  });
};
