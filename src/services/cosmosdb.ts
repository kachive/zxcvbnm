import { CosmosClient } from "@azure/cosmos";

// 使用环境变量，不要硬编码敏感信息
const endpoint = process.env.COSMOS_DB_ENDPOINT || "";
const key = process.env.COSMOS_DB_KEY || "";
const databaseId = process.env.COSMOS_DB_DATABASE || "noticedb";
const containerId = process.env.COSMOS_DB_CONTAINER || "notices";

const client = new CosmosClient({ 
  endpoint, 
  key 
});

const database = client.database(databaseId);
const container = database.container(containerId);

const testConnection = async () => {
  try {
    console.log('Testing database connection...');
    const { resource } = await database.read();
    console.log('Database connection successful:', resource);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

testConnection();

export { container }; 