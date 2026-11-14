/** Raw XML fragments not mapped to typed fields (stable JSON-serializable shape). */
export type UnmappedNodes = Record<string, unknown>;

/** Parsed XML tree for lossless round-trip (internal document shape). */
export type XmlDocument = Record<string, unknown>;

/** Calendar date stored on the curriculum (`raw`, plus ISO when it parses). */
export interface LattesDate {
  raw: string;
  iso?: string;
}

/** Date and optional time from the curriculum update stamp. */
export interface LattesDateTime {
  rawDate: string;
  rawTime?: string;
  iso?: string;
}

/** Format hints from the root `CURRICULO-VITAE` attributes. */
export interface CurriculumMetadata {
  systemOrigin?: string;
  dateFormat?: string;
  timeFormat?: string;
}

/** Contact preference and electronic addresses from general data. */
export interface AddressContact {
  preference?: string;
  electronic?: string;
  otherContact?: string;
  socialNetwork?: string;
}

/** Professional or residential address. Residential address uses this shape. */
export interface ProfessionalAddress {
  institution?: string;
  department?: string;
  city?: string;
  state?: string;
  country?: string;
  street?: string;
  postalCode?: string;
  neighborhood?: string;
  areaCode?: string;
  phone?: string;
  email?: string;
  homepage?: string;
  raw?: Record<string, unknown>;
}

/** One research area declared on the identification. */
export interface ResearchArea {
  name: string;
  knowledgeArea?: string;
  subArea?: string;
  specialty?: string;
  raw?: Record<string, unknown>;
}

/** Language proficiency entry. */
export interface LanguageEntry {
  language: string;
  languageCode?: string;
  proficiency?: string;
  reading?: string;
  speaking?: string;
  writing?: string;
  comprehension?: string;
  raw?: Record<string, unknown>;
}

/** One academic degree, from graduation through post-doctoral work. */
export interface AcademicDegree {
  xmlTag?: string;
  level: string;
  /** Course or program name (`NOME-CURSO` in XML). */
  courseName?: string;
  /** Thesis, monograph, or conclusion work title (tag-specific attribute in XML). */
  title?: string;
  institution?: string;
  startYear?: string;
  endYear?: string;
  status?: string;
  sequence?: string;
  raw?: Record<string, unknown>;
}

/** Employment link inside a professional activity. */
export interface EmploymentLink {
  linkType?: string;
  functionalRole?: string;
  weeklyHours?: string;
  exclusive?: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  raw?: Record<string, unknown>;
}

/** Member of a research project team. */
export interface ResearchProjectTeamMember {
  name: string;
  citationName?: string;
  integrationOrder?: string;
  responsible?: string;
  raw?: Record<string, unknown>;
}

/** Funding institution attached to a research project. */
export interface ResearchProjectFunder {
  sequence?: string;
  institutionCode?: string;
  institutionName?: string;
  nature?: string;
  raw?: Record<string, unknown>;
}

/** Research project inside a professional activity. */
export interface ResearchProject {
  name: string;
  nameEnglish?: string;
  startYear?: string;
  endYear?: string;
  sequence?: string;
  situation?: string;
  nature?: string;
  description?: string;
  descriptionEnglish?: string;
  projectIdentifier?: string;
  innovationPotential?: string;
  teamMembers: ResearchProjectTeamMember[];
  funders: ResearchProjectFunder[];
  raw?: Record<string, unknown>;
}

/** Project participation block (`PARTICIPACAO-EM-PROJETO`). */
export interface ProjectParticipation {
  sequence?: string;
  periodFlag?: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  organCode?: string;
  organName?: string;
  unitCode?: string;
  unitName?: string;
  projects: ResearchProject[];
  raw?: Record<string, unknown>;
}

/** One row under an `ATIVIDADES-DE-*` block inside `ATUACAO-PROFISSIONAL`. */
export interface ProfessionalFunctionEntry {
  category: string;
  xmlContainerTag: string;
  xmlItemTag: string;
  sequence?: string;
  periodFlag?: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  organCode?: string;
  organName?: string;
  unitCode?: string;
  unitName?: string;
  /** Attributes outside the common period/org block (e.g. `TIPO-ENSINO`, `CARGO-OU-FUNCAO`). */
  specifics: Record<string, string>;
  raw?: Record<string, unknown>;
}

/** One institution where the researcher works or worked. */
export interface ProfessionalActivity {
  institution?: string;
  institutionCode?: string;
  role?: string;
  startYear?: string;
  endYear?: string;
  links: EmploymentLink[];
  projectParticipations: ProjectParticipation[];
  functionActivities: ProfessionalFunctionEntry[];
  raw?: Record<string, unknown>;
}

/** Person credited on a production item. */
export interface Author {
  name: string;
  citationName?: string;
  order?: number;
  raw?: Record<string, unknown>;
}

/** Bibliographic work (article, paper, book, or other text). */
export interface BibliographicItem extends ProductionEnvelope {
  type: string;
  xmlTag?: string;
  title: string;
  year?: string;
  authors: Author[];
  journalOrEvent?: string;
  doi?: string;
  sequence?: string;
  raw?: Record<string, unknown>;
}

/** Knowledge-area classification attached to a production item. */
export interface KnowledgeAreaEntry {
  majorArea?: string;
  area?: string;
  subArea?: string;
  specialty?: string;
}

/** Free-text description stored with a production item. */
export interface ProductionAdditionalInfo {
  description?: string;
  descriptionEnglish?: string;
}

/** Attribute envelope shared by technical production items (XSD sequence). */
export interface ProductionEnvelope {
  basics: Record<string, string>;
  detail: Record<string, string>;
  keywords: string[];
  knowledgeAreas: KnowledgeAreaEntry[];
  activitySectors: string[];
  additionalInfo?: ProductionAdditionalInfo;
}

/** Artistic or cultural production item. */
export interface ArtisticItem extends ProductionEnvelope {
  type: string;
  xmlTag: string;
  containerTag?: string;
  title: string;
  year?: string;
  sequence?: string;
  authors?: Author[];
  raw?: Record<string, unknown>;
}

/** Technical production item (software, report, course, and similar). */
export interface TechnicalItem extends ProductionEnvelope {
  type: string;
  xmlTag?: string;
  containerTag?: string;
  title: string;
  year?: string;
  sequence?: string;
  authors?: Author[];
  raw?: Record<string, unknown>;
}

/** Completed or in-progress student advisory. */
export interface Advisory extends ProductionEnvelope {
  type: string;
  studentName?: string;
  title?: string;
  institution?: string;
  year?: string;
  status: "completed" | "in_progress";
  raw?: Record<string, unknown>;
}

/** Prize or title from `PREMIOS-TITULOS`. */
export interface Award {
  title: string;
  year?: string;
  promotingEntity?: string;
  raw?: Record<string, unknown>;
}

/** Short course or other complementary training. */
export interface ComplementaryTraining {
  type: string;
  title?: string;
  institution?: string;
  workload?: string;
  startYear?: string;
  endYear?: string;
  status?: string;
  level?: string;
  institutionCode?: string;
  organCode?: string;
  organName?: string;
  courseCode?: string;
  titleEnglish?: string;
  sequence?: string;
  raw?: Record<string, unknown>;
}

/** Person listed on an event participation. */
export interface EventParticipant {
  name: string;
  citationName?: string;
  order?: number;
}

/** Event participation (organizer, speaker, and similar). */
export interface EventParticipation extends ProductionEnvelope {
  type: string;
  title?: string;
  year?: string;
  eventName?: string;
  city?: string;
  sequence?: string;
  participants: EventParticipant[];
  raw?: Record<string, unknown>;
}

/** Person listed on a board or committee. */
export interface BoardParticipant {
  name: string;
  citationName?: string;
  order?: number;
  raw?: Record<string, unknown>;
}

/** Thesis board or judging board participation. */
export interface BoardParticipation extends ProductionEnvelope {
  kind: "thesis" | "judging";
  xmlTag: string;
  title?: string;
  year?: string;
  sequence?: string;
  candidateName?: string;
  institution?: string;
  participants: BoardParticipant[];
  raw?: Record<string, unknown>;
}

/** Extra institution referenced from complementary data. */
export interface AdditionalInstitution {
  institutionCode: string;
  acronym?: string;
  country?: string;
  raw?: Record<string, unknown>;
}

/** Extra course referenced from complementary data. */
export interface AdditionalCourse {
  courseCode: string;
  institutionCode?: string;
  institutionName?: string;
  raw?: Record<string, unknown>;
}

/** Complementary section: training, events, boards, and extra institutions. */
export interface ComplementaryData {
  complementaryTraining: ComplementaryTraining[];
  eventParticipation: EventParticipation[];
  boards: BoardParticipation[];
  additionalInstitutions: AdditionalInstitution[];
  additionalCourses: AdditionalCourse[];
  unmapped: UnmappedNodes;
}

/** Leave period from `LICENCAS`. Personal identifiers stay untyped. */
export interface License {
  type?: string;
  startDateFormat?: string;
  startDate?: string;
  endDateFormat?: string;
  endDate?: string;
  raw?: Record<string, unknown>;
}

/** Identification block: name, summary, addresses, areas, and languages. */
export interface CurriculumIdentification {
  fullName: string;
  citationName?: string;
  summary?: string;
  summaryEnglish?: string;
  otherRelevantInfo?: string;
  addressContact?: AddressContact;
  professionalAddress?: ProfessionalAddress;
  residentialAddress?: ProfessionalAddress;
  researchAreas: ResearchArea[];
  languages: LanguageEntry[];
  /** Maternity and other leaves from `LICENCAS`. Personal identifiers stay untyped. */
  licenses: License[];
  unmapped: UnmappedNodes;
}

/** Bibliographic production grouped by kind of work. */
export interface BibliographicProduction {
  journalArticles: BibliographicItem[];
  /** `ARTIGOS-ACEITOS-PARA-PUBLICACAO`, kept apart from published articles. */
  acceptedArticles: BibliographicItem[];
  /** `TEXTOS-EM-JORNAIS-OU-REVISTAS`. */
  newspaperTexts: BibliographicItem[];
  conferencePapers: BibliographicItem[];
  booksAndChapters: BibliographicItem[];
  /** Includes scores, prefaces, and translations, distinguished by `xmlTag`. */
  other: BibliographicItem[];
  unmapped: UnmappedNodes;
}

/** Advisories split into completed and in progress. */
export interface AdvisorySection {
  completed: Advisory[];
  inProgress: Advisory[];
  unmapped: UnmappedNodes;
}

/** Parsed curriculum. `document` keeps the XML tree used to serialize. */
export interface Curriculum {
  id: string;
  /** Full CURRICULO-VITAE tree; required for serialize / round-trip. */
  document: XmlDocument;
  metadata: CurriculumMetadata;
  updatedAt: LattesDateTime;
  identification: CurriculumIdentification;
  academicBackground: AcademicDegree[];
  professionalActivities: ProfessionalActivity[];
  bibliographicProduction: BibliographicProduction;
  technicalProduction: TechnicalItem[];
  /** `OUTRA-PRODUCAO` artistic and cultural items. Completed advisories stay on `document`. */
  artisticProduction: ArtisticItem[];
  complementary: ComplementaryData;
  advisories: AdvisorySection;
  awards: Award[];
  unmapped: UnmappedNodes;
}
