export async function uploadToS3(file: File): Promise<string> {
  // In a real implementation, you would:
  // 1. Get a pre-signed URL from your API
  // 2. Upload the file to S3 using fetch or axios
  // 3. Return the file URL

  // Mock implementation for development:
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        resolve(
          `https://your-bucket.s3.amazonaws.com/uploads/${Date.now()}_${
            file.name
          }`
        );
      }, 1000);
    };
    reader.readAsDataURL(file);
  });
}
