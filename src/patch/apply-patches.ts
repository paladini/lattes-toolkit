import type { Curriculum } from "../types.js";
import { setCurriculumValue } from "./paths.js";

/** One field write applied by {@link applyCurriculumPatches}. */
export interface CurriculumPatch {
  path: string;
  value: unknown;
}

/** Restricts which paths {@link applyCurriculumPatches} may change. */
export interface ApplyPatchesOptions {
  /** If set, only these dot-paths (exact) may be modified. */
  allowlist?: string[];
}

/** Applies path writes to `cv`. An allowlist rejects any path that is not listed. */
export function applyCurriculumPatches(
  cv: Curriculum,
  patches: CurriculumPatch[],
  options: ApplyPatchesOptions = {},
): Curriculum {
  for (const patch of patches) {
    if (options.allowlist && !options.allowlist.includes(patch.path)) {
      throw new Error(`Patch path not allowed: ${patch.path}`);
    }
    setCurriculumValue(cv, patch.path, patch.value);
  }
  return cv;
}
