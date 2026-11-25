// Worst Superpower — make.fun bounty entry (program/v1).
// Writes a single line (<=140 chars) inventing the most useless
// superpower to /output/entry.txt. Pure Node stdlib, deterministic,
// no network, no secrets.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I can hear what my houseplants are thinking, but all they ever think about is water.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  if (LINE.length < 1 || LINE.length > 140) {
    throw new Error(`entry line must be 1-140 chars, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    throw new Error("entry line must be a single non-blank line");
  }
  // The gate counts characters, but keep the byte size sane too.
  if (Buffer.byteLength(LINE, "utf8") > 400) {
    throw new Error("entry line is unexpectedly large in UTF-8 bytes");
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE + "\n", "utf8");
  try {
    chmodSync(OUT_FILE, 0o644);
  } catch {
    // The grader collects outputs as another user; best effort only.
  }
}

main();
