import { mkdir, writeFile } from "fs/promises";
import path from "path";

const uploadRoot = path.join(process.cwd(), "public", "uploads");

export async function saveUpload(file: File | null, folder: string) {
  if (!file || file.size === 0) {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const extension = path.extname(file.name) || ".bin";
  const safeName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
  const relativeFolder = path.join("uploads", folder);
  const targetDir = path.join(process.cwd(), "public", relativeFolder);
  const targetPath = path.join(targetDir, safeName);

  if (!targetPath.startsWith(uploadRoot)) {
    throw new Error("Invalid upload path.");
  }

  await mkdir(targetDir, { recursive: true });
  await writeFile(targetPath, buffer);

  return `/${relativeFolder.replaceAll("\\", "/")}/${safeName}`;
}
