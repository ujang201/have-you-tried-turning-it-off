// Have You Tried Turning It Off? — make.fun entry
// SPDX-License-Identifier: MIT
//
// The program writes exactly one funny line to /output/entry.txt:
// a hopeless tech support agent's reply to a desperate customer.
// The joke is built from three parts so the setup, the pivot and the
// punchline each stay readable on their own, then joined into a single
// line. Nothing here is random: the same input always yields the same
// bytes, which is what the grader's two runs require.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The classic question every support agent reaches for first.
const opener =
  "Have you tried turning it off and on again?";

// The pivot: the agent confesses the trick is not one tool among many,
// it is the whole job.
const pivot = "That's my entire toolkit";

// The punchline: cheerful, self-deprecating uselessness. The agent is
// the butt of the joke, never the customer.
const punchline = "I'm basically a light switch with a headset.";

function buildLine(): string {
  // The parts are joined in order: the opener stands on its own, then
  // the pivot and the punchline are linked by a single em dash, so the
  // confession and the image land as one breath.
  const tail = [pivot, punchline].join(" \u2014 ");
  return `${opener} ${tail}`;
}

function main(): void {
  const line = buildLine();

  // The gate requires UTF-8 text of 1 to 199 characters, not only
  // whitespace. Fail loudly instead of writing an invalid entry.
  const length = [...line].length;
  if (length < 1 || length > 199) {
    throw new Error(`entry is ${length} characters, must be 1-199`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: the file holds exactly the line, nothing else.
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`wrote ${length} characters to ${OUTPUT_PATH}`);
}

main();
