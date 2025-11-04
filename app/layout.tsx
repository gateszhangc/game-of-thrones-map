import "./globals.css";
import fs from "fs";
import path from "path";
import type { ReactNode } from "react";

function readFragment(filename: string) {
  const fragmentPath = path.join(process.cwd(), "data", filename);
  try {
    return fs.readFileSync(fragmentPath, "utf8");
  } catch (error) {
    console.error(`Failed to read ${filename}:`, error);
    return "";
  }
}

const HEAD_MARKUP = readFragment("home-head.html");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: HEAD_MARKUP }} />
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
