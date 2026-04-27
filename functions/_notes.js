// Note manifest. Add an entry per new note; the folder at /<slug>/
// holds the actual content.
export const NOTES = [
  {
    id: 1,
    slug: "lime",
    title: "Lime Pricing Explorer",
    date: "2026-04-26",
  },
];

export const noteById = (n) => NOTES.find((note) => note.id === n);

export const azgId = (n) => `azg${String(n).padStart(3, "0")}`;
