import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

describe("jsr.json", () => {
  it("matches package.json version and export map", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    const jsr = JSON.parse(readFileSync(join(root, "jsr.json"), "utf8"));
    expect(jsr.name).toBe("@paladini/lattes-toolkit");
    expect(jsr.version).toBe(pkg.version);
    expect(jsr.exports["."]).toBe("./src/index.ts");
    expect(jsr.exports["./extrator"]).toBe("./src/extrator/index.ts");
    expect(jsr.publish.include).toContain(
      "DEFINITIONS/xml_cvbase_src_main_resources_CurriculoLattes_12_09_2022.xsd",
    );
  });
});