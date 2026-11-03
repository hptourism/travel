import type { ObjectId } from "mongodb";
import { collection } from "@/lib/mongo";
import type { EnquiryInput, EnquiryView } from "@/lib/enquiry-types";

export type { EnquiryInput, EnquiryView };

type EnquiryDocument = EnquiryInput & {
  _id?: ObjectId;
  createdAt: Date;
};

const COLLECTION = "enquiries";

let indexPromise: Promise<void> | null = null;

async function ensureIndex() {
  if (!indexPromise) {
    indexPromise = collection<EnquiryDocument>(COLLECTION)
      .then((enquiries) => enquiries.createIndex({ createdAt: -1 }))
      .then(() => undefined)
      .catch((error: unknown) => {
        indexPromise = null;
        throw error;
      });
  }
  await indexPromise;
}

export async function saveEnquiry(input: EnquiryInput) {
  const enquiries = await collection<EnquiryDocument>(COLLECTION);
  await enquiries.insertOne({
    ...input,
    createdAt: new Date(),
  });
  await ensureIndex().catch(() => undefined);
}

export async function listEnquiries(): Promise<EnquiryView[]> {
  const enquiries = await collection<EnquiryDocument>(COLLECTION);
  await ensureIndex().catch(() => undefined);
  const docs = await enquiries.find({}).sort({ createdAt: -1 }).limit(1000).toArray();

  return docs.map((doc) => ({
    id: String(doc._id),
    name: doc.name,
    phone: doc.phone,
    email: doc.email,
    startingFrom: doc.startingFrom,
    packageName: doc.packageName,
    travellers: doc.travellers,
    dates: doc.dates,
    details: doc.details,
    page: doc.page,
    source: doc.source,
    createdAt: doc.createdAt.toISOString(),
  }));
}
