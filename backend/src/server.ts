
import app from './app';
import { Server } from 'http';
import { checkConnection } from './db';


process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})

let server: Server;
const bootstrap = async () => {
  try {
    await checkConnection();
    server = app.listen(process.env.PORT || 4000, () => {
      console.log(`Example app listening on port ${process.env.PORT || 4000}`);
    });
  } catch (err) {
    console.error('Database connection failed');
  }

  process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection, closing the server...');
    if (server) {
      server.close(() => {
        console.error(error);
      });
    }
    process.exit(1);
  });
};

bootstrap();


process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})