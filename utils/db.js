import { MongoClient } from 'mongodb';

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'files_manager';
const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

class DBClient {
  constructor() {
    client.connect((err) => {
      if (!err) {
        this.db = client.db(dbName);
      }
    });
  }

  isAlive() {
    return this.db !== undefined;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

export default new DBClient();

