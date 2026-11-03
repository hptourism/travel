import { MongoClient } from "mongodb";
import { randomBytes, scryptSync } from "node:crypto";

const uri = process.env.MONGODB_URI?.trim();
const databaseName = (process.env.MONGODB_DB ?? "himalayan").trim() || "himalayan";
const username = (process.env.ADMIN_USERNAME ?? "admin").trim() || "admin";
const password = process.env.ADMIN_PASSWORD ?? "";

if (!uri) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}

if (password.length < 10) {
  console.error("Set ADMIN_PASSWORD to at least 10 characters.");
  process.exit(1);
}

function hashPassword(value) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(value, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });

try {
  await client.connect();
  const admins = client.db(databaseName).collection("admins");
  await admins.createIndex({ username: 1 }, { unique: true });
  const existing = await admins.findOne({ username });
  if (existing) {
    console.log(`Admin user already exists: ${username}`);
  } else {
    await admins.insertOne({
      username,
      passwordHash: hashPassword(password),
      createdAt: new Date(),
    });
    console.log(`Created admin user: ${username}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.close();
}
