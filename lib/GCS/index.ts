import { Storage } from "@google-cloud/storage";
import stream from "stream";

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  keyFilename: process.env.GCS_KEY_FILENAME,
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
      filepath: `https://storage.cloud.google.com/pl-nextjs13-bucket/${filename}`,
    });
  } catch (error) {
    return JSON.stringify({
      ok: false,
      error: error,
    });
  }
}
