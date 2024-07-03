import dbClient from './utils/db.js';

async function insertSampleData() {
  try {
    const usersCollection = await dbClient.usersCollection();
    const filesCollection = await dbClient.filesCollection();

    // Insert sample users
    const usersResult = await usersCollection.insertMany([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
      { name: 'Charlie', email: 'charlie@example.com' }
    ]);

    console.log('Inserted users:', usersResult.insertedCount);

    // Insert sample files for each user
    for (const userId of Object.values(usersResult.insertedIds)) {
      const filesResult = await filesCollection.insertMany([
        { name: 'file1.txt', type: 'file', userId },
        { name: 'file2.txt', type: 'file', userId },
        { name: 'file3.txt', type: 'file', userId }
      ]);

      console.log(`Inserted files for user ${userId}:`, filesResult.insertedCount);
    }

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    await dbClient.client.close();
  }
}

insertSampleData();
