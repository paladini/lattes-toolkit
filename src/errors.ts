/** Base error for invalid curriculum data or Extrator failures. */
export class LattesError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "LattesError";
    this.code = code;
  }
}

/** Thrown when a value is not a 16-digit Lattes ID. */
export class InvalidLattesIdError extends LattesError {
  constructor(value: string) {
    super("INVALID_LATTES_ID", `Invalid Lattes identifier: ${value}`);
    this.name = "InvalidLattesIdError";
  }
}

/** Thrown when curriculum XML cannot be parsed or serialized. */
export class InvalidCurriculumXmlError extends LattesError {
  constructor(message: string) {
    super("INVALID_CURRICULUM_XML", message);
    this.name = "InvalidCurriculumXmlError";
  }
}

/** Thrown when a curriculum ZIP cannot be read. */
export class InvalidCurriculumArchiveError extends LattesError {
  constructor(message: string) {
    super("INVALID_CURRICULUM_ARCHIVE", message);
    this.name = "InvalidCurriculumArchiveError";
  }
}

/** Thrown when the Extrator SOAP client cannot complete a call. */
export class ExtratorError extends LattesError {
  constructor(code: string, message: string) {
    super(code, message);
    this.name = "ExtratorError";
  }
}
