import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
  }

  isAlive() {
    return new Promise((resolve) => {
      this.client.ping((err, reply) => {
        if (err) {
          resolve(false);
        } else {
          resolve(reply === 'PONG');
        }
      });
    });
  }
}

export default new RedisClient();
