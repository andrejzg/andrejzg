import { NOTES } from "./_notes.js";

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-04-26" -> "Apr 26, 2026", the same shape as the homepage list
const shortDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[parseInt(m, 10) - 1]} ${d}, ${y}`;
};

const renderItem = (n) => `<li>
<span><time datetime="${n.date}">${shortDate(n.date)}</time></span>
<a href="/${n.slug}">${escapeHtml(n.title)}</a>
</li>`;

const renderHtml = (items) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="andrej zukov gregoric">
    <link rel="stylesheet" type="text/css" href="/style.css">
    <title>notes - andrej zukov gregoric</title>
  </head>
<body>
  <header>
    <div><a href="/index.html">andrej zukov gregoric</a></div>
  </header>
<main>
<h1>notes</h1>
<p>In the spirit of <a href="https://www.cs.utexas.edu/~EWD/">EWD</a>.</p>
${items ? `<ul class="blog-posts">
${items}
</ul>` : `<p>No notes yet.</p>`}
</main>
<footer>
<div>
live from beautiful london, england
</div>
</footer>
</body>
</html>`;

export const onRequest = () => {
  const items = [...NOTES]
    .sort((a, b) => b.id - a.id)
    .map(renderItem)
    .join("\n");
  return new Response(renderHtml(items), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
};
