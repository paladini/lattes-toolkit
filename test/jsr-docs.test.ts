import { readFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");

function sourceFile(program: ts.Program, suffix: string): ts.SourceFile {
  const normalized = suffix.replace(/\\/g, "/");
  const match = program.getSourceFiles().find((file) =>
    file.fileName.replace(/\\/g, "/").endsWith(normalized),
  );
  if (!match) {
    throw new Error(`Source file not found: ${suffix}`);
  }
  return match;
}

function documentationCoverage(): { documented: number; total: number; missing: string[] } {
  const configFile = ts.readConfigFile(join(root, "tsconfig.json"), ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
  const entries = ["src/index.ts", "src/extrator/index.ts"];
  const program = ts.createProgram({
    rootNames: entries.map((entry) => join(root, entry)),
    options: parsed.options,
  });
  const checker = program.getTypeChecker();
  let documented = 0;
  let total = 0;
  const missing: string[] = [];

  for (const entry of entries) {
    const file = sourceFile(program, entry);
    const moduleSymbol = checker.getSymbolAtLocation(file);
    if (!moduleSymbol) {
      throw new Error(`No module symbol for ${entry}`);
    }
    for (const exported of checker.getExportsOfModule(moduleSymbol)) {
      const aliased =
        exported.flags & ts.SymbolFlags.Alias
          ? checker.getAliasedSymbol(exported)
          : exported;
      const text = aliased
        .getDocumentationComment(checker)
        .map((part) => part.text)
        .join("")
        .trim();
      total += 1;
      if (text.length > 0) {
        documented += 1;
      } else {
        missing.push(`${entry} ${exported.getName()}`);
      }
    }
  }

  return { documented, total, missing };
}

describe("JSR documentation", () => {
  it("documents the extrator entrypoint", () => {
    const source = readFileSync(join(root, "src/extrator/index.ts"), "utf8");
    expect(source.trimStart().startsWith("/**")).toBe(true);
    expect(source).toContain("@module");
  });

  it("documents at least 80% of exported symbols", () => {
    const { documented, total, missing } = documentationCoverage();
    expect(total).toBeGreaterThan(70);
    expect(documented / total, missing.join("\n")).toBeGreaterThanOrEqual(0.8);
  });
});
