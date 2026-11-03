import { MongoClient, type Collection, type Db, type Document } from "mongodb";

const databaseName = (process.env.MONGODB_DB ?? "himalayan").trim() || "himalayan";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function connectionUri() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("MONGODB_URI is not set.");
  }
  return uri;
}

export async function getDb(): Promise<Db> {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(connectionUri(), {
      serverSelectionTimeoutMS: 8000,
    });
    global._mongoClientPromise = client.connect().catch((error: unknown) => {
      global._mongoClientPromise = undefined;
      throw error;
    });
  }

  const client = await global._mongoClientPromise;
  return client.db(databaseName);
}

export async function collection<T extends Document>(name: string): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}
