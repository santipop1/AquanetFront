// app/api/document-url/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL!,
        private_key: process.env.GCP_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
});

export async function GET(req: NextRequest) {
    const filePath = req.nextUrl.searchParams.get("path");
    if (!filePath) {
        return NextResponse.json({ message: "No path provided" }, { status: 400 });
    }

    const bucket = storage.bucket(process.env.GCP_BUCKET_PRIVATE!);
    const decodedPath = decodeURIComponent(filePath); // ← 💥 aquí
    const cleanPath = decodedPath
        .replace(/^https:\/\/.*?\/(.*?)$/, '$1')
        .replace(/^aquanet-privado\//, '')
        .split('?')[0];

    console.log("Clean path FINAL:", cleanPath);

    const file = bucket.file(cleanPath);


    console.log("filePath recibido:", filePath);


    try {
        const [url] = await file.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000,
        });

        return NextResponse.json({ url }, { status: 200 });
    } catch (err) {
        console.error("Signed URL error:", err);
        return NextResponse.json({ err }, { status: 500 });
    }
}
