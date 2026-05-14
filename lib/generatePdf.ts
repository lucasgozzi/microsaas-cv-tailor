export function printAsPdf(title: string, content: string) {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: "Georgia", "Times New Roman", serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a1a;
      background: #fff;
      padding: 48px 56px;
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      border-bottom: 2px solid #1a1a1a;
      padding-bottom: 10px;
      margin-bottom: 28px;
    }

    .header h1 {
      font-size: 10pt;
      font-weight: normal;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #555;
    }

    .header .brand {
      font-size: 8pt;
      color: #aaa;
      margin-top: 2px;
    }

    pre {
      font-family: "Georgia", "Times New Roman", serif;
      font-size: 11pt;
      line-height: 1.75;
      white-space: pre-wrap;
      word-break: break-word;
      color: #1a1a1a;
    }

    @media print {
      body { padding: 0; }
      @page { margin: 20mm 18mm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${title}</h1>
    <p class="brand">Gerado por JobAbroad.pro</p>
  </div>
  <pre>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
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
