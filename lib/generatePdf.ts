function escHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineMd(text: string): string {
  return escHtml(text).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function cvMarkdownToHtml(content: string): string {
  const lines = content.split("\n");
  let html = "";
  let inList = false;

  for (const line of lines) {
    const isBullet = line.startsWith("- ") || line.startsWith("• ");
    if (!isBullet && inList) { html += "</ul>"; inList = false; }

    if (line.startsWith("# ")) {
      html += `<h1>${escHtml(line.slice(2))}</h1>`;
    } else if (line.startsWith("## ")) {
      html += `<h2>${escHtml(line.slice(3))}</h2>`;
    } else if (isBullet) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${inlineMd(line.slice(2))}</li>`;
    } else if (line === "---" || line.trim() === "") {
      html += "<br>";
    } else if (line.includes(" | ")) {
      html += `<p class="contact">${line.split(" | ").map(escHtml).join(" · ")}</p>`;
    } else {
      html += `<p>${inlineMd(line)}</p>`;
    }
  }
  if (inList) html += "</ul>";
  return html;
}

export function printAsPdf(type: "cv" | "cover", content: string) {
  const isCv = type === "cv";
  const bodyContent = isCv
    ? cvMarkdownToHtml(content)
    : `<div class="cover">${content.split("\n\n").map((p) => `<p>${escHtml(p)}</p>`).join("")}</div>`;

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${isCv ? "Currículo" : "Cover Letter"}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Helvetica Neue", Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.55;
      color: #1a1a1a;
      background: #fff;
      padding: 48px 56px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      font-size: 22pt;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #0f0f0f;
      margin-bottom: 2px;
    }
    h2 {
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #888;
      border-bottom: 1px solid #e4e4e7;
      padding-bottom: 4px;
      margin-top: 22px;
      margin-bottom: 10px;
    }
    p { margin-top: 3px; }
    p.contact { font-size: 9pt; color: #555; margin-top: 4px; }
    ul { margin-top: 6px; padding-left: 0; list-style: none; }
    li { padding-left: 14px; position: relative; margin-bottom: 3px; font-size: 10pt; color: #333; }
    li::before { content: "•"; position: absolute; left: 0; color: #aaa; }
    strong { font-weight: 600; color: #111; }
    .cover p { margin-bottom: 12px; line-height: 1.7; }
    @media print {
      body { padding: 0; }
      @page { margin: 18mm 16mm; }
    }
  </style>
</head>
<body>
  ${bodyContent}
  <script>
    window.onload = function() {
      window.print();
      window.onafterprint = function() { window.close(); };
    };
  </script>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}
