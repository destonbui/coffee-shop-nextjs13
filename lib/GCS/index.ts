import { Storage } from "@google-cloud/storage";
import stream from "stream";

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_KEY_CLIENT_EMAIL,
    private_key: process.env.GCS_KEY_PRIVATE_KEY,
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET_ID as string);

export async function uploadImage(imgBlob: Blob, filename: string) {
  const buffer = Buffer.from(await imgBlob.arrayBuffer());

  const file = bucket.file(filename);

  const passthroughStream = new stream.PassThrough();
  passthroughStream.write(buffer);
  passthroughStream.end();

  async function streamFileUpload() {
    passthroughStream.pipe(file.createWriteStream()).on("finish", () => {});
  }

  try {
    await streamFileUpload();

    return JSON.stringify({
      ok: true,
      filepath: `https://storage.googleapis.com/pl-nextjs13-bucket/${filename}`,
    });
  } catch (error) {
    return JSON.stringify({
      ok: false,
      error: error,
    });
  }
}
