/* ------------------------------------------------------------------
   All portfolio content lives here. Edit this file to update the site;
   no need to touch index.html, style.css or app.js.
------------------------------------------------------------------- */
window.PORTFOLIO = {
  name: "Md. Mohin Hosan Albhi",
  eyebrow: "Textile Engineer · BUTEX · Dhaka",
  role: "Marketing & Merchandising",
  roleDetail: "Assistant Merchandiser · Interstoff Apparels Ltd.",
  tagline:
    "Apparel merchandising professional specializing in end-to-end order management, product development, sourcing, costing, and on-time shipment. Experienced in managing international buyer accounts, including Calvin Klein, Reitmans, and Karl Lagerfeld, with a focus on production efficiency, quality assurance, and timely delivery.",
  focus: ["Order management", "Product development", "Sourcing", "Costing", "On-time shipment"],
  location: "Dhaka, Bangladesh",

  contact: {
    email: "mohinhosanalbhii@gmail.com",
    phone: "+8801568959112",
    linkedin: "https://www.linkedin.com/in/mohinhosanalbhi/",
    linkedinLabel: "linkedin.com/in/mohinhosanalbhi",
    resume: "Md_Mohin_Hosan_Albhi_CV.pdf"
  },

  about: {
    objective:
      "Performance-focused Merchandiser managing Calvin Klein (CK), Reitmans, and Karl Lagerfeld accounts, contributing to annual business valued at over US$13 million. Experienced in end-to-end order management, production tracking, customer & supplier communications, and ensuring on-time shipment execution. With a strong eye for detail and a commitment to continuous improvement, I aim to further develop expertise in global apparel sourcing and retail operations, while driving value, efficiency, and sustainable growth within an organization.",
    glance: [
      ["Current role", "Assistant Merchandiser – Marketing & Merchandising"],
      ["Company", "Interstoff Apparels Ltd."],
      ["Buyers", "CK · Reitmans · Karl Lagerfeld"],
      ["Degree", "B.Sc. in Textile Engineering, BUTEX (2019–2024)"],
      ["Major", "Wet Process Engineering"],
      ["Languages", "Bangla · English · Hindi"],
      ["Based in", "Dhaka, Bangladesh"]
    ]
  },

  stats: [
    { value: 3, label: "Buyer accounts managed", note: "CK · Reitmans · Karl Lagerfeld" },
    { value: 13, prefix: "US$", suffix: "M+", label: "Annual business contributed to" },
    { value: 3.6, decimals: 2, suffix: " / 4.00", label: "CGPA, B.Sc. Textile Engineering" },
    { value: 10000, prefix: "~", label: "Students tutored in online classes" }
  ],

  /* type: "work" or "teaching" */
  experience: [
    {
      type: "work",
      org: "Interstoff Apparels Ltd.",
      place: "Dhaka",
      roles: [
        {
          title: "Assistant Merchandiser – Marketing & Merchandising",
          period: "July 2025 – Present",
          since: "2025-07"
        }
      ],
      buyers: ["CK", "Reitmans", "Karl Lagerfeld"],
      points: [
        { tag: "Buyer Communication", text: "Coordinating with buyers on order status, lab dip & strike off approvals, trims approvals, sample approvals, production updates, and issue resolution." },
        { tag: "Sourcing", text: "Sourcing fabrics, trims, and accessories; coordinating with suppliers on pricing, availability, quality, and delivery." },
        { tag: "Sampling", text: "Coordinating sample development and submission across Proto, Fit, PP, Size Set, and TOP samples." },
        { tag: "Risk Analysis", text: "Participating in PP and Risk Analysis meetings to review order status, identify potential risks, and coordinate corrective actions." },
        { tag: "Booking", text: "Managing bulk fabric & trims, accessories booking through ERP, yarn requisition, and coordinating with the production team to make sure on time shipments." },
        { tag: "Commercial", text: "Coordinating with commercial teams and suppliers to resolve payment and shipment-related issues." },
        { tag: "Test Reports", text: "Coordinating fabric & garment third party testing according to buyer requirements and follow up on reports." },
        { tag: "Inspection", text: "Inline and final inspection booking to Buyer QA teams and follow up to ensure completion within shipment timelines." },
        { tag: "Planning", text: "Preparing T&A calendars and coordinate with cross-functional teams to ensure timely order execution and shipment." }
      ]
    },
    {
      type: "work",
      org: "Epyllion Group",
      place: "",
      roles: [
        { title: "Executive – Dyeing", period: "April 2025 – July 2025" },
        { title: "Management Trainee – Sample Dyeing", period: "October 2024 – March 2025" }
      ],
      points: [
        { text: "Coordinated with Knitting, R&D, Merchandising, Laboratory, QA, and Finishing teams for timely sample development and approval." },
        { text: "Supported sample production planning and monitored dyeing execution to meet quality and delivery requirements." },
        { text: "Supported cost-reduction initiatives through chemical optimization and process improvement." },
        { text: "Led the dyeing production team to successfully deliver targets." }
      ]
    },
    {
      type: "work",
      org: "Epyllion Group",
      place: "",
      roles: [{ title: "Industrial Trainee", period: "January 2024 – March 2024" }],
      points: [
        { text: "Gained knowledge of production processes by observing day-to-day operations in the production department, including knitting, dyeing, printing, finishing, quality assurance and garment manufacturing." },
        { text: "Gained in depth knowledge of quality control of the products and learned about process optimization." }
      ]
    },
    {
      type: "teaching",
      org: "Bondi Pathshala",
      place: "Farmgate, Dhaka",
      roles: [{ title: "Math Instructor", period: "July 2020 – December 2022" }],
      points: [
        { text: "Tutored approximately 10,000 students in online classes." },
        { text: "Managed 25+ private batches in online and offline." },
        { text: "Conducted guideline and GPA-5 appreciation sessions in different districts." }
      ]
    }
  ],

  activities: [
    {
      type: "activity",
      org: "BUTEX Career Club",
      place: "BUTEX, Tejgaon, Dhaka",
      roles: [
        { title: "Vice President", period: "February 2024 – November 2024" },
        { title: "Chief of HR", period: "January 2023 – December 2023" }
      ],
      points: [
        { text: "Led the team to successfully organize different career seminars, workshops and events." },
        { text: "Talent acquisition to grow the team." }
      ]
    }
  ],

  education: [
    {
      school: "Bangladesh University of Textiles (BUTEX)",
      degree: "B.Sc. in Textile Engineering",
      years: "2019 – 2024",
      lines: ["Major: Wet Process Engineering"],
      result: "CGPA 3.60 / 4.00",
      featured: true
    },
    { school: "Amirjan College", degree: "HSC", years: "2016 – 2018", lines: [], result: "GPA 5.00 / 5.00" },
    { school: "Amirjan High School", degree: "SSC", years: "2014 – 2016", lines: [], result: "GPA 5.00 / 5.00" }
  ],

  training: [
    { title: "Comprehensive Training", provider: "Epyllion Group", year: "2025" },
    { title: "Textile Merchandising", provider: "Jobletic-BD / El Corte Inglés", year: "2024" },
    { title: "Research Methodology", provider: "HELD, BUTEX", year: "2024" },
    { title: "Business Email Writing", provider: "HP LIFE", year: "2024" },
    { title: "Sustainable Chemical Management", provider: "GIZ Bangladesh", year: "2022" },
    { title: "Microsoft Excel & PowerPoint", provider: "Udemy", year: "2020" }
  ],

  scholarships: [
    { title: "Merit-based scholarship", level: "BUTEX · Undergraduate", text: "Awarded consecutively throughout undergraduate study." },
    { title: "Full academic scholarship", level: "HSC level", text: "Full academic scholarship at HSC level." }
  ],

  /* group: "hard" | "soft" | "language". "usage" shows as a highlighted badge. */
  skills: [
    { group: "hard", name: "ERP", detail: "Merchandising Module" },
    { group: "hard", name: "Microsoft Excel", detail: "VLOOKUP, XLOOKUP, Pivot Tables, Dashboard Creation" },
    { group: "hard", name: "Microsoft PowerPoint", detail: "Presentation Development" },
    { group: "hard", name: "Microsoft Word", detail: "Professional Documentation" },
    { group: "hard", name: "AI", detail: "Claude · ChatGPT", usage: "Professional working proficiency" },
    { group: "hard", name: "CLO 3D" },
    { group: "hard", name: "PLM · Buyer tracking systems", detail: "Production status, inspection booking and shipment", usage: "Daily use" },
    { group: "soft", name: "Leadership" },
    { group: "soft", name: "Communication" },
    { group: "soft", name: "Presentation" },
    { group: "soft", name: "Time Management" },
    { group: "language", name: "Bangla", usage: "Native", step: 4 },
    { group: "language", name: "English", usage: "Professional Working Proficiency", step: 3 },
    { group: "language", name: "Hindi", usage: "Intermediate", step: 2 }
  ],

  research: {
    kicker: "Undergraduate thesis project",
    heading: "Research & Technical Problem-Solving",
    title:
      "Comparative Performance Evaluation of Conventional and Enzymatic Combined Scouring–Bleaching on Linen, Modal, and Linen–Modal Blended Knit Fabrics",
    keywords: ["Linen · Modal · Blends", "Hydrogen peroxide scouring–bleaching", "Root-cause analysis", "Process optimization"],
    steps: [
      {
        label: "The problem",
        text: "During my internship at Epyllion Group, I identified recurring fabric damage, hole formation, and GSM inconsistencies in linen, modal, and linen–modal blended knit fabrics following hydrogen peroxide-based combined scouring and bleaching."
      },
      {
        label: "The research",
        text: "To investigate the issue, I conducted my undergraduate thesis research in collaboration with Epyllion Group, utilizing its facilities to examine potential root causes and evaluate possible process improvements."
      },
      {
        label: "What I learned",
        text: "This hands-on research strengthened my understanding of textile processing, fabric quality, and process optimization while developing my ability to identify production challenges, analyze root causes, and evaluate practical solutions."
      },
      {
        label: "Why it matters",
        text: "This experience enables me to approach merchandising beyond order follow-up—with a technical understanding of fabric quality risks, production challenges, and process-related issues. It strengthens my ability to communicate effectively with production and quality teams, support informed decision-making, and contribute to timely delivery while maintaining buyer quality requirements."
      }
    ]
  },

  interests: {
    kicker: "Beyond work",
    heading: "Personal Interests & Social Impact",
    text:
      "Beyond my professional pursuits, I enjoy reading, travelling, and contributing to education through voluntary teaching. At Bondi Pathshala, I tutored approximately 10,000 students through free online live classes and managed both online and offline learning sessions. These experiences strengthened my communication, leadership, and mentoring skills while reinforcing my belief in continuous learning and giving back to the community.",
    tiles: [
      { icon: "book", label: "Reading" },
      { icon: "compass", label: "Travelling" },
      { icon: "cap", label: "Voluntary teaching" }
    ],
    stat: { value: 10000, prefix: "~", label: "students tutored", note: "Free online live classes · Bondi Pathshala" }
  },

  growth: {
    kicker: "Professional Growth & Emerging Expertise",
    heading: "The Next Phase of Development",
    text:
      "Building on my factory-side merchandising experience while expanding my understanding of market trends, product strategy, responsible sourcing, and commercial decision-making across the apparel value chain.",
    items: [
      {
        title: "Trend & Market Analysis",
        text: "Exploring fashion trends, consumer preferences, and market dynamics to better understand their impact on product development, assortment planning, and merchandising decisions."
      },
      {
        title: "Sustainability & Responsible Sourcing",
        text: "Developing knowledge of sustainable materials, industry certifications, responsible sourcing, and ethical supply-chain practices to support evolving quality and compliance standards."
      },
      {
        title: "Digital Product Development",
        text: "Exploring digital product creation, material visualization, and product lifecycle management tools to improve development accuracy, collaboration, and efficiency."
      },
      {
        title: "Vendor Development",
        text: "Strengthening my understanding of supplier evaluation, manufacturing capabilities, capacity planning, cost competitiveness, and compliance from both factory and buyer perspectives."
      },
      {
        title: "Data & Commercial Reporting",
        text: "Advancing my analytical skills in AI, Excel and Power BI, focusing on costing analysis, critical-path monitoring, approval tracking, and data-driven merchandising decisions."
      }
    ]
  }
};
