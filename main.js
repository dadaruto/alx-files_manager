import redisClient from './utils/redis';

const checkRedisConnection = async () => {
  return new Promise((resolve) => {
    const checkConnection = () => {
      if (redisClient.isAlive()) {
        resolve(true);
      } else {
        setTimeout(checkConnection, 100);
      }
    };
    checkConnection();
  });
};

(async () => {
  await checkRedisConnection();
  console.log(redisClient.isAlive());
  console.log(await redisClient.get('myKey'));
  await redisClient.set('myKey', 12, 5);
  console.log(await redisClient.get('myKey'));

  setTimeout(async () => {
    console.log(await redisClient.get('myKey'));
  }, 1000 * 10);
})();
