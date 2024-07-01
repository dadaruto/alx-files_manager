import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        this.client.get = promisify(this.client.get);
        this.client.set = promisify(this.client.set);
        this.client.del = promisify(this.client.del);
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return this.client.get(key);
    }

    async set(key, value, duration) {
        await this.client.set(key, value);
        await this.client.expire(key, duration);
    }

    async del(key) {
        return this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;
