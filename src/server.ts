import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './app/config';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected To Database Successfully');
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error, 'from');
  }
}
main();

process.on('unhandledRejection', () => {
  console.log('unhandledRejection Shuting Down The Server');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException Shuting Down The Server');
  process.exit(1);
});
