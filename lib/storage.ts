export async function uploadToS3(
  file: File
): Promise<{ url: string; name: string }> {
  // 1. Get pre-signed URL from your API
  const { url, fields } = await fetch("/api/upload", {
    method: "POST",
    body: JSON.stringify({
      name: file.name,
      type: file.type,
    }),
  }).then((res) => res.json());

  // 2. Upload file to S3
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  formData.append("file", file);

  await fetch(url, {
    method: "POST",
    body: formData,
  });

  return {
    url: `${url}/${fields.key}`,
    name: file.name,
  };
}
