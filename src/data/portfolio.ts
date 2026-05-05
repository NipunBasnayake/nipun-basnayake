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
      "I build software for real workflows: systems that model data carefully, expose dependable APIs, and deliver interfaces that stay fast, clear, and polished.",
  },
  body: [
    "I build full-stack systems using Spring Boot, React, Next.js, PostgreSQL, Docker, and Kafka, focusing on SaaS platforms, ERP systems, and workflow-driven applications where strong backend architecture and clear frontend design come together to deliver reliable, production-ready products.",
  ],
  proofPoints: [
    "End-to-end full-stack delivery from database schema to responsive UI",
    "REST API design, service boundaries, authentication-aware workflows, and integration thinking",
    "Production mindset with Docker, cloud readiness, API validation, and clean TypeScript models",
  ],
  competencies: [
    {
      id: "systems",
      title: "Production Systems",
      description: "I design APIs, workflows, and services with maintainability, traceability, and real-world constraints in mind.",
      icon: ServerCog,
    },
    {
      id: "product",
      title: "Product Engineering",
      description: "I turn ERP, SaaS, and operational requirements into interfaces that people can actually use daily.",
      icon: Layers3,
    },
    {
      id: "delivery",
      title: "Delivery Mindset",
      description: "I build beyond demos—focusing on Docker, cloud readiness, validation, documentation, and production-quality releases.",
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
    id: "associate-software-engineer",
    period: "Jun 2025 – Present",
    role: "Associate Software Engineer (Full Stack)",
    company: "Residue Solutions (Pvt) Ltd",
    location: "Colombo, Sri Lanka",
    summary:
      "Building scalable full-stack systems across Spring Boot, NestJS, and React/Next.js, focusing on performance, clean architecture, and production reliability.",
    responsibilities: [
      "Designed and documented RESTful APIs using Swagger/OpenAPI to support scalable frontend and mobile integrations.",
      "Developed responsive frontend features with React.js and Next.js, integrating APIs efficiently using Tailwind CSS.",
      "Built backend services with Spring Boot and NestJS, emphasizing maintainability, performance, and clean architecture.",
      "Optimized PostgreSQL queries and indexing, improving API response times and handling larger datasets efficiently.",
      "Implemented secure authentication systems using JWT and OAuth2 with Spring Security and NestJS middleware.",
      "Designed microservices-based systems using Spring Boot and Kafka-driven event architecture for distributed processing.",
      "Integrated third-party services including Google Maps API and Google Sheets API for automation and location-based features.",
      "Containerized applications with Docker and implemented CI/CD pipelines using GitHub Actions.",
      "Diagnosed and resolved production issues across APIs and databases, improving system stability and reducing downtime.",
      "Developed SaaS and ERP systems focused on usability, performance, and real business workflows.",
      "Wrote unit and integration tests using JUnit and Jest to improve reliability and maintainability.",
    ],
    stack: [
      "Spring Boot",
      "NestJS",
      "React",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Kafka",
      "Docker",
      "JWT",
      "OAuth2",
      "GitHub Actions",
    ],
  },
  {
    id: "software-engineering-intern",
    period: "Apr 2025 – Jun 2025",
    role: "Software Engineering Intern (Full Stack)",
    company: "Residue Solutions (Pvt) Ltd",
    location: "Colombo, Sri Lanka",
    summary:
      "Contributed to production-ready full-stack applications, focusing on API development, authentication, and system performance.",
    responsibilities: [
      "Built backend APIs using NestJS and Spring Boot for real-world applications.",
      "Implemented secure authentication systems with JWT-based access control and RBAC.",
      "Integrated frontend applications with backend APIs and Firebase for real-time features.",
      "Improved performance through SQL query optimization and structured backend testing using Jest and JUnit.",
      "Collaborated using Git workflows, pull requests, and code reviews within a team environment.",
    ],
    stack: ["Spring Boot", "NestJS", "React", "Firebase", "PostgreSQL", "JWT", "RBAC", "Jest", "JUnit"],
  },
  {
    id: "software-engineering-trainee",
    period: "Jul 2024 – Apr 2025",
    role: "Software Engineering Trainee",
    company: "Institute of Computer Engineering Technology (iCET)",
    location: "Sri Lanka",
    summary:
      "Built foundational full-stack systems while strengthening backend architecture, authentication, and collaborative development practices.",
    responsibilities: [
      "Developed full-stack applications using Java, Spring Boot, Angular, and REST APIs.",
      "Implemented authentication systems using JWT tokens and role-based access control (RBAC).",
      "Worked in Agile teams using Git version control and collaborative workflows.",
    ],
    stack: ["Java", "Spring Boot", "Angular", "REST APIs", "JWT", "RBAC", "Git"],
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
    title: "WorkNest – Multi-Tenant Workforce Platform",
    type: "SaaS platform",
    problem:
      "Organizations need a scalable system to manage workforce operations across multiple tenants while maintaining strict data isolation and performance.",
    solution:
      "Designed and built a multi-tenant SaaS platform with isolated tenant databases, secure authentication, and role-based workflows for workforce management.",
    architecture:
      "Spring Boot backend with tenant-aware data isolation, JWT/OAuth2 security, and React frontend with structured workflow modules and real-time features.",
    result:
      "Delivered a scalable workforce platform with improved performance, reliable API communication, and real-time task and chat synchronization.",
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "JWT", "OAuth2", "Docker"],
    links: [{ label: "Discuss Build", href: "#contact", icon: ArrowUpRight }],
    accent: "from-arctic/60 via-wine/35 to-ember/35",
  },
  {
    id: "residue-erp",
    title: "Residue ERP System",
    type: "ERP platform",
    problem:
      "Business operations require a unified system to manage inventory, invoicing, financial data, and customer workflows without fragmentation.",
    solution:
      "Built a full-stack ERP system with modular architecture covering invoicing, inventory, customers, suppliers, and financial workflows.",
    architecture:
      "Spring Boot backend with JWT-secured APIs, PostgreSQL persistence, and a React frontend using React Query, React Hook Form, and Material UI.",
    result:
      "Improved operational efficiency with a scalable, production-ready ERP system featuring robust validation, API communication, and Dockerized deployment.",
    stack: ["Spring Boot", "React", "PostgreSQL", "Docker", "JWT", "Swagger"],
    links: [{ label: "Explore Scope", href: "#contact", icon: ArrowUpRight }],
    accent: "from-ember/65 via-wine/30 to-arctic/30",
  },
  {
    id: "task-management",
    title: "Task Management System",
    type: "Full-stack application",
    problem:
      "Task systems often lack proper security, ownership control, and production-ready architecture for real-world usage.",
    solution:
      "Developed a secure full-stack task management system with authentication, protected routes, and structured workflow handling.",
    architecture:
      "Next.js frontend with middleware protection, NestJS backend with JWT auth, MongoDB persistence, and DTO validation with rate limiting.",
    result:
      "Delivered a production-ready system with secure access control, scalable deployment, and clean API design.",
    stack: ["Next.js", "NestJS", "MongoDB", "JWT", "Docker", "Vercel"],
    links: [{ label: "Live System", href: "#contact", icon: ArrowUpRight }],
    accent: "from-volt/45 via-arctic/35 to-wine/35",
  },
  {
    id: "event-driven-microservices",
    title: "Event-Driven Microservices System",
    type: "Distributed systems architecture",
    problem:
      "Monolithic systems struggle with scalability and loose coupling when handling independent business processes.",
    solution:
      "Engineered microservices using event-driven architecture with Kafka for asynchronous communication and service decoupling.",
    architecture:
      "Spring Boot microservices with Kafka messaging, Dockerized services, and REST APIs for synchronous interactions.",
    result:
      "Enabled scalable, distributed processing with improved system resilience and service independence.",
    stack: ["Spring Boot", "Kafka", "Docker", "Microservices", "PostgreSQL"],
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
    problem:
      "Automotive businesses require integrated systems for service workflows, inventory, and customer management.",
    solution:
      "Built a full-stack ERP platform to manage automotive operations with secure APIs and real-time capabilities.",
    architecture:
      "NestJS backend with REST APIs, React frontend, MongoDB storage, and AWS deployment with Firebase integration.",
    result:
      "Delivered a scalable cloud-based system supporting operational workflows and real-time updates.",
    stack: ["NestJS", "React", "MongoDB", "AWS", "Firebase", "REST APIs"],
    links: [{ label: "Discuss Build", href: "#contact", icon: ArrowUpRight }],
    accent: "from-ember/60 via-volt/25 to-arctic/25",
  },
  {
    id: "evoplan",
    title: "EvoPlan Enterprise Web Application",
    type: "Enterprise planning system",
    problem:
      "Teams struggle to align planning, resources, and execution in a single structured system.",
    solution:
      "Led backend and authentication development for a planning platform with modular architecture and secure workflows.",
    architecture:
      "Angular frontend with Spring Boot backend, OAuth2 authentication, and Supabase integration for storage and data management.",
    result:
      "Delivered a collaborative enterprise system built with Agile practices across a 45+ developer team.",
    stack: ["Angular", "Spring Boot", "OAuth2", "Supabase", "REST APIs"],
    links: [{ label: "View Direction", href: "#contact", icon: Layers3 }],
    accent: "from-arctic/55 via-wine/30 to-volt/25",
  },
  {
    id: "hr-management",
    title: "HR Management System",
    type: "Internal business system",
    problem:
      "HR systems need structured handling of employee data, payroll, and workflows with proper access control.",
    solution:
      "Developed a modular HR system with secure authentication, role-based access, and scalable backend architecture.",
    architecture:
      "Spring Boot backend with REST APIs, Angular frontend, MySQL database, and JWT-based RBAC security.",
    result:
      "Built a maintainable and scalable system supporting HR workflows with improved performance and security.",
    stack: ["Spring Boot", "Angular", "MySQL", "JWT", "RBAC"],
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
