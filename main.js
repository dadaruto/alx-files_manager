import redisClient from './utils/redis';
import dbClient from './utils/db';

// Function to wait for MongoDB connection
const waitDbConnection = () => {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 10;
        const retryInterval = 3000; // 3 seconds

        const repeatFct = async () => {
            try {
                await dbClient.connect(); // Ensure your dbClient has a connect method
                console.log('MongoDB connected successfully.');
                resolve();
            } catch (error) {
                attempts++;
                console.error(`Connection attempt ${attempts} failed. Retrying in ${retryInterval / 1000} seconds...`);
                if (attempts >= maxAttempts) {
                    reject(new Error("Max connection attempts reached."));
                } else {
                    setTimeout(repeatFct, retryInterval);
                }
            }
        };

        repeatFct();
    });
};

// Main function to run tasks
const main = async () => {
    try {
        // Task 1: Redis Client Operations
        console.log('Task 1: Redis Client Operations');
        console.log(redisClient.isAlive());
        console.log(await redisClient.get('myKey'));
        await redisClient.set('myKey', 12, 5);
        console.log(await redisClient.get('myKey'));

        // Task 2: Database Client Operations
        console.log('Task 2: Database Client Operations');
        console.log(dbClient.isAlive());
        await waitDbConnection(); // Wait for MongoDB connection
        console.log(dbClient.isAlive());
        console.log(await dbClient.nbUsers());
        console.log(await dbClient.nbFiles());
    } catch (error) {
        console.error('Error:', error);
    }
};

// Run main function
main();
