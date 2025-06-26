const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI || 'your-default-mongodb-uri-here';
const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('thanuja-md'); // Change to your DB name
  }
  return db;
}

module.exports = {
  connectDB,

  getCollection: async (name) => {
    const database = await connectDB();
    return database.collection(name);
  },

  getData: async (collectionName, filter = {}) => {
    const collection = await module.exports.getCollection(collectionName);
    return await collection.findOne(filter);
  },

  setData: async (collectionName, filter = {}, data = {}) => {
    const collection = await module.exports.getCollection(collectionName);
    return await collection.updateOne(filter, { $set: data }, { upsert: true });
  },

  deleteData: async (collectionName, filter = {}) => {
    const collection = await module.exports.getCollection(collectionName);
    return await collection.deleteOne(filter);
  }
};
