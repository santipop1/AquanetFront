// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL!,
    private_key: process.env.GCP_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const isPrivate = formData.get("private") === "true";
    const folder = (formData.get("folder")?.toString() || "uploads").replace(/\/+$/, "");

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const bucketName = isPrivate
      ? process.env.GCP_BUCKET_PRIVATE!
      : process.env.GCP_BUCKET_PUBLIC!;

    const bucket = storage.bucket(bucketName);
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    const blob = bucket.file(fileName);

    const buffer = Buffer.from(await file.arrayBuffer());

    await blob.save(buffer, {
      metadata: { contentType: file.type },
    });

    const url = isPrivate
      ? (await blob.getSignedUrl({
          version: "v4",
          action: "read",
          expires: Date.now() + 15 * 60 * 1000,
        }))[0]
      : `https://storage.googleapis.com/${bucketName}/${fileName}`;

    return NextResponse.json({ url }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
