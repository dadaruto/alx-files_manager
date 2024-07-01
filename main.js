import express from 'express';
import routes from './routes/index';
import redisClient from './utils/redis';
import dbClient from './utils/db';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(redisClient.isAlive()); // Should log true if connected
  console.log(redisClient.get('some_key')); // Example key, should log the value or null if key doesn't exist
  console.log(await dbClient.nbUsers()); // Should log the number of users
  console.log(await dbClient.nbFiles()); // Should log the number of files
});
