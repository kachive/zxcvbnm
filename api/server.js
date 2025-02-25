const express = require('express');
const cors = require('cors');
const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config({ path: '../.env' });

const app = express();

// 启用 CORS
app.use(cors());
app.use(express.json());

// 使用完整的连接字符串
const connectionString = `AccountEndpoint=${process.env.COSMOS_DB_ENDPOINT};AccountKey=${process.env.COSMOS_DB_KEY}`;

const cosmosClient = new CosmosClient(connectionString);

// 数据库配置
const databaseId = "noticedb";
const containerId = "notices";

// 测试连接
async function testConnection() {
  try {
    const database = cosmosClient.database(databaseId);
    const { resource: databaseResource } = await database.read();
    console.log('Successfully connected to database:', databaseResource.id);
    
    const container = database.container(containerId);
    const { resource: containerResource } = await container.read();
    console.log('Successfully connected to container:', containerResource.id);
    
    return { database, container };
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

let database;
let container;

// 初始化数据库连接
testConnection().then(({ database: db, container: cont }) => {
  database = db;
  container = cont;
  console.log('Database connection initialized');
}).catch(error => {
  console.error('Failed to initialize database connection:', error);
});

// 测试路由
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// 获取通知列表
app.get('/api/notices', async (req, res) => {
  try {
    if (!container) {
      throw new Error('Database connection not initialized');
    }
    console.log('Fetching notices...');
    const query = "SELECT * FROM c WHERE c.isDeleted = false";
    const { resources } = await container.items.query(query).fetchAll();
    console.log('Fetched notices:', resources);
    res.json(resources);
  } catch (error) {
    console.error('Error in /api/notices:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notices', async (req, res) => {
  try {
    const { resource } = await container.items.create(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/notices/:id', async (req, res) => {
  try {
    const { resource } = await container.item(req.params.id, req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/notices/:id', async (req, res) => {
  try {
    await container.item(req.params.id, req.params.id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 