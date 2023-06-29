import { Storage } from "@google-cloud/storage";

export async function uploadImage(imgBlob: Blob, filename: string) {
  const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    credentials: {
      client_email: process.env.GCS_KEY_CLIENT_EMAIL,
      private_key: process.env.GCS_KEY_PRIVATE_KEY,
    },
  });

  const bucketName = process.env.GCS_BUCKET_ID;

  const buffer = Buffer.from(await imgBlob.arrayBuffer());

  async function uploadFromMemory() {
    try {
      await storage.bucket(bucketName).file(filename).save(buffer);

      return { ok: true };
    } catch (error) {
      console.log(error);
      return {
        error:
          "Something went wrong while uploading file, please check your console.",
      };
    }
  }

  const { ok, error } = await uploadFromMemory();

  if (error) {
    return { error };
  }

  return {
    filepath: `https://storage.googleapis.com/pl-nextjs13-bucket/${filename}`,
  };
}
