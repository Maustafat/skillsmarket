window.__SKILLS_DATA = {
  "skills": [
    {
      "id": 1,
      "name": "PPTX Master",
      "slug": "pptx-master",
      "tagline": "Professional PowerPoint generation — from outline to polished deck",
      "description": "Transform any topic, dataset, or outline into a pixel-perfect .pptx presentation. Handles layouts, charts, speaker notes, and brand theme enforcement automatically.",
      "longDescription": "PPTX Master is the most complete PowerPoint skill available for Claude. Whether you're building an investor pitch, a board update, or a training deck, this skill returns a polished, presentation-ready .pptx file every time.\n\nThe skill uses python-pptx under the hood and includes intelligent layout selection that adapts to your content — it knows when to use a two-column layout vs. a full-bleed image, when bullet points serve better than a table, and how to space content for readability at 16:9.\n\n**What's included:**\n• Smart slide layout selection (12 layouts)\n• Automatic chart generation from data tables\n• Speaker notes generation from slide content\n• Brand theme enforcement via colour hex codes\n• Bulk deck creation from structured JSON\n• Master slide and template support\n• Image placeholder insertion\n\n**Typical use cases:** investor decks, quarterly reviews, training presentations, sales enablement, project kick-offs.",
      "price": 29,
      "category": "Documents",
      "rating": 4.9,
      "reviewCount": 312,
      "downloads": 2847,
      "badge": "Bestseller",
      "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
      "icon": "📊",
      "images": [
        "blue",
        "indigo",
        "purple"
      ],
      "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "author": "Anthropic Labs",
      "authorId": "anthropic",
      "authorAvatar": "🔬",
      "updated": "Jan 28, 2025",
      "version": "2.3.1",
      "tags": [
        "presentations",
        "office",
        "automation",
        "pptx"
      ],
      "files": [
        {
          "name": "SKILL.md",
          "size": "4.2 KB",
          "type": "skill.md"
        },
        {
          "name": "README.md",
          "size": "8.1 KB",
          "type": "readme"
        },
        {
          "name": "example_deck.pptx",
          "size": "1.2 MB",
          "type": "example"
        },
        {
          "name": "CHANGELOG.md",
          "size": "2.0 KB",
          "type": "changelog"
        }
      ],
      "schema": {
        "trigger": "Any request to create, generate, or make a presentation, deck, or PowerPoint file",
        "inputs": [
          "Topic or outline text",
          "Optional: JSON data for charts",
          "Optional: brand color hex codes",
          "Optional: template file path"
        ],
        "outputs": [
          ".pptx file with slides, speaker notes, and charts",
          "Summary of slides generated"
        ],
        "requirements": [
          "python-pptx installed",
          "Python 3.8+"
        ]
      },
      "skillMdPreview": "---\nname: pptx\ndescription: Use this skill whenever the user wants to create a PowerPoint...\n---\n\n# PPTX Master\n\nCreate professional presentations using python-pptx.\n\n## Quick Start\n```python\nfrom pptx import Presentation\n# ... see README for full usage\n```",
      "featured": true
    },
    {
      "id": 2,
      "name": "DOCX Architect",
      "slug": "docx-architect",
      "tagline": "Word documents with headers, tables, footnotes — perfectly structured",
      "description": "Generate fully formatted .docx files with multi-level headings, tables of contents, footnotes, tracked changes, and custom styles. Indistinguishable from human-crafted documents.",
      "longDescription": "DOCX Architect gives Claude the ability to produce professional Word documents that match the quality you'd expect from a seasoned technical writer.\n\nBuilt on python-docx, the skill understands document semantics — it doesn't just insert raw text, it applies proper heading hierarchies, generates an automatic table of contents, handles multi-column layouts, and supports reference lists and footnotes.\n\n**What's included:**\n• Multi-level heading hierarchy (H1–H4)\n• Automatic table of contents\n• Tables with formatting and merged cells\n• Footnotes and endnotes\n• Numbered and bulleted lists with sub-levels\n• Page headers and footers with page numbers\n• Custom paragraph and character styles\n• Image insertion with captions\n• Track changes simulation\n\n**Best for:** technical reports, legal documents, proposals, SOP manuals, research papers.",
      "price": 24,
      "category": "Documents",
      "rating": 4.8,
      "reviewCount": 198,
      "downloads": 1923,
      "badge": "Popular",
      "badgeColor": "bg-sky-50 text-sky-700 border-sky-200",
      "icon": "📝",
      "images": [
        "sky",
        "blue",
        "slate"
      ],
      "author": "Anthropic Labs",
      "authorId": "anthropic",
      "authorAvatar": "🔬",
      "updated": "Feb 3, 2025",
      "version": "1.8.0",
      "tags": [
        "word",
        "office",
        "reports",
        "docx"
      ],
      "files": [
        {
          "name": "SKILL.md",
          "size": "3.8 KB",
          "type": "skill.md"
        },
        {
          "name": "README.md",
          "size": "6.4 KB",
          "type": "readme"
        },
        {
          "name": "example_report.docx",
          "size": "840 KB",
          "type": "example"
        },
        {
          "name": "CHANGELOG.md",
          "size": "1.5 KB",
          "type": "changelog"
        }
      ],
      "schema": {
        "trigger": "Any request to create a Word document, report, letter, proposal, or .docx file",
        "inputs": [
          "Document content or outline",
          "Optional: styles/formatting preferences",
          "Optional: template file"
        ],
        "outputs": [
          ".docx file with full formatting",
          "Word count summary"
        ],
        "requirements": [
          "python-docx installed",
          "Python 3.7+"
        ]
      },
      "skillMdPreview": "---\nname: docx\ndescription: Use this skill whenever the user wants to create a Word doc...\n---\n\n# DOCX Architect\n\nCreate professional Word documents using python-docx."
    },
    {
      "id": 3,
      "name": "PDF Pro",
      "slug": "pdf-pro",
      "tagline": "Read, create, split, merge, OCR, and form-fill PDFs",
      "description": "The complete PDF toolkit. Create PDFs from scratch, extract text and tables, merge or split files, add watermarks, fill forms, and run OCR on scanned documents.",
      "longDescription": "PDF Pro is the only PDF skill you'll ever need. It wraps PyMuPDF and pypdf to give Claude full read/write control over PDF files.\n\nWhether you're extracting data from a scanned invoice, assembling a report from multiple sources, or adding a digital watermark to a document, PDF Pro handles it with a single instruction.\n\n**What's included:**\n• PDF creation from Markdown or HTML\n• Text and table extraction\n• Merge multiple PDFs\n• Split PDF into individual pages\n• Page rotation and reordering\n• Watermark and stamp addition\n• Form field detection and filling\n• OCR on scanned PDFs\n• Password protection and decryption\n\n**Best for:** document pipelines, report assembly, form automation, archive digitization.",
      "price": 34,
      "category": "Documents",
      "rating": 4.7,
      "reviewCount": 147,
      "downloads": 1456,
      "icon": "📄",
      "images": [
        "orange",
        "red",
        "amber"
      ],
      "author": "Anthropic Labs",
      "authorId": "anthropic",
      "authorAvatar": "🔬",
      "updated": "Dec 18, 2024",
      "version": "3.1.2",
      "tags": [
        "pdf",
        "forms",
        "extraction",
        "ocr"
      ],
      "files": [
        {
          "name": "SKILL.md",
          "size": "5.1 KB",
          "type": "skill.md"
        },
        {
          "name": "README.md",
          "size": "9.3 KB",
          "type": "readme"
        },
        {
          "name": "example_output.pdf",
          "size": "2.1 MB",
          "type": "example"
        },
        {
          "name": "CHANGELOG.md",
          "size": "3.2 KB",
          "type": "changelog"
        }
      ],
      "schema": {
        "trigger": "Any request involving a .pdf file — reading, creating, splitting, merging, watermarking, or form-filling",
        "inputs": [
          "PDF file path or content",
          "Operation type",
          "Optional: output preferences"
        ],
        "outputs": [
          "Processed PDF file",
          "Extracted text or data (if reading)"
        ],
        "requirements": [
          "PyMuPDF (fitz)",
          "pypdf",
          "Python 3.8+"
        ]
      },
      "skillMdPreview": "---\nname: pdf\ndescription: Use this skill whenever the user wants to do anything with PDF files...\n---\n\n# PDF Pro\n\nComplete PDF read/write toolkit using PyMuPDF and pypdf."
    },
    {
      "id": 4,
      "name": "XLSX Engine",
      "slug": "xlsx-engine",
      "tagline": "Build complex Excel workbooks with formulas, charts & pivot tables",
      "description": "Generate production-ready Excel files with formulas, pivot tables, conditional formatting, and charts. Handles messy CSV input and outputs clean multi-sheet workbooks.",
      "longDescription": "XLSX Engine turns Claude into a seasoned spreadsheet analyst. Feed it raw data in any format — CSV, JSON, plain text — and it returns a fully formatted Excel workbook ready for review.\n\nThe skill understands financial modelling conventions, applies conditional formatting intelligently, and generates charts that actually communicate the story in your data.\n\n**What's included:**\n• Multi-sheet workbook creation\n• Formula generation (VLOOKUP, INDEX/MATCH, SUMIFS, etc.)\n• Pivot table creation\n• Bar, line, pie, and scatter charts\n• Conditional formatting rules\n• Table and header formatting\n• Data validation dropdowns\n• Named ranges\n• CSV/JSON import and cleanup\n\n**Best for:** financial models, data analysis, dashboard creation, reporting automation.",
      "price": 27,
      "category": "Spreadsheets",
      "rating": 4.9,
      "reviewCount": 264,
      "downloads": 2102,
      "badge": "New",
      "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "icon": "📈",
      "images": [
        "emerald",
        "teal",
        "green"
      ],
      "author": "Anthropic Labs",
      "authorId": "anthropic",
      "authorAvatar": "🔬",
      "updated": "Feb 10, 2025",
      "version": "1.2.0",
      "tags": [
        "excel",
        "data",
        "analysis",
        "xlsx"
      ],
      "files": [
        {
          "name": "SKILL.md",
          "size": "4.6 KB",
          "type": "skill.md"
        },
        {
          "name": "README.md",
          "size": "7.8 KB",
          "type": "readme"
        },
        {
          "name": "example_model.xlsx",
          "size": "1.8 MB",
          "type": "example"
        },
        {
          "name": "CHANGELOG.md",
          "size": "1.1 KB",
          "type": "changelog"
        }
      ],
      "schema": {
        "trigger": "Any request to create a spreadsheet, Excel file, workbook, or process .xlsx/.csv data",
        "inputs": [
          "Raw data (CSV, JSON, or plain text)",
          "Optional: formatting preferences",
          "Optional: chart types requested"
        ],
        "outputs": [
          ".xlsx workbook with all requested sheets and charts"
        ],
        "requirements": [
          "openpyxl",
          "pandas (optional)",
          "Python 3.8+"
        ]
      },
      "skillMdPreview": "---\nname: xlsx\ndescription: Use this skill any time a spreadsheet file is the primary input or output...\n---\n\n# XLSX Engine\n\nCreate and edit Excel workbooks using openpyxl.",
      "featured": true
    },
    {
      "id": 5,
      "name": "Frontend Design",
      "slug": "frontend-design",
      "tagline": "Production-grade UIs with genuine aesthetic direction — zero AI slop",
      "description": "Generate distinctive web interfaces with bold typography, cohesive color systems, and real design thinking. React, HTML/CSS, Tailwind — all done with intentional creative choices.",
      "longDescription": "Frontend Design is the antidote to generic AI-generated UI. It pushes Claude to make bold, intentional aesthetic choices — picking unexpected font pairings, committing to a clear visual language, and executing it with precision.\n\nRather than defaulting to the same purple-gradient, rounded-corner, Inter-font output, this skill begins with a design brief: what is the emotional tone? Who is the user? What should they remember? The code that follows is an expression of those answers.\n\n**What's included:**\n• Design brief methodology (tone, audience, differentiation)\n• Typography pairing guide (display + body combinations)\n• CSS custom property systems for colour consistency\n• Animation and micro-interaction patterns\n• Responsive layout strategies (asymmetric, editorial, grid-breaking)\n• Accessibility checklist\n• React, HTML/CSS, and Tailwind output support\n• Dark and light theme generation\n\n**Best for:** landing pages, SaaS products, portfolios, marketing sites, internal tools.",
      "price": 39,
      "category": "Web Dev",
      "rating": 5,
      "reviewCount": 88,
      "downloads": 934,
      "badge": "Editor's Pick",
      "badgeColor": "bg-violet-50 text-violet-700 border-violet-200",
      "icon": "🎨",
      "images": [
        "violet",
        "purple",
        "fuchsia"
      ],
      "author": "Anthropic Labs",
      "authorId": "anthropic",
      "authorAvatar": "🔬",
      "updated": "Feb 14, 2025",
      "version": "1.5.0",
      "tags": [
        "ui",
        "design",
        "react",
        "tailwind",
        "css"
      ],
      "files": [
        {
          "name": "SKILL.md",
          "size": "3.2 KB",
          "type": "skill.md"
        },
        {
          "name": "README.md",
          "size": "5.6 KB",
          "type": "readme"
        },
        {
          "name": "CHANGELOG.md",
          "size": "0.9 KB",
          "type": "changelog"
        }
      ],
      "schema": {
        "trigger": "Any request to build, design, or create a web page, component, or UI",
        "inputs": [
          "Description of the interface needed",
          "Optional: brand guidelines",
          "Optional: framework preference"
        ],
        "outputs": [
          "Production-ready HTML/CSS/JS or React component",
          "Design rationale"
        ],
        "requirements": [
          "No special dependencies"
        ]
      },
      "skillMdPreview": "---\nname: frontend-design\ndescription: Create distinctive, production-grade frontend interfaces...\n---\n\n# Frontend Design\n\nGuides creation of memorable, distinctive web interfaces.",
      "featured": true
    },
    {
      "id": 6,
      "name": "Web Artifacts Builder",
      "slug": "web-artifacts-builder",
      "tagline": "Full React + shadcn/ui apps bundled into a single portable HTML file",
      "description": "Build elaborate multi-component React artifacts with full TypeScript, routing, state management, and 40+ shadcn/ui components — then bundle everything to a single self-contained HTML file.",
      "longDescription": "Web Artifacts Builder is the power-user skill for teams who need real applications inside Claude conversations.\n\nRather than one-off snippets, this skill scaffolds complete React projects with the full modern stack, develops them iteratively, and bundles them into a single portable HTML artifact using Parcel.\n\n**Stack:**\n• React 18 + TypeScript\n• Vite (development) + Parcel (bundling)\n• Tailwind CSS 3.4.1\n• shadcn/ui (40+ components pre-installed)\n• Radix UI primitives\n• Path aliases (@/) configured\n\n**What's included:**\n• init-artifact.sh: full project scaffolding in one command\n• bundle-artifact.sh: bundles to single self-contained HTML\n• All shadcn/ui components pre-installed\n• TypeScript path aliases configured\n• Node 18+ compatibility (auto-detects Vite version)\n\n**Best for:** dashboards, internal tools, demos, prototypes, Claude-powered apps.",
      "price": 49,
      "category": "Web Dev",
      "rating": 4.8,
      "reviewCount": 72,
      "downloads": 687,
      "badge": "Pro",
      "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
      "icon": "⚡",
      "images": [
        "indigo",
        "blue",
        "slate"
      ],
      "author": "Anthropic Labs",
      "authorId": "anthropic",
      "authorAvatar": "🔬",
      "updated": "Feb 17, 2025",
      "version": "2.0.0",
      "tags": [
        "react",
        "typescript",
        "artifacts",
        "shadcn",
        "vite"
      ],
      "files": [
        {
          "name": "SKILL.md",
          "size": "2.8 KB",
          "type": "skill.md"
        },
        {
          "name": "README.md",
          "size": "12.3 KB",
          "type": "readme"
        },
        {
          "name": "init-artifact.sh",
          "size": "6.4 KB",
          "type": "example"
        },
        {
          "name": "bundle-artifact.sh",
          "size": "3.1 KB",
          "type": "example"
        },
        {
          "name": "CHANGELOG.md",
          "size": "2.4 KB",
          "type": "changelog"
        }
      ],
      "schema": {
        "trigger": "Any request to build a complex multi-component artifact, app, or React project",
        "inputs": [
          "App description and requirements",
          "Optional: design preferences"
        ],
        "outputs": [
          "Self-contained bundle.html artifact",
          "Full React project source"
        ],
        "requirements": [
          "Node 18+",
          "npm or pnpm"
        ]
      },
      "skillMdPreview": "---\nname: web-artifacts-builder\ndescription: Suite of tools for creating elaborate, multi-component artifacts...\n---\n\n# Web Artifacts Builder\n\nBuild React apps and bundle them to single HTML files."
    },
    {
      "id": 7,
      "name": "Product Self-Knowledge",
      "slug": "product-self-knowledge",
      "tagline": "Verified, up-to-date Anthropic product facts — never stale answers",
      "description": "Ensures Claude always looks up current Anthropic product details before answering — API pricing, model strings, Claude Code docs, plan limits. Eliminates outdated training data mistakes.",
      "longDescription": "Claude's training data about its own products can lag months behind reality. This skill fixes that by prompting Claude to always verify product details against current documentation before answering.\n\nIt covers every Anthropic product surface: the API, Claude.ai plans, Claude Code, and model strings — with guidance on where to look and how to cite.\n\n**What's included:**\n• Claude API reference guide\n• Model family and string reference\n• Claude.ai plan comparison (Free, Pro, Team, Enterprise)\n• Claude Code installation and usage guide\n• Rate limits and pricing lookup guidance\n• When to search vs. answer from training data\n\n**Best for:** anyone building on Claude who wants accurate self-referential answers.",
      "price": 0,
      "category": "Utilities",
      "rating": 4.6,
      "reviewCount": 511,
      "downloads": 5200,
      "badge": "Free",
      "badgeColor": "bg-green-50 text-green-700 border-green-200",
      "icon": "🤖",
      "images": [
        "cyan",
        "sky",
        "blue"
      ],
      "author": "Anthropic Labs",
      "authorId": "anthropic",
      "authorAvatar": "🔬",
      "updated": "Feb 20, 2025",
      "version": "4.0.1",
      "tags": [
        "anthropic",
        "api",
        "reference",
        "utilities"
      ],
      "files": [
        {
          "name": "SKILL.md",
          "size": "6.2 KB",
          "type": "skill.md"
        },
        {
          "name": "README.md",
          "size": "4.1 KB",
          "type": "readme"
        },
        {
          "name": "CHANGELOG.md",
          "size": "1.8 KB",
          "type": "changelog"
        }
      ],
      "schema": {
        "trigger": "Any question about Anthropic products, models, pricing, or Claude capabilities",
        "inputs": [
          "User question about Anthropic products"
        ],
        "outputs": [
          "Accurate, sourced answer with docs links"
        ],
        "requirements": [
          "No special dependencies"
        ]
      },
      "skillMdPreview": "---\nname: product-self-knowledge\ndescription: Stop and consult this skill whenever your response would include specific facts...\n---\n\n# Product Self-Knowledge\n\nAlways verify Anthropic product details before answering."
    },
    {
      "id": 8,
      "name": "Skill Creator",
      "slug": "skill-creator",
      "tagline": "Create, test, benchmark, and optimize new SKILL.md files",
      "description": "The meta-skill for building Claude skills. Generates SKILL.md templates, sets up eval harnesses, benchmarks performance with variance analysis, and optimizes trigger descriptions.",
      "longDescription": "Skill Creator is the complete development toolkit for anyone who wants to build and ship their own Claude skills.\n\nIt covers the full lifecycle: from blank-page template generation, through testing and benchmarking, to optimizing the trigger description for maximum recall accuracy.\n\n**What's included:**\n• SKILL.md template generator with frontmatter\n• Eval harness setup (prompt batteries, expected outputs)\n• Performance benchmarking with run-to-run variance analysis\n• Trigger description optimisation (improves recall by 20–40%)\n• A/B testing framework for competing descriptions\n• Skill versioning and changelog conventions\n• Submission guide for SkillMarket\n\n**Best for:** power users, teams with custom workflows, anyone who wants to publish skills.",
      "price": 59,
      "category": "Utilities",
      "rating": 4.7,
      "reviewCount": 43,
      "downloads": 412,
      "badge": "Advanced",
      "badgeColor": "bg-rose-50 text-rose-700 border-rose-200",
      "icon": "🔧",
      "images": [
        "rose",
        "pink",
        "red"
      ],
      "author": "Anthropic Labs",
      "authorId": "anthropic",
      "authorAvatar": "🔬",
      "updated": "Jan 15, 2025",
      "version": "1.1.0",
      "tags": [
        "meta",
        "skills",
        "evals",
        "advanced",
        "testing"
      ],
      "files": [
        {
          "name": "SKILL.md",
          "size": "4.8 KB",
          "type": "skill.md"
        },
        {
          "name": "README.md",
          "size": "11.2 KB",
          "type": "readme"
        },
        {
          "name": "eval_harness.py",
          "size": "8.4 KB",
          "type": "example"
        },
        {
          "name": "benchmark_runner.sh",
          "size": "2.1 KB",
          "type": "example"
        },
        {
          "name": "CHANGELOG.md",
          "size": "1.6 KB",
          "type": "changelog"
        }
      ],
      "schema": {
        "trigger": "Any request to create a new skill, modify an existing skill, run skill evals, or benchmark skill performance",
        "inputs": [
          "Skill purpose/description",
          "Optional: existing skill to improve"
        ],
        "outputs": [
          "SKILL.md file",
          "Eval report",
          "Optimized trigger description"
        ],
        "requirements": [
          "Python 3.8+ (for eval harness)",
          "bash (for benchmark runner)"
        ]
      },
      "skillMdPreview": "---\nname: skill-creator\ndescription: Create new skills, modify existing skills, and measure skill performance...\n---\n\n# Skill Creator\n\nThe complete lifecycle toolkit for building Claude skills."
    }
  ],
  "reviews": [
    {
      "id": 1,
      "skillId": 1,
      "userId": "u1",
      "userName": "Marco T.",
      "userAvatar": "👨‍💼",
      "rating": 5,
      "title": "Best addition to my workflow",
      "body": "We use this for all our investor decks. The layout selection is genuinely smart — it picked a two-column format for our KPI slide without being told. Saves us 3–4 hours per deck.",
      "date": "Feb 12, 2025",
      "helpful": 28
    },
    {
      "id": 2,
      "skillId": 1,
      "userId": "u2",
      "userName": "Priya S.",
      "userAvatar": "👩‍💻",
      "rating": 5,
      "title": "Replaced our whole slide template library",
      "body": "I was skeptical at first but after 2 months and 15+ presentations, I can confirm it consistently produces better-structured slides than our designers do manually. The speaker notes feature is underrated.",
      "date": "Jan 30, 2025",
      "helpful": 19
    },
    {
      "id": 3,
      "skillId": 1,
      "userId": "u3",
      "userName": "Alex K.",
      "userAvatar": "🧑‍🔬",
      "rating": 4,
      "title": "Great but has a learning curve",
      "body": "Took me about a week to understand how to pass brand colors correctly. After that, it has been flawless. Would be 5 stars with better error messages when the format is wrong.",
      "date": "Jan 15, 2025",
      "helpful": 11
    },
    {
      "id": 4,
      "skillId": 1,
      "userId": "u4",
      "userName": "Sofia R.",
      "userAvatar": "👩‍🎨",
      "rating": 5,
      "title": "Indistinguishable from handmade",
      "body": "Showed it to a design friend who does decks professionally. She could not tell it was AI-generated. That is the bar, and PPTX Master clears it.",
      "date": "Dec 28, 2024",
      "helpful": 34
    },
    {
      "id": 5,
      "skillId": 4,
      "userId": "u5",
      "userName": "Tom H.",
      "userAvatar": "📊",
      "rating": 5,
      "title": "Handles messy data beautifully",
      "body": "Fed it a half-broken CSV exported from Salesforce. It cleaned it up, created 4 sheets with appropriate charts, and added a summary dashboard. Genuinely impressive.",
      "date": "Feb 9, 2025",
      "helpful": 22
    },
    {
      "id": 6,
      "skillId": 4,
      "userId": "u6",
      "userName": "Yuki M.",
      "userAvatar": "🧑‍💼",
      "rating": 5,
      "title": "The pivot table feature is magic",
      "body": "I used to spend an hour on pivot tables. Now I describe what I want and XLSX Engine does it. 10/10.",
      "date": "Feb 3, 2025",
      "helpful": 15
    },
    {
      "id": 7,
      "skillId": 5,
      "userId": "u7",
      "userName": "Daniel L.",
      "userAvatar": "🎨",
      "rating": 5,
      "title": "Finally — AI UI that does not look like AI UI",
      "body": "Every other tool gives me the same purple-rounded-corners aesthetic. Frontend Design actually made a choice and committed to it. My last output used a brutalist editorial style that got compliments from our design team.",
      "date": "Feb 16, 2025",
      "helpful": 41
    },
    {
      "id": 8,
      "skillId": 5,
      "userId": "u8",
      "userName": "Mia C.",
      "userAvatar": "💻",
      "rating": 5,
      "title": "5 stars — changed how I prototype",
      "body": "I can now go from brief to working clickable prototype in 20 minutes. The typography pairing guidance alone is worth the price.",
      "date": "Feb 8, 2025",
      "helpful": 18
    },
    {
      "id": 9,
      "skillId": 7,
      "userId": "u9",
      "userName": "Ravi P.",
      "userAvatar": "🤖",
      "rating": 4,
      "title": "Solved my biggest Claude frustration",
      "body": "Claude kept giving wrong API pricing. This skill fixed it immediately. Would give 5 stars but it sometimes over-triggers on tangential questions.",
      "date": "Feb 20, 2025",
      "helpful": 9
    },
    {
      "id": 10,
      "skillId": 2,
      "userId": "u10",
      "userName": "Lena B.",
      "userAvatar": "📝",
      "rating": 5,
      "title": "Our legal team loves it",
      "body": "We use DOCX Architect for contract first-drafts and SOPs. The footnote and heading hierarchy support is exactly what our lawyers needed. Clean output every time.",
      "date": "Feb 5, 2025",
      "helpful": 27
    }
  ],
  "users": [
    {
      "id": "anthropic",
      "name": "Anthropic Labs",
      "email": "skills@anthropic.com",
      "avatar": "🔬",
      "bio": "Official skill packages from the team that built Claude. Battle-tested in production environments.",
      "website": "https://anthropic.com",
      "joinDate": "Jun 2024",
      "totalSales": 11570,
      "totalEarnings": 289250,
      "paymentMethod": "bank",
      "bankName": "Bank of America",
      "bankIban": "US29 NWBK 6016 1331 9268 19",
      "bankSwift": "BOFAUS3N",
      "listings": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ]
    },
    {
      "id": "janedev",
      "name": "Jane Dev",
      "email": "jane@janedev.io",
      "avatar": "👩‍💻",
      "bio": "Indie AI developer building practical Claude tooling. Loves clean abstractions and well-documented skills.",
      "website": "https://janedev.io",
      "joinDate": "Sep 2024",
      "totalSales": 342,
      "totalEarnings": 8892,
      "paymentMethod": "paypal",
      "paypalEmail": "jane@janedev.io",
      "listings": []
    }
  ],
  "currentUser": null,
  "cart": [],
  "purchases": [],
  "view": {
    "page": "marketplace"
  }
};
