import fs from "node:fs";
import path from "node:path";
import https from "node:https";

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          },
        },
        (res) => {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            return;
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks)));
        }
      )
      .on("error", reject);
  });
}

function parseLatin(css) {
  // Bloques @font-face precedidos por /* latin */
  const out = [];
  const re = /\/\*\s*latin\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const body = m[1];
    const weight = (body.match(/font-weight:\s*(\d+)/) || [])[1];
    const style = (body.match(/font-style:\s*(\w+)/) || [])[1];
    const src = (body.match(/url\((https:\/\/[^)]+)\)/) || [])[1];
    if (weight && style && src) out.push({ weight, style, src });
  }
  return out;
}

async function grabFamily(family, cssUrl, dir) {
  const css = (await get(cssUrl)).toString();
  const items = parseLatin(css);
  console.log(`${family} → ${items.length} variantes latin`);
  fs.mkdirSync(dir, { recursive: true });
  for (const it of items) {
    const suffix = it.style === "italic" ? "-italic" : "";
    const filename = `${family.toLowerCase().replace(/\s/g, "-")}-${it.weight}${suffix}.woff2`;
    const dest = path.join(dir, filename);
    const buf = await get(it.src);
    fs.writeFileSync(dest, buf);
    console.log(`  ${filename} → ${buf.length} bytes`);
  }
}

await grabFamily(
  "Archivo",
  "https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&display=swap",
  "public/fonts/archivo"
);
await grabFamily(
  "Source Serif 4",
  "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600&display=swap",
  "public/fonts/source-serif-4"
);
await grabFamily(
  "Cormorant Garamond",
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&display=swap",
  "public/fonts/cormorant-garamond"
);
console.log("done");
