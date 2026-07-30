export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: "Foundation" | "Intermediate" | "Advanced";
  duration: string;
  udemyUrl: string;
  outcomes: string[];
  curriculum: { title: string; description: string }[];
  rating?: string;
  students?: string;
  status: "published" | "coming-soon";
  shortCode: string;
  pathSlugs: string[];
}

export const courses: Course[] = [
  // --- Path: DevOps / Platform Engineer ---
  {
    slug: "ultimate-devops-bootcamp",
    title: "Ultimate DevOps Bootcamp",
    tagline: "Master DevOps fundamentals from scratch",
    description:
      "A comprehensive, hands-on bootcamp covering the full DevOps toolchain from source control to production deployment. You will learn Linux fundamentals, Git, Docker, Kubernetes, Terraform, Ansible, Jenkins CI/CD pipelines, and cloud infrastructure practices used by modern engineering teams. The course is built around real-world labs and projects so you build practical, job-ready DevOps skills rather than just theory.",
    level: "Foundation",
    duration: "40 hours",
    udemyUrl:
      "https://www.udemy.com/course/ultimate-devops-bootcamp-by-school-of-devops/?referralCode=A8BF1965E5F822B8EDE1",
    outcomes: [
      "Set up and manage Linux servers and shell scripting for automation",
      "Use Git and GitHub for version control and collaborative workflows",
      "Containerize applications with Docker and orchestrate them with Kubernetes",
      "Provision cloud infrastructure as code using Terraform",
      "Automate configuration management with Ansible",
      "Build CI/CD pipelines with Jenkins for continuous delivery",
    ],
    curriculum: [
      { title: "Linux and Shell Scripting Foundations", description: "Core Linux administration and scripting skills for DevOps engineers." },
      { title: "Git and Version Control", description: "Branching, merging, and collaborative workflows with Git and GitHub." },
      { title: "Docker and Containerization", description: "Building, running, and managing containerized applications." },
      { title: "Kubernetes Fundamentals", description: "Deploying and managing workloads on a Kubernetes cluster." },
      { title: "Infrastructure as Code with Terraform", description: "Provisioning cloud infrastructure declaratively." },
      { title: "Configuration Management with Ansible", description: "Automating server configuration at scale." },
      { title: "CI/CD with Jenkins", description: "Building automated build, test, and deploy pipelines." },
    ],
    rating: "4.6",
    students: "35000",
    status: "published",
    shortCode: "DO",
    pathSlugs: ["devops-platform-engineer"],
  },
  {
    slug: "ultimate-ansible-bootcamp",
    title: "Ultimate Ansible Bootcamp",
    tagline: "Automate infrastructure at scale with Ansible",
    description:
      "A deep, project-driven course on Ansible for configuration management and automation. You will learn to write playbooks, roles, and inventories, and use Ansible to automate provisioning and configuration across large fleets of servers, from fundamentals through advanced patterns used in production environments.",
    level: "Intermediate",
    duration: "18 hours",
    udemyUrl:
      "https://www.udemy.com/course/ultimate-ansible-bootcamp/?referralCode=706F8C8965DDD15F55DA",
    outcomes: [
      "Write and organize Ansible playbooks and roles",
      "Manage dynamic and static inventories",
      "Automate multi-tier application deployments",
      "Use Ansible Vault to manage secrets securely",
      "Apply Ansible best practices for idempotent automation",
      "Integrate Ansible into CI/CD pipelines",
    ],
    curriculum: [
      { title: "Ansible Fundamentals", description: "Core concepts, inventories, and ad-hoc commands." },
      { title: "Writing Playbooks", description: "Tasks, handlers, variables, and templates." },
      { title: "Roles and Reusability", description: "Structuring automation with Ansible Galaxy roles." },
      { title: "Advanced Ansible Patterns", description: "Loops, conditionals, error handling, and vault." },
      { title: "Real-World Automation Projects", description: "End-to-end provisioning and deployment scenarios." },
    ],
    rating: "4.6",
    students: "12000",
    status: "published",
    shortCode: "AN",
    pathSlugs: ["devops-platform-engineer"],
  },
  {
    slug: "cicd-jenkins-docker",
    title: "CI/CD with Jenkins & Docker",
    tagline: "Build production-grade CI/CD pipelines",
    description:
      "A hands-on bootcamp covering Jenkins for continuous integration and continuous delivery. You will learn to install and configure Jenkins, write declarative and scripted pipelines, integrate with Docker and Kubernetes, and build robust, production-grade CI/CD workflows.",
    level: "Intermediate",
    duration: "16 hours",
    udemyUrl:
      "https://www.udemy.com/course/ultimate-jenkins-bootcamp-by-school-of-devops/?referralCode=BAC80386E38F767AC155",
    outcomes: [
      "Install, configure, and administer Jenkins",
      "Write declarative and scripted Jenkins pipelines",
      "Integrate Jenkins with Git, Docker, and Kubernetes",
      "Implement multi-branch pipelines and shared libraries",
      "Set up automated testing and deployment stages",
      "Apply Jenkins security and credential management best practices",
    ],
    curriculum: [
      { title: "Jenkins Fundamentals", description: "Installation, configuration, and core concepts." },
      { title: "Pipeline as Code", description: "Declarative and scripted Jenkinsfile pipelines." },
      { title: "Jenkins with Docker and Kubernetes", description: "Containerized build agents and deployments." },
      { title: "Multi-Branch Pipelines and Shared Libraries", description: "Scaling CI/CD across teams and repositories." },
      { title: "Jenkins Security and Administration", description: "Credentials, RBAC, and production hardening." },
    ],
    rating: "4.6",
    students: "15000",
    status: "published",
    shortCode: "JK",
    pathSlugs: ["devops-platform-engineer"],
  },
  {
    slug: "ultimate-aws-bootcamp",
    title: "Ultimate AWS Bootcamp",
    tagline: "Implement DevOps practices on AWS",
    description:
      "A comprehensive bootcamp on implementing DevOps practices on Amazon Web Services. You will learn to build CI/CD pipelines, automate infrastructure with Terraform and CloudFormation, and deploy scalable, resilient applications using core AWS services.",
    level: "Intermediate",
    duration: "24 hours",
    udemyUrl:
      "https://www.udemy.com/course/aws-devops-bootcamp/?referralCode=B41341BB6F35E5A8CBA2",
    outcomes: [
      "Deploy and manage infrastructure on AWS",
      "Automate infrastructure provisioning with Terraform and CloudFormation",
      "Build CI/CD pipelines using AWS-native and third-party tools",
      "Deploy containerized workloads on ECS and EKS",
      "Implement monitoring and logging with CloudWatch",
      "Apply AWS security and IAM best practices",
    ],
    curriculum: [
      { title: "AWS Fundamentals for DevOps", description: "Core AWS services and account setup." },
      { title: "Infrastructure as Code on AWS", description: "Terraform and CloudFormation for provisioning." },
      { title: "CI/CD Pipelines on AWS", description: "Automated build, test, and deploy workflows." },
      { title: "Containers on AWS", description: "Deploying workloads with ECS and EKS." },
      { title: "Monitoring, Logging, and Security", description: "CloudWatch, IAM, and operational best practices." },
    ],
    rating: "4.5",
    students: "9000",
    status: "published",
    shortCode: "AW",
    pathSlugs: ["devops-platform-engineer"],
  },
  {
    slug: "ultimate-eks-bootcamp",
    title: "Ultimate EKS Bootcamp",
    tagline: "Run production-grade Kubernetes on AWS",
    description:
      "A hands-on course focused on Amazon Elastic Kubernetes Service (EKS). You will learn to provision, configure, and operate production-grade Kubernetes clusters on AWS, covering networking, storage, autoscaling, and best practices for running workloads at scale.",
    level: "Intermediate",
    duration: "20 hours",
    udemyUrl:
      "https://www.udemy.com/course/ultimate-eks-bootcamp-school-of-devops/?referralCode=C52888C854D71EA8AD9B",
    outcomes: [
      "Provision and manage EKS clusters",
      "Configure networking, IAM, and RBAC for EKS",
      "Deploy and scale workloads with autoscaling",
      "Manage persistent storage on EKS",
      "Implement CI/CD pipelines targeting EKS",
      "Apply production best practices for EKS operations",
    ],
    curriculum: [
      { title: "EKS Fundamentals", description: "Cluster provisioning and core architecture." },
      { title: "Networking and Security on EKS", description: "VPC, IAM roles, and RBAC configuration." },
      { title: "Workload Deployment and Scaling", description: "Deployments, autoscaling, and load balancing." },
      { title: "Storage and Stateful Workloads", description: "Persistent volumes and storage classes on EKS." },
      { title: "Production Operations", description: "Monitoring, upgrades, and operational best practices." },
    ],
    rating: "4.6",
    students: "7000",
    status: "published",
    shortCode: "EK",
    pathSlugs: ["devops-platform-engineer"],
  },
  {
    slug: "advanced-kubernetes-bootcamp",
    title: "Advanced Kubernetes Bootcamp",
    tagline: "Prepare for the Certified Kubernetes Administrator exam",
    description:
      "A rigorous, exam-focused course preparing you for the Certified Kubernetes Administrator (CKA) exam. You will learn cluster architecture, installation, networking, storage, troubleshooting, and security, with extensive hands-on labs mirroring the real exam environment.",
    level: "Advanced",
    duration: "32 hours",
    udemyUrl:
      "https://www.udemy.com/course/kubernetes-certified-administrator/?referralCode=668C42F019B5D127006A",
    outcomes: [
      "Install and configure Kubernetes clusters",
      "Manage workloads, scheduling, and scaling",
      "Configure cluster networking and services",
      "Manage storage, volumes, and persistent data",
      "Troubleshoot cluster and application issues",
      "Prepare for and pass the CKA certification exam",
    ],
    curriculum: [
      { title: "Cluster Architecture and Installation", description: "Setting up and bootstrapping Kubernetes clusters." },
      { title: "Workloads and Scheduling", description: "Deployments, scheduling, and scaling strategies." },
      { title: "Services and Networking", description: "Cluster networking, services, and ingress." },
      { title: "Storage", description: "Persistent volumes, claims, and storage classes." },
      { title: "Troubleshooting", description: "Diagnosing cluster, node, and application failures." },
      { title: "CKA Exam Practice", description: "Mock exams and exam-taking strategies." },
    ],
    rating: "4.7",
    students: "45000",
    status: "published",
    shortCode: "K8",
    pathSlugs: ["devops-platform-engineer"],
  },
  {
    slug: "ultimate-argo-bootcamp",
    title: "Ultimate Argo Bootcamp",
    tagline: "GitOps continuous delivery on Kubernetes",
    description:
      "A hands-on course on the Argo ecosystem for Kubernetes-native CI/CD and workflow automation. You will learn Argo CD for GitOps-based continuous delivery, Argo Workflows for orchestrating pipelines, and how to build fully automated, declarative deployment pipelines on Kubernetes.",
    level: "Intermediate",
    duration: "14 hours",
    udemyUrl:
      "https://www.udemy.com/course/ultimate-argo-bootcamp-by-school-of-devops/?referralCode=F34684D2947EDD2A8EF8",
    outcomes: [
      "Implement GitOps continuous delivery with Argo CD",
      "Automate workflows and pipelines with Argo Workflows",
      "Manage multi-environment deployments declaratively",
      "Implement progressive delivery strategies",
      "Integrate Argo with existing CI/CD toolchains",
      "Apply GitOps best practices on Kubernetes",
    ],
    curriculum: [
      { title: "GitOps Fundamentals", description: "Principles of declarative, Git-driven delivery." },
      { title: "Argo CD Deep Dive", description: "Application deployment and sync strategies." },
      { title: "Argo Workflows", description: "Orchestrating pipelines natively on Kubernetes." },
      { title: "Progressive Delivery", description: "Canary and blue-green deployments with Argo." },
      { title: "Production GitOps Patterns", description: "Multi-cluster and multi-environment management." },
    ],
    rating: "4.6",
    students: "4000",
    status: "published",
    shortCode: "AR",
    pathSlugs: ["devops-platform-engineer"],
  },
  {
    slug: "ultimate-istio-bootcamp",
    title: "Ultimate Istio Bootcamp",
    tagline: "Master service mesh on Kubernetes",
    description:
      "A comprehensive, hands-on course on Istio service mesh for Kubernetes. You will learn traffic management, security, observability, and resilience patterns, gaining practical experience configuring Istio in real-world microservices architectures.",
    level: "Intermediate",
    duration: "14 hours",
    udemyUrl:
      "https://www.udemy.com/course/ultimate-istio-bootcamp/?referralCode=BE5DC388AC12CF94DC31",
    outcomes: [
      "Install and configure Istio service mesh on Kubernetes",
      "Implement traffic management and routing rules",
      "Secure service-to-service communication with mTLS",
      "Set up observability with tracing and metrics",
      "Apply resilience patterns like circuit breaking and retries",
      "Operate Istio in production-grade microservices environments",
    ],
    curriculum: [
      { title: "Service Mesh Fundamentals", description: "Why service mesh and how Istio fits in." },
      { title: "Traffic Management", description: "Virtual services, routing, and traffic splitting." },
      { title: "Security with Istio", description: "mTLS, authorization policies, and identity." },
      { title: "Observability", description: "Metrics, tracing, and visualization with Istio." },
      { title: "Resilience Patterns", description: "Circuit breaking, retries, and fault injection." },
    ],
    rating: "4.6",
    students: "3500",
    status: "published",
    shortCode: "IS",
    pathSlugs: ["devops-platform-engineer"],
  },
  {
    slug: "ultimate-devsecops-bootcamp",
    title: "Ultimate DevSecOps Bootcamp",
    tagline: "Shift security left in your DevOps pipeline",
    description:
      "A hands-on bootcamp integrating security practices into the DevOps pipeline. You will learn to shift security left with static and dynamic analysis, container and infrastructure scanning, secrets management, and compliance automation embedded directly into CI/CD workflows.",
    level: "Intermediate",
    duration: "16 hours",
    udemyUrl:
      "https://www.udemy.com/course/ultimate_devsecops_bootcamp/?referralCode=82189A9CE8EEC401274F",
    outcomes: [
      "Integrate security scanning into CI/CD pipelines",
      "Perform static and dynamic application security testing",
      "Scan container images and infrastructure code for vulnerabilities",
      "Manage secrets securely across the pipeline",
      "Implement policy-as-code and compliance automation",
      "Apply DevSecOps best practices across the SDLC",
    ],
    curriculum: [
      { title: "DevSecOps Fundamentals", description: "Shift-left security principles and pipeline integration." },
      { title: "Static and Dynamic Analysis", description: "SAST and DAST tooling in CI/CD." },
      { title: "Container and Infrastructure Security", description: "Image scanning and IaC security checks." },
      { title: "Secrets Management", description: "Securely handling credentials in pipelines." },
      { title: "Policy as Code and Compliance", description: "Automating governance and compliance checks." },
    ],
    rating: "4.5",
    students: "3000",
    status: "published",
    shortCode: "DS",
    pathSlugs: ["devops-platform-engineer"],
  },
  {
    slug: "windows-containers-azure",
    title: "Windows Containers with Azure CI/CD Pipeline",
    tagline: "Build CI pipelines with Azure DevOps and Docker",
    description:
      "A practical course on building continuous integration pipelines using Azure DevOps and Docker. You will learn to set up build pipelines, containerize applications, and automate testing and delivery workflows using Microsoft's Azure DevOps platform.",
    level: "Foundation",
    duration: "10 hours",
    udemyUrl:
      "https://www.udemy.com/course/continuous-integration-with-azure-devops-and-docker/?referralCode=745F4AB38A8632B3739D",
    outcomes: [
      "Set up Azure DevOps projects and repositories",
      "Build CI pipelines with Azure Pipelines",
      "Containerize applications using Docker",
      "Automate testing within CI workflows",
      "Publish and manage container images",
      "Integrate Azure DevOps with Docker-based deployments",
    ],
    curriculum: [
      { title: "Azure DevOps Fundamentals", description: "Projects, repos, and pipeline basics." },
      { title: "Docker Fundamentals", description: "Building and running containerized applications." },
      { title: "CI Pipelines with Azure Pipelines", description: "Automated build and test workflows." },
      { title: "Containerized CI Workflows", description: "Combining Docker with Azure Pipelines." },
      { title: "Publishing and Deployment", description: "Managing images and deployment automation." },
    ],
    rating: "4.4",
    students: "5000",
    status: "published",
    shortCode: "AZ",
    pathSlugs: ["devops-platform-engineer"],
  },
  // --- Path: Agentic DevOps (AI for DevOps) ---
  {
    slug: "aiml-foundations",
    title: "AI/ML Foundations for Absolute Beginners",
    tagline: "Build foundational knowledge of AI, ML, and agentic systems",
    description:
      "A beginner-friendly introduction to AI and machine learning foundations, extending into agentic AI concepts and MLOps practices. You will build a solid understanding of core ML concepts, how modern AI agents work, and how MLOps brings DevOps discipline to machine learning systems.",
    level: "Foundation",
    duration: "8 hours",
    udemyUrl:
      "https://www.udemy.com/course/aiml-foundations-for-absolute-beginners-agenticai-mlops/?referralCode=0312C90C0B546DFCC6BA",
    outcomes: [
      "Understand core AI and machine learning concepts",
      "Learn the fundamentals of agentic AI systems",
      "Understand the MLOps lifecycle for ML systems",
      "Explore how DevOps practices apply to machine learning",
      "Build foundational knowledge for further AI/ML learning",
      "Understand real-world use cases of AI agents",
    ],
    curriculum: [
      { title: "Introduction to AI and Machine Learning", description: "Core concepts and terminology." },
      { title: "Understanding Agentic AI", description: "How AI agents reason, plan, and act." },
      { title: "MLOps Fundamentals", description: "Applying DevOps principles to ML workflows." },
      { title: "AI/ML Tooling Landscape", description: "Overview of common frameworks and platforms." },
      { title: "Real-World Applications", description: "Practical use cases across industries." },
    ],
    rating: "4.5",
    students: "2000",
    status: "published",
    shortCode: "AI",
    pathSlugs: ["agentic-devops"],
  },
  {
    slug: "docker-genai-agentic",
    title: "Docker for GenAI & AgenticAI",
    tagline: "Containerize and deploy AI/ML workloads with Docker",
    description:
      "A hands-on course on using Docker to build, package, and deploy AI and machine learning applications. You will learn to containerize ML models and pipelines, manage dependencies, and deploy AI workloads consistently across development and production environments.",
    level: "Intermediate",
    duration: "10 hours",
    udemyUrl:
      "https://www.udemy.com/course/mastering-aiml-with-docker/?referralCode=5984A469AB6F4D56DED7",
    outcomes: [
      "Containerize machine learning models and pipelines with Docker",
      "Manage ML dependencies and environments using containers",
      "Build reproducible AI/ML development workflows",
      "Deploy containerized ML applications to production",
      "Optimize Docker images for AI/ML workloads",
      "Apply container best practices to ML systems",
    ],
    curriculum: [
      { title: "Docker Fundamentals for AI/ML", description: "Core Docker concepts applied to ML workflows." },
      { title: "Containerizing ML Models", description: "Packaging models and dependencies into images." },
      { title: "Reproducible ML Environments", description: "Managing environments and dependency isolation." },
      { title: "Deploying AI/ML Workloads", description: "Running containerized ML applications in production." },
      { title: "Optimization and Best Practices", description: "Image size, performance, and security for ML containers." },
    ],
    rating: "4.5",
    students: "1800",
    status: "published",
    shortCode: "DG",
    pathSlugs: ["agentic-devops"],
  },
  {
    slug: "ai-driven-iac",
    title: "AI Driven Infrastructure as Code",
    tagline: "Accelerate IaC and cloud automation with AI",
    description:
      "A forward-looking course exploring how AI tools accelerate Infrastructure as Code and cloud automation. You will learn to combine Terraform and cloud automation practices with AI-assisted workflows to generate, review, and manage infrastructure code more efficiently.",
    level: "Intermediate",
    duration: "10 hours",
    udemyUrl:
      "https://www.udemy.com/course/ai-driven-infrastructure-as-code-iac-and-cloud-automation/?referralCode=5ED8B63441C86BD8A4FD",
    outcomes: [
      "Use AI tools to accelerate Infrastructure as Code development",
      "Write and manage infrastructure using Terraform",
      "Apply AI-assisted code generation and review to IaC",
      "Automate cloud infrastructure provisioning workflows",
      "Understand best practices for AI-augmented cloud automation",
      "Combine AI tooling with existing DevOps pipelines",
    ],
    curriculum: [
      { title: "Infrastructure as Code Fundamentals", description: "Core IaC concepts and Terraform basics." },
      { title: "AI-Assisted IaC Development", description: "Using AI tools to generate and review infrastructure code." },
      { title: "Cloud Automation Workflows", description: "Automating provisioning and configuration in the cloud." },
      { title: "Integrating AI into DevOps Pipelines", description: "Combining AI tooling with existing CI/CD practices." },
      { title: "Best Practices and Governance", description: "Safe, reviewable AI-augmented infrastructure changes." },
    ],
    rating: "4.4",
    students: "1500",
    status: "published",
    shortCode: "IA",
    pathSlugs: ["agentic-devops"],
  },
  // --- Path: AI Platform Engineer (DevOps for AI) ---
  {
    slug: "devops-to-mlops-bootcamp",
    title: "DevOps to MLOps Bootcamp",
    tagline: "Bridge DevOps expertise into MLOps",
    description:
      "A bootcamp designed for DevOps engineers transitioning into MLOps. You will learn how machine learning workflows differ from traditional software delivery, and how to apply CI/CD, infrastructure automation, and monitoring principles to the ML lifecycle.",
    level: "Intermediate",
    duration: "12 hours",
    udemyUrl:
      "https://www.udemy.com/course/devops-to-mlops-bootcamp/?referralCode=32FDA90B8EEDA296A577",
    outcomes: [
      "Understand the differences between DevOps and MLOps workflows",
      "Build CI/CD pipelines for machine learning models",
      "Automate model training, versioning, and deployment",
      "Monitor ML models in production",
      "Apply infrastructure automation to ML systems",
      "Bridge DevOps skills into machine learning operations",
    ],
    curriculum: [
      { title: "From DevOps to MLOps", description: "Mapping DevOps principles onto ML workflows." },
      { title: "ML Pipeline Automation", description: "CI/CD for model training and deployment." },
      { title: "Model Versioning and Registry", description: "Managing model artifacts and lineage." },
      { title: "Deploying ML Models", description: "Serving and scaling models in production." },
      { title: "Monitoring ML Systems", description: "Tracking model performance and drift in production." },
    ],
    rating: "4.4",
    students: "1200",
    status: "published",
    shortCode: "ML",
    pathSlugs: ["ai-platform-engineer"],
  },
  // --- Aspirational (coming soon) ---
  {
    slug: "llmops-with-kubernetes",
    title: "LLMOps with Kubernetes",
    tagline: "Run AI systems at scale",
    description:
      "Learn to deploy, scale, and operate large language model services on Kubernetes infrastructure.",
    level: "Advanced",
    duration: "Coming soon",
    udemyUrl: "",
    outcomes: [
      "Deploy LLM services on Kubernetes clusters",
      "Scale inference workloads with autoscaling",
      "Monitor and optimize LLM serving infrastructure",
    ],
    curriculum: [
      { title: "LLM Serving Architecture", description: "Patterns for deploying language models as production services" },
      { title: "Kubernetes for ML Workloads", description: "GPU scheduling, resource management, and scaling strategies" },
      { title: "Observability and Operations", description: "Monitoring latency, throughput, and cost for LLM services" },
    ],
    status: "coming-soon",
    shortCode: "LK",
    pathSlugs: [],
  },
  {
    slug: "production-agentic-devops",
    title: "Production Agentic DevOps",
    tagline: "Operationalize AI agents",
    description:
      "Build the infrastructure and delivery pipelines that make AI agents reliable, observable, and production-ready.",
    level: "Advanced",
    duration: "Coming soon",
    udemyUrl: "",
    outcomes: [
      "Design delivery pipelines for agentic systems",
      "Implement observability for autonomous agents",
      "Build guardrails and rollback mechanisms for agent deployments",
    ],
    curriculum: [
      { title: "Agent Deployment Patterns", description: "CI/CD and release strategies for agentic workloads" },
      { title: "Observability for Agents", description: "Tracing, logging, and monitoring autonomous systems" },
      { title: "Guardrails and Reliability", description: "Safety mechanisms, rollback, and human-in-the-loop patterns" },
    ],
    status: "coming-soon",
    shortCode: "AG",
    pathSlugs: [],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
