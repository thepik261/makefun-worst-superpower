// Worst Superpower — make.fun bounty entry (program/v1).
// Writes a single line (<=140 chars) inventing the most useless
// superpower to /output/entry.txt. Pure Node stdlib, deterministic,
// no network, no secrets.
//
// Output contract: /output/entry.txt holds exactly one line — the
// superpower sentence below, terminated by a single newline — and
// nothing else. The grader reads that file, so the line must stay
// a single non-blank sentence of at most 140 characters.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const SUPERPOWER_LINE =
  "I can hear what my houseplants are thinking, but all they ever think about is water.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// Guards the output contract: one non-blank line, 1-140 chars,
// small enough in UTF-8 bytes that the grader's file read stays sane.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry line must be 1-140 chars, got ${line.length}`);
  }
  if (line.trim().length === 0 || line.includes("\n")) {
    throw new Error("entry line must be a single non-blank line");
  }
  if (Buffer.byteLength(line, "utf8") > 400) {
    throw new Error("entry line is unexpectedly large in UTF-8 bytes");
  }
}

function main(): void {
  validateLine(SUPERPOWER_LINE);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, SUPERPOWER_LINE + "\n", "utf8");
  try {
    chmodSync(OUT_FILE, 0o644);
  } catch {
    // The grader collects outputs as another user; best effort only.
  }
}

main();
