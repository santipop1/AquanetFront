import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL!,
        private_key: process.env.GCP_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ message: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `profile-pictures/${Date.now()}-${file.name}`;
        const blob = bucket.file(fileName);

        await blob.save(buffer, {
            metadata: {
                contentType: file.type,
            },
        });

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        return NextResponse.json({ url: publicUrl }, { status: 200 });

    } 
    catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json(
        { message: error.message || "Error al subir la imagen" },
        { status: 500 }
        );
    }
}