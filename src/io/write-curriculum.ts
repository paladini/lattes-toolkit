import { writeFile } from "node:fs/promises";
import { backupBeforeWrite } from "../backup/store.js";
import type { Curriculum } from "../types.js";
import { serializeCurriculum } from "../serialize/serialize-curriculum.js";
import type { CurriculumSectionId } from "../serialize/sync-document.js";
import { validateCurriculumXml } from "../validate/validate-curriculum.js";

/** Options for {@link writeCurriculum}. Backup stays on unless `backup` is false. */
export interface WriteCurriculumOptions {
  backup?: boolean;
  backupDir?: string;
  validate?: boolean;
  schemaPath?: string;
  sections?: CurriculumSectionId[];
}

/**
 * Serializes `cv` to `targetPath`.
 * Creates a backup when the target file already exists, unless `backup` is false.
 */
export async function writeCurriculum(
  cv: Curriculum,
  targetPath: string,
  options: WriteCurriculumOptions = {},
): Promise<void> {
  const backup = options.backup !== false;
  if (backup) {
    await backupBeforeWrite(targetPath, {
      backupDir: options.backupDir,
      curriculumId: cv.id,
    });
  }

  const xml = serializeCurriculum(cv, { sections: options.sections });
  if (options.validate) {
    const result = validateCurriculumXml(xml, {
      schemaPath: options.schemaPath,
    });
    if (result.skipped) {
      throw new Error(result.reason ?? "Validation skipped");
    }
    if (!result.valid) {
      throw new Error(result.errors.join("\n"));
    }
  }
  await writeFile(targetPath, xml, "latin1");
}
