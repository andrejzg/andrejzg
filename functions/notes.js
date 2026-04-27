import { NOTES, azgId } from "./_notes.js";

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const renderRow = (n) => `<tr>
  <td class="id">${azgId(n.id)}</td>
  <td class="date">${n.date}</td>
  <td><a href="/${n.slug}">${escapeHtml(n.title)}</a></td>
</tr>`;

const renderHtml = (rows) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#fbf8ee">
  <title>Notes — andrejzg</title>
  <style>
    :root {
      --bg: #fbf8ee;
      --text: #2b2a23;
      --text-dim: #6c6957;
      --line: #ece5cf;
      --lime: #82a838;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: var(--bg);
      color: var(--text);
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    main {
      max-width: 720px;
      margin: 0 auto;
      padding: 64px 24px 96px;
    }
    h1 {
      font-size: 32px;
      font-weight: 600;
      margin: 0 0 8px;
      letter-spacing: -0.01em;
    }
    .lede {
      color: var(--text-dim);
      margin: 0 0 40px;
      font-size: 15px;
    }
    a {
      color: var(--lime);
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      text-align: left;
      padding: 12px 0;
      border-bottom: 1px solid var(--line);
      font-size: 15px;
      vertical-align: top;
    }
    th {
      font-weight: 500;
      color: var(--text-dim);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding-bottom: 8px;
    }
    .id {
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      color: var(--text-dim);
      width: 96px;
      font-size: 14px;
    }
    .date {
      color: var(--text-dim);
      width: 110px;
      font-variant-numeric: tabular-nums;
      font-size: 14px;
    }
    .empty {
      color: var(--text-dim);
      font-style: italic;
      padding: 24px 0;
    }
    @media (max-width: 560px) {
      main { padding: 40px 20px 64px; }
      .id { width: auto; padding-right: 14px; }
      .date { display: none; }
    }
  </style>
</head>
<body>
  <main>
    <h1>Notes</h1>
    <p class="lede">In the spirit of <a href="https://www.cs.utexas.edu/~EWD/">EWD</a>.</p>
    ${rows ? `<table>
      <thead><tr><th>id</th><th>date</th><th>title</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>` : `<p class="empty">No notes yet.</p>`}
  </main>
</body>
</html>`;

export const onRequest = () => {
  const rows = [...NOTES]
    .sort((a, b) => b.id - a.id)
    .map(renderRow)
    .join("");
  return new Response(renderHtml(rows), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
};
