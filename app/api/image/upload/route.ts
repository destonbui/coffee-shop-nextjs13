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

    const { filepath, error } = await uploadImage(file, filename);

    if (error) {
      return NextResponse.json({ succes: false, error });
    }
    return NextResponse.json({ success: true, filepath: filepath });
  }
}
