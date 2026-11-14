/**
 * SOAP client for an institutional Lattes Extrator.
 *
 * Accredited institutions pass the WSDL URL they were given. The client
 * downloads a compacted curriculum and parses it with the same reader as the
 * main module. It does not log in to the platform or upload XML.
 *
 * ```ts
 * import { ExtratorClient } from "@paladini/lattes-toolkit/extrator";
 *
 * const client = new ExtratorClient({
 *   wsdlUrl: "https://extrator.example.test/service?wsdl",
 * });
 * const curriculum = await client.getCurriculum("0000000000000001");
 * ```
 *
 * @module
 */
export { ExtratorClient } from "./client.js";
export type { ExtratorClientOptions } from "./client.js";
export { ExtratorError } from "../errors.js";
