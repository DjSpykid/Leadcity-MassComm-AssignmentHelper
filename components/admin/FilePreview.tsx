"use client";

export default function FilePreview({ fileUrl }: { fileUrl: string }) {
  const getFileType = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();
    if (["pdf"].includes(ext || "")) return "PDF";
    if (["doc", "docx"].includes(ext || "")) return "Word";
    if (["jpg", "jpeg", "png", "gif"].includes(ext || "")) return "Image";
    return "File";
  };

  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="border p-3 rounded hover:bg-gray-50 flex flex-col items-center"
    >
      <div className="text-4xl mb-2">
        {getFileType(fileUrl) === "PDF"
          ? "📄"
          : getFileType(fileUrl) === "Word"
          ? "📝"
          : "📂"}
      </div>
      <span className="text-sm text-center truncate w-full">
        {fileUrl.split("/").pop()}
      </span>
    </a>
  );
}
