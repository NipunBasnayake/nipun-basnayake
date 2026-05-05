import {
  ArrowUpRight,
  Cloud,
  Code2,
  Database,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MessageCircle,
  Network,
  Rocket,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: LucideIcon;
}

export interface CtaItem extends LinkItem {
  variant: ButtonVariant;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  intro: string;
}

export interface ProofStat {
  value: string;
  label: string;
}

export interface HeroData {
  eyebrow: string;
  nameLines: [string, string];
  roleLine: string;
  lead: string;
  portrait: string;
  portraitAlt: string;
  qualities: string[];
  cta: CtaItem[];
  stats: ProofStat[];
}

export interface SummaryData {
  section: SectionCopy;
  body: string[];
  proofPoints: string[];
  competencies: Competency[];
}

export interface Competency {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  skills: string[];
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  accent: string;
  icon: LucideIcon;
  tools: string[];
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  outcome: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  responsibilities: string[];
  stack: string[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  type: string;
  problem: string;
  solution: string;
  architecture: string;
  result: string;
  stack: string[];
  links: LinkItem[];
  image?: string;
  accent: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  image?: string;
  status?: "earned" | "preparing";
}

export interface EducationItem {
  id: string;
  institution: string;
  program: string;
  period: string;
  location: string;
  details: string;
  focus: string[];
}

export interface ContactData {
  section: SectionCopy;
  availability: string;
  links: LinkItem[];
  closingLine: string;
}

export const siteData = {
  name: "Nipun Sathsara Basnayaka",
  shortName: "Nipun Basnayaka",
  role: "Full Stack Software Engineer",
  location: "Negombo, Sri Lanka",
  email: "nipunsathsara1999@gmail.com",
  phone: "+94 77 880 6029",
  meta: "Premium full stack software engineering portfolio for Nipun Sathsara Basnayaka",
};

export const navItems: LinkItem[] = [
  { label: "Profile", href: "#summary" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export const heroData: HeroData = {
  eyebrow: "Full Stack Software Engineer / Product Engineer",
  nameLines: ["NIPUN", "BASNAYAKA"],
  roleLine: "Spring Boot, React, microservices, PostgreSQL, Kafka, Docker, AWS",
  lead:
    "I build production-ready systems: reliable APIs, SaaS platforms, ERP workflows, event-driven services, and polished interfaces that make complex operations feel clear.",
  portrait: "/assets/images/photos/profile.png",
  portraitAlt: "Portrait of Nipun Sathsara Basnayaka",
  qualities: [
    "Backend systems with clean API contracts",
    "React and Next.js product interfaces",
    "Microservices, events, and data modeling",
    "ERP, SaaS, and workflow automation",
    "Production-minded delivery and deployment",
  ],
  cta: [
    {
      label: "View Case Studies",
      href: "#projects",
      variant: "primary",
      icon: ArrowUpRight,
    },
    {
      label: "Contact",
      href: "#contact",
      variant: "secondary",
      icon: Mail,
    },
  ],
  stats: [
    { value: "7", label: "engineering case studies" },
    { value: "6", label: "credential tracks" },
    { value: "API", label: "first architecture" },
    { value: "Cloud", label: "deployment mindset" },
  ],
};

export const summaryData: SummaryData = {
  section: {
    eyebrow: "Professional Summary",
    title: "A full-stack engineer with product taste and backend discipline.",
    intro:
      "Nipun builds software for real workflows: systems that model data carefully, expose dependable APIs, and give users interfaces that stay fast, legible, and polished.",
  },
  body: [
    "His work spans Spring Boot services, React and Next.js frontends, PostgreSQL-backed applications, Dockerized delivery, and event-driven thinking with Kafka. The common thread is practical engineering judgment: define the domain, protect the contract, ship the workflow.",
    "He is especially drawn to SaaS platforms, ERP systems, internal tools, HR and task management workflows, automotive operations, and microservice architectures where backend reliability and frontend clarity have to meet in one product.",
  ],
  proofPoints: [
    "Full-stack application delivery from database schema to responsive UI",
    "REST API design, service boundaries, authentication-aware workflows, and integration thinking",
    "Production habits across Docker, AWS preparation, Postman validation, and clean TypeScript data models",
  ],
  competencies: [
    {
      id: "systems",
      title: "Production Systems",
      description: "Designs APIs, workflows, and services around maintainability, traceability, and real operating constraints.",
      icon: ServerCog,
    },
    {
      id: "product",
      title: "Product Engineering",
      description: "Turns ERP, SaaS, HR, task, and operations requirements into interfaces people can actually run daily.",
      icon: Layers3,
    },
    {
      id: "delivery",
      title: "Delivery Mindset",
      description: "Thinks beyond the demo: Docker, cloud readiness, validation, documentation, and incremental release quality.",
      icon: Rocket,
    },
  ],
};

export const skillsSection: SectionCopy = {
  eyebrow: "Technical Stack",
  title: "A backend-heavy full-stack toolkit, shaped for product delivery.",
  intro:
    "Grouped by how the work gets built: service architecture, frontend product surfaces, data, infrastructure, and engineering practice.",
};

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & APIs",
    description: "Service logic, RESTful contracts, layered architecture, and secure application workflows.",
    icon: ServerCog,
    accent: "from-ember/70 via-wine/30 to-transparent",
    skills: ["Java", "Spring Boot", "NestJS", "Node.js", "REST APIs", "Spring Security", "JWT", "Microservices"],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Typed component systems, responsive product UI, state-aware workflows, and motion polish.",
    icon: Code2,
    accent: "from-arctic/60 via-wine/25 to-transparent",
    skills: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "data",
    title: "Data & Persistence",
    description: "Relational modeling, transactional workflows, query design, and integration-ready storage.",
    icon: Database,
    accent: "from-volt/40 via-arctic/25 to-transparent",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase Firestore", "JPA", "Hibernate", "SQL"],
  },
  {
    id: "architecture",
    title: "Distributed Systems",
    description: "Event-driven patterns, service boundaries, asynchronous communication, and operational thinking.",
    icon: Network,
    accent: "from-wine/70 via-arctic/20 to-transparent",
    skills: ["Kafka", "Docker", "Microservices", "API Gateway", "Event Flows", "Service Contracts", "Postman"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Containerized delivery, deployment awareness, environment management, and cloud architecture preparation.",
    icon: Cloud,
    accent: "from-arctic/50 via-ember/25 to-transparent",
    skills: ["AWS EC2", "AWS S3", "AWS IAM", "Docker", "GitHub Actions", "CI/CD", "Vercel"],
  },
  {
    id: "quality",
    title: "Engineering Practice",
    description: "Clean code, typed data contracts, API validation, documentation, debugging, and collaborative delivery.",
    icon: ShieldCheck,
    accent: "from-ember/50 via-volt/25 to-transparent",
    skills: ["TypeScript Types", "OOP", "Testing Mindset", "API Docs", "Agile", "Debugging", "Code Review"],
  },
];

export const experienceSection: SectionCopy = {
  eyebrow: "Experience Timeline",
  title: "Systems work, shaped through real product builds.",
  intro:
    "A compact timeline of Nipun's engineering focus across full-stack platforms, ERP systems, microservices, and production-oriented delivery.",
};

export const experience: ExperienceItem[] = [
  {
    id: "full-stack-product-engineering",
    period: "2024 - Present",
    role: "Full Stack Software Engineer",
    company: "Independent product and academic engineering work",
    location: "Colombo, Sri Lanka",
    summary:
      "Built full-stack platforms that connect Spring Boot APIs, relational data models, and React product interfaces for operational workflows.",
    responsibilities: [
      "Designed backend service layers, REST endpoints, DTOs, validation flow, and database-backed business logic.",
      "Implemented responsive React interfaces for task management, HR, ERP, and SaaS-style products.",
      "Used Git, Postman, Docker, and typed frontend data structures to keep delivery testable and maintainable.",
    ],
    stack: ["Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker", "Postman"],
  },
  {
    id: "erp-systems",
    period: "2023 - 2025",
    role: "ERP & Workflow Systems Builder",
    company: "Portfolio engineering projects",
    location: "Remote / Sri Lanka",
    summary:
      "Created domain-focused systems for residue management, automotive operations, HR workflows, and enterprise planning.",
    responsibilities: [
      "Modeled entities, permissions, statuses, and operational flows around real business processes.",
      "Translated complex internal workflows into dashboards, forms, tables, and decision screens.",
      "Structured projects as reusable application modules rather than isolated pages.",
    ],
    stack: ["Java", "Spring Boot", "SQL", "React", "Tailwind CSS", "REST"],
  },
  {
    id: "microservices-learning",
    period: "2025",
    role: "Microservices & Cloud Architecture Learner",
    company: "Certification-led engineering practice",
    location: "Sri Lanka",
    summary:
      "Deepened production readiness through Docker, Kafka-style event flows, AWS architecture preparation, and API validation practice.",
    responsibilities: [
      "Explored event-driven service communication, container boundaries, and deployment-aware application design.",
      "Validated API behavior with Postman and strengthened Java foundations through professional certification tracks.",
      "Built a stronger security and systems mindset through cybersecurity and ethical hacking training.",
    ],
    stack: ["Docker", "Kafka", "AWS", "Java", "Postman", "Cybersecurity"],
  },
];

export const projectsSection: SectionCopy = {
  eyebrow: "Engineering Case Studies",
  title: "Not cards. Systems with constraints, tradeoffs, and outcomes.",
  intro:
    "Each project is presented as an engineering case study: the problem, the system shape, the implementation approach, and the practical result.",
};

export const projects: ProjectCaseStudy[] = [
  {
    id: "worknest",
    title: "WorkNest",
    type: "SaaS productivity platform",
    problem: "Teams need one reliable place to coordinate work, visibility, ownership, and progress without turning daily operations into spreadsheet drift.",
    solution: "Designed a full-stack task and workspace system with project views, role-aware workflows, and clean API boundaries between collaboration data and UI state.",
    architecture: "React product surface backed by Spring Boot REST services, relational task models, status workflows, and validation-focused endpoint contracts.",
    result: "A product-grade foundation for work tracking that can grow into team dashboards, notifications, and analytics.",
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "REST APIs", "Docker"],
    links: [{ label: "Discuss Build", href: "#contact", icon: ArrowUpRight }],
    accent: "from-arctic/60 via-wine/35 to-ember/35",
  },
  {
    id: "residue-erp",
    title: "Residue ERP System",
    type: "ERP operations system",
    problem: "Residue and resource operations require traceable inventory movement, status changes, and reporting across multiple business steps.",
    solution: "Built an ERP-style workflow with structured entities, operational screens, and backend rules for inventory, users, and process state.",
    architecture: "Layered Spring Boot backend with SQL persistence and a React interface organized around workflow modules instead of static pages.",
    result: "Improved clarity around operational state, making the system easier to audit, extend, and demonstrate to stakeholders.",
    stack: ["Spring Boot", "React", "SQL", "REST", "Tailwind CSS", "Postman"],
    links: [{ label: "Explore Scope", href: "#contact", icon: ArrowUpRight }],
    accent: "from-ember/65 via-wine/30 to-arctic/30",
  },
  {
    id: "task-management",
    title: "Task Management System",
    type: "Workflow application",
    problem: "Task systems often stop at CRUD and miss the operating details: assignment, priority, status, filtering, and a UI that helps people move quickly.",
    solution: "Implemented task lifecycle flows with practical UI states, structured data, and backend endpoints designed for predictable updates.",
    architecture: "Typed React components consuming REST APIs, with relational persistence for task metadata, ownership, and progress.",
    result: "A clearer, more maintainable workflow system that demonstrates both frontend usability and backend structure.",
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "REST APIs"],
    links: [{ label: "Review Logic", href: "#contact", icon: TerminalSquare }],
    accent: "from-volt/45 via-arctic/35 to-wine/35",
  },
  {
    id: "event-driven-microservices",
    title: "Event-Driven Microservices System",
    type: "Distributed systems architecture",
    problem: "Monolithic flows become brittle when independent business capabilities need to communicate without tight coupling.",
    solution: "Modeled services around bounded responsibilities and asynchronous events, using message-driven thinking for resilience and service independence.",
    architecture: "Spring Boot microservices with Kafka-style event channels, Dockerized services, and API contracts for synchronous entry points.",
    result: "A stronger architecture practice for scalable backend systems, service ownership, and integration reliability.",
    stack: ["Spring Boot", "Kafka", "Docker", "Microservices", "REST", "PostgreSQL"],
    links: [
      {
        label: "Source",
        href: "https://github.com/NipunBasnayake/Java-Springboot-Microservices",
        external: true,
        icon: Github,
      },
    ],
    accent: "from-wine/70 via-arctic/30 to-ember/30",
  },
  {
    id: "automotive-erp",
    title: "Automotive ERP System",
    type: "Business operations platform",
    problem: "Automotive operations need connected visibility across stock, service flow, customers, and administrative work.",
    solution: "Designed an ERP structure that organizes automotive workflows into modules with clear data ownership and role-aware screens.",
    architecture: "Backend-first ERP model with React dashboards, form-heavy workflows, SQL-backed records, and API-driven module boundaries.",
    result: "A scalable foundation for an internal operations tool that can support future analytics and workflow automation.",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "REST APIs", "Docker"],
    links: [{ label: "Talk Through", href: "#contact", icon: ArrowUpRight }],
    accent: "from-ember/60 via-volt/25 to-arctic/25",
  },
  {
    id: "evoplan",
    title: "EvoPlan Enterprise Web Application",
    type: "Enterprise planning app",
    problem: "Planning work becomes difficult when teams cannot connect priorities, timelines, resources, and execution state in one coherent interface.",
    solution: "Built a planning-oriented web application concept with modular views, reusable components, and a stronger information hierarchy.",
    architecture: "React/TypeScript interface with structured content models, reusable UI primitives, and backend-ready workflow assumptions.",
    result: "A polished enterprise product surface that demonstrates product thinking beyond isolated screens.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "API Design"],
    links: [{ label: "View Direction", href: "#contact", icon: Layers3 }],
    accent: "from-arctic/55 via-wine/30 to-volt/25",
  },
  {
    id: "hr-management",
    title: "HR Management System",
    type: "Internal business system",
    problem: "HR teams need consistent handling for employee records, workflow visibility, and administrative decisions without fragmented tools.",
    solution: "Created an HR system structure for employee data, operational screens, and backend-ready flows for people management.",
    architecture: "Full-stack CRUD and workflow foundation with relational employee models, RESTful endpoints, and responsive interface modules.",
    result: "A practical internal system pattern that can be extended with attendance, leave, payroll, and approval workflows.",
    stack: ["Spring Boot", "Angular", "MySQL", "JWT", "RBAC", "REST APIs"],
    links: [
      {
        label: "Source",
        href: "https://github.com/NipunBasnayake/HrManagementSystem-Angular-Springboot",
        external: true,
        icon: Github,
      },
    ],
    accent: "from-wine/55 via-ember/30 to-arctic/30",
  },
];

export const certificatesSection: SectionCopy = {
  eyebrow: "Certificates",
  title: "Credentials that reinforce the engineering stack.",
  intro:
    "A sliding gallery for current and upcoming credentials across containers, Java, APIs, cybersecurity, AI/ML, and cloud architecture.",
};

export const certificates: Certificate[] = [
  {
    id: "docker-foundations",
    title: "Docker Foundations Professional Certificate",
    issuer: "Docker, Inc.",
    year: "2025",
    description: "Container fundamentals, image workflows, and deployment-ready packaging habits.",
    image: "/assets/images/certificates/docker-foundations.png",
    status: "earned",
  },
  {
    id: "java-foundations",
    title: "Java Foundations Professional Certificate",
    issuer: "JetBrains",
    year: "2025",
    description: "Core Java language foundations for backend engineering and Spring Boot readiness.",
    image: "/assets/images/certificates/java-foundations.png",
    status: "earned",
  },
  {
    id: "postman-api",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    year: "2025",
    description: "API validation, requests, collections, and practical REST workflow confidence.",
    image: "/assets/images/certificates/postman-api-fundamentals.png",
    status: "earned",
  },
  {
    id: "cybersecurity-ethical-hacking",
    title: "Diploma in Cybersecurity and Ethical Hacking",
    issuer: "SITC Campus",
    year: "Top 5 / A+",
    description: "Security fundamentals, ethical hacking mindset, and risk-aware engineering practice.",
    image: "/assets/images/certificates/cybersecurity-ethical-hacking.png",
    status: "earned",
  },
  {
    id: "ai-ml-stage-one",
    title: "AI/ML Engineer Stage 1",
    issuer: "SLIIT",
    year: "2025",
    description: "Introductory AI and machine learning concepts for modern intelligent applications.",
    image: "/assets/images/certificates/ai-ml-engineer-stage-1.png",
    status: "earned",
  },
  {
    id: "aws-solutions-architect",
    title: "AWS Certified Solutions Architect Associate",
    issuer: "Amazon Web Services",
    year: "Preparing",
    description: "Cloud architecture preparation focused on scalable, resilient, and cost-aware systems.",
    image: "/assets/images/certificates/aws-solutions-architect-associate.png",
    status: "preparing",
  },
];

export const educationSection: SectionCopy = {
  eyebrow: "Education",
  title: "Formal learning backed by certification-led practice.",
  intro:
    "Nipun combines software engineering study with applied credentials in cloud, containers, APIs, cybersecurity, Java, and AI/ML.",
};

export const education: EducationItem[] = [
  {
    id: "software-engineering",
    institution: "University of Colombo School of Computing",
    program: "BSc in Information Technology",
    period: "Aug 2022 - Jul 2026",
    location: "Sri Lanka",
    details:
      "Focused on practical software systems across backend services, frontend product interfaces, databases, cloud deployment, and collaborative engineering.",
    focus: ["Java", "Spring Boot", "React", "Databases", "System Design", "Cloud Readiness"],
  },
  {
    id: "cybersecurity",
    institution: "SITC Campus",
    program: "Diploma in Cybersecurity and Ethical Hacking",
    period: "Completed",
    location: "Sri Lanka",
    details:
      "Completed with Top 5 recognition and A+ performance, strengthening secure engineering instincts.",
    focus: ["Security fundamentals", "Ethical hacking", "Risk awareness", "Defensive thinking"],
  },
];

export const contactData: ContactData = {
  section: {
    eyebrow: "Contact",
    title: "Need a full-stack engineer who can think in systems and ship the interface?",
    intro:
      "Reach out for backend-heavy web apps, SaaS platforms, ERP systems, API work, microservices, or product engineering collaborations.",
  },
  availability: "Open to full-stack software engineering, product engineering, and backend-focused opportunities.",
  links: [
    {
      label: "Email",
      href: "mailto:nipunsathsara1999@gmail.com",
      icon: Mail,
    },
    {
      label: "GitHub",
      href: "https://github.com/NipunBasnayake",
      external: true,
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nipunbasnayake/",
      external: true,
      icon: Linkedin,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/94778806029",
      external: true,
      icon: MessageCircle,
    },
  ],
  closingLine: "Built with React, TypeScript, Spring Boot thinking, motion, and production taste.",
};

export const footerLinks: LinkItem[] = [
  { label: "Profile", href: "#summary" },
  { label: "Work", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];
