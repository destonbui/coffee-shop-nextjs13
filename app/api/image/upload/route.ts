import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/GCS";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("file") as Blob | null;

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  } else {
    const uniqueSuffix = `${Date.now()}`;
    const filename = `${uniqueSuffix}-${file.name}`;

    try {
      const res = await uploadImage(file, filename);

      const data: { ok: boolean; filepath: string } = JSON.parse(res);

      return NextResponse.json({ success: data.ok, filepath: data.filepath });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, error: error });
    }
  }
}
