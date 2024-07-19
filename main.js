const redisClient = require('./utils/redis');

(async () => {
    console.log('Is Redis alive:', redisClient.isAlive());
    console.log('Get myKey (should be null):', await redisClient.get('myKey'));
    await redisClient.set('myKey', '12', 5);
    console.log('Set myKey to 12 for 5 seconds.');
    console.log('Get myKey (should be 12):', await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log('Get myKey after 10 seconds (should be null):', await redisClient.get('myKey'));
    }, 1000 * 10);
})();
