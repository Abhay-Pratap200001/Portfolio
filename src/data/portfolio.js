// All portfolio content lives here so it can be edited without touching components.
import nestoraShot from "../assets/projects/nestora.webp";
import ecommerceShot from "../assets/projects/ecommerce.webp";

export const profile = {
  name: "Abhay Pratap",
title: 'Full-Stack Developer | MERN Stack | Next.js',
  location: "Lucknow, Uttar Pradesh, India",
  email: "itsabhaypratap006@gmail.com",
  phone: "+91 9305557140",
  phoneHref: "tel:+919305557140",
  whatsapp: "https://wa.me/919305557140",
  github: "https://github.com/Abhay-Pratap200001",
  linkedin: "https://www.linkedin.com/in/abhaypratap006/",
  tagline:
    "Building scalable full-stack applications with React, Next.js, Node.js, and MongoDB. Experienced in API integration, cloud deployment, and developing responsive web experiences.",
};

// Resume: put the PDF at public/Abhay_Pratap_Resume.pdf. To update it later,
// replace that file (keep the same name) and redeploy.
export const resume = {
  file: "/Abhay_Pratap_Resume.pdf",
  downloadName: "Abhay_Pratap_MERN_Developer_Resume.pdf",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "cloud", label: "Cloud" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export const about = {
  paragraphs: [
    "I'm Abhay Pratap, a Full-Stack Web Developer specializing in building modern, scalable, and user-focused web applications. I work across the development lifecycle, from creating responsive user interfaces with React.js and Next.js to developing backend services, REST APIs, and database-driven applications using Node.js, Express.js, and MongoDB.",

    "Through my internship experience and independent projects, I've worked on real-world application features, including authentication systems, API integrations, dynamic dashboards, data management, reusable UI components, and third-party service integrations. I focus on writing maintainable code, building efficient application architectures, and creating smooth user experiences.",

    "Beyond application development, I have hands-on experience with cloud technologies and deployment workflows. I've worked with AWS EC2, S3, Amplify, Docker, Nginx, and Linux environments to deploy and manage web applications. I'm also comfortable working with Git, GitHub, Postman, and modern development tools.",

    "I enjoy solving technical problems, learning new technologies, and turning ideas into functional products. I'm continuously improving my skills and looking for opportunities to collaborate with development teams, contribute to meaningful projects, and grow as a software engineer.",
  ],

  interests: [
    "Full-Stack Application Development",
    "Modern Frontend Architecture",
    "Backend Development & REST APIs",
    "Database Design & Optimization",
    "Cloud Infrastructure & Deployment",
    "Performance Optimization",
    "Problem Solving & Clean Code",
  ],

  strengths: [
    {
      title: "Full-Stack Development",
      text: "Building end-to-end web applications with React, Next.js, Node.js, Express.js, and MongoDB.",
    },
    {
      title: "Modern UI Development",
      text: "Creating responsive, reusable, and user-friendly interfaces with a focus on performance and maintainability.",
    },
    {
      title: "API Development & Integration",
      text: "Developing and integrating REST APIs, implementing authentication, and handling asynchronous data workflows.",
    },
    {
      title: "Cloud & Deployment",
      text: "Deploying web applications using AWS EC2, S3, Amplify, Docker, Nginx, and Linux environments.",
    },
  ],
};

// Most recent first. Dates are shown exactly as provided.
export const experience = [
  {
    company: "Datapel Systems",
    role: "Software Developer Intern",
    period: "Aug, 2026 – Oct, 2026",
    domain: "Cloud inventory & warehouse management",
    points: [
      "Developed and maintained responsive web interfaces for cloud-based inventory tracking, stock lookup and order fulfillment dashboards.",
      "Integrated frontend modules with backend REST APIs to display warehouse stock levels and purchase orders.",
      "Worked on third-party platform integrations involving services such as Xero, MYOB and Shopify.",
      "Built interactive, searchable and filterable data tables for SKU catalogs, warehouse locations and dispatch queues.",
      "Improved page loading, form validation and cross-browser compatibility.",
      "Collaborated with senior developers, QA and product teams to fix bugs and deliver production updates.",
    ],
    tech: ["React.js", "Next.js", "TypeScript", "HTML5", "CSS3", "REST APIs", "Git", "GitHub", "Postman"],
  },
  {
    company: "SparrowBytes FinTech Solutions",
    role: "Software Developer Intern",
    period: "Feb, 2026 – May, 2026",
    domain: "Logistics & jewellery web applications",
    points: [
      "Developed and optimized key modules of a logistics web application using Next.js and TypeScript.",
      "Built 10+ reusable and scalable UI components.",
      "Worked on the maintenance and updating of a jewellery application.",
      "Integrated APIs and handled asynchronous data efficiently.",
      "Improved frontend responsiveness and optimized rendering for critical pages.",
      "Collaborated with team members using Git and GitHub in an Agile workflow.",
    ],
    tech: ["Next.js", "TypeScript", "Git", "GitHub", "Postman"],
  },
];

// Descriptions are based on each repository's package.json, folder structure and README.
export const projects = [
  {
    name: "Nestora",
    kind: "Real Estate Application",
    summary:
      "A MERN real-estate platform where users can sign up, publish property listings with multiple images, and search listings by type, price and keyword.",
    features: [
      "JWT authentication with bcrypt hashing, cookies and protected routes",
      "Google sign-in via Firebase OAuth",
      "Create, update and delete listings with Cloudinary image uploads",
      "Search filters for rent/sale, furnished, category, price range and keyword",
      "Profile management with Redux Toolkit state",
      "Swiper image sliders and Lenis smooth scrolling",
    ],
    stack: [
      "React 19",
      "Redux Toolkit",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "Firebase",
    ],
    live: "https://mern-real-estate-ax8b.onrender.com",
    source: "https://github.com/Abhay-Pratap200001/Real-state-clone",
    preview: "estate",
    image: nestoraShot,
  },
  {
    name: "E-commerce Store",
    kind: "Full-Stack E-commerce Application",
    summary:
      "A full-stack online store with product catalogue, cart, Stripe checkout and an admin dashboard for managing products and viewing sales analytics.",
    features: [
      "JWT access + refresh token auth, with refresh tokens stored in Redis",
      "Category pages, featured products and a shopping cart",
      "Stripe Checkout payment flow",
      "Admin dashboard: product CRUD, featured products, sales charts (Recharts)",
      "Cloudinary product image uploads",
      "Zustand state management and Framer Motion UI animation",
    ],
    stack: [
      "React 19",
      "Zustand",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Stripe",
      "Cloudinary",
    ],
    live: "https://e-commerce-aj2h.onrender.com",
    source: "https://github.com/Abhay-Pratap200001/E-Commerce",
    preview: "shop",
    image: ecommerceShot,
  },
];

// level: 'practical' = used in internships/projects, 'explored' = studied / hands-on learning.
export const skillGroups = [
  {
    title: "Frontend",
    icon: "Layout",
    skills: [
      { name: "HTML", level: "practical" },
      { name: "CSS", level: "practical" },
      { name: "JavaScript", level: "practical" },
      { name: "React.js", level: "practical" },
      { name: "Next.js", level: "practical" },
      { name: "TypeScript", level: "practical" },
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js", level: "practical" },
      { name: "Express.js", level: "practical" },
      { name: "REST APIs", level: "practical" },
      { name: "API Integration", level: "practical" },
      { name: "Authentication (JWT)", level: "practical" },
    ],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: "practical" },
      { name: "Redis", level: "practical" },
      { name: "MySQL", level: "explored" },
      { name: "PostgreSQL", level: "explored" },
      { name: "DynamoDB", level: "explored" },
      { name: "Amazon RDS", level: "explored" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      { name: "AWS EC2", level: "practical" },
      { name: "AWS S3", level: "practical" },
      { name: "AWS Amplify", level: "practical" },
      { name: "Docker", level: "practical" },
      { name: "AWS IAM", level: "explored" },
      { name: "AWS VPC", level: "explored" },
      { name: "AWS Lambda", level: "explored" },
      { name: "AWS CloudWatch", level: "explored" },
      { name: "AWS ECS / EKS", level: "explored" },
      { name: "Terraform", level: "explored" },
    ],
  },
  {
    title: "Developer Tools",
    icon: "Wrench",
    skills: [
      { name: "Git", level: "practical" },
      { name: "GitHub", level: "practical" },
      { name: "Postman", level: "practical" },
      { name: "Nginx", level: "practical" },
    ],
  },
];

export const cloudProjects = [
  {
    title: "Full-Stack App Deployment on AWS EC2",
    diagram: "ec2",
    tags: ["Docker", "AWS EC2", "Ubuntu", "Nginx", "SSH", "Security Groups"],
    points: [
      "Containerized a full-stack web application using Docker.",
      "Provisioned an Ubuntu EC2 instance and configured security group rules for app and SSH access.",
      "Connected over SSH and installed Docker, Git and Nginx.",
      "Deployed the Dockerized app with Nginx configured as a reverse proxy.",
    ],
  },
  {
    title: "Frontend Deployment with AWS Amplify",
    diagram: "amplify",
    tags: ["AWS Amplify", "GitHub", "CI/CD"],
    points: [
      "Deployed a frontend application using AWS Amplify.",
      "Connected a GitHub repository and configured the build and deploy workflow.",
      "Published updates through GitHub-based deployments.",
      "Monitored deployment status in the Amplify console.",
    ],
  },
  {
    title: "Amazon S3 Storage Practice",
    diagram: "s3",
    tags: ["AWS S3", "Buckets", "Access Control"],
    points: [
      "Created an Amazon S3 bucket.",
      "Uploaded and organized code files and static images.",
      "Practiced bucket and object management.",
      "Explored access control and cloud storage concepts.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  university: "Makhanlal Chaturvedi University",
  duration: "2022 – 2025",
  graduation: "July 2025",
  cgpa: "7.5 / 10",
};
