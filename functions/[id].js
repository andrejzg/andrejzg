import { NOTES } from "./_notes.js";

// Catches single-segment paths with no static asset (so /lime keeps
// serving from /lime/index.html). Maps /N, /0..0N, /azgN, /azg0..0N
// (case-insensitive) to the slug, preserving query strings.
export const onRequest = ({ params, request, next }) => {
  const m = params.id.match(/^(?:azg)?(\d+)$/i);
  if (m) {
    const slug = NOTES[parseInt(m[1], 10)];
    if (slug) {
      const url = new URL(request.url);
      return Response.redirect(`${url.origin}/${slug}${url.search}`, 301);
    }
  }
  return next();
};
