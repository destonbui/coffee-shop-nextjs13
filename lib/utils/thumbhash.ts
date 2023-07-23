import { rgbaToThumbHash, thumbHashToDataURL } from "thumbhash";

export async function blobToDataUrl(imageBlob: Blob) {
  const localUrl = window.URL.createObjectURL(imageBlob);

  const image = new Image();
  image.src = localUrl;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    const scale = 100 / Math.max(image.width, image.height);

    canvas.width = Math.round(image.width * scale);
    canvas.height = Math.round(image.height * scale);

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);

    const hash = rgbaToThumbHash(pixels.width, pixels.height, pixels.data);

    const thumbhashBlurDataUrl = thumbHashToDataURL(hash);

    window.URL.revokeObjectURL(localUrl);
    return thumbhashBlurDataUrl;
  } else {
    window.URL.revokeObjectURL(localUrl);
    throw new Error("Something went wrong. Convert Blob to DataUrl failed.");
  }
}
