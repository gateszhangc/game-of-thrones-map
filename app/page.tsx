import fs from "fs";
import path from "path";

function readBodyMarkup() {
  const filePath = path.join(process.cwd(), "data", "home-body.html");
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Failed to read home-body.html:", error);
    return "<!-- Missing home-body.html -->";
  }
}

const BODY_MARKUP = readBodyMarkup();

export default function Home() {
  return <div dangerouslySetInnerHTML={{ __html: BODY_MARKUP }} />;
}
