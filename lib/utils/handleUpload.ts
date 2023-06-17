/**
 * This function will send a POST request to the upload api endpoint, then save the image file path that back from the api response to the database.
 *
 * @param e - the change event of the image file input
 *
 */

export const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const fileInput = e.target;

  if (!fileInput.files) {
    console.warn("no file was chosen");
    return;
  }

  if (!fileInput.files || fileInput.files.length === 0) {
    console.warn("files list is empty");
    return;
  }

  const file = fileInput.files[0];
  console.log(file);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", file.name);

  try {
    const res = await fetch("/api/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("something went wrong, check your console.");
      return;
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("something went wrong, check your console.");
  }

  /** Reset file input */
  e.target.type = "text";
  e.target.type = "file";
};
