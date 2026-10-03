import { DocSection } from './documentationData';

export const SPRINT_10_SECTIONS: DocSection[] = [
  {
    id: "prerequisites",
    number: 1,
    title: "1. Development Prerequisites",
    shortDesc: "Standardized developer workstation specifications, Node.js, Shopify CLI, Git, VS Code extensions, and OS configuration.",
    content: `NOVA COMMERCE FRAMEWORK (NCF) – SPRINT 1.0 DEVELOPMENT PREREQUISITES
===================================================================

To ensure 100% build consistency across senior theme engineering teams, all developer workstations must comply strictly with the following toolchain baseline before executing Shopify CLI commands or checking out NCF repositories.

1. WORKSTATION HARDWARE & OPERATING SYSTEM
• Recommended OS: macOS Sonoma 14.x+ or Linux (Ubuntu 22.04 LTS / Debian 12).
• Windows Workstations: MUST utilize Windows Subsystem for Linux 2 (WSL2) with Ubuntu 22.04. Developing natively on Windows PowerShell/CMD is strictly unsupported due to path delimiter inconsistencies and Ruby gem native C-binding compilation issues during Theme Check execution.
• Memory & CPU: Minimum 16GB RAM; Apple Silicon (M1/M2/M3/M4) or Intel Core i7/i9 equivalent.

2. RUNTIME ENVIRONMENT & CLI TOOLING
• Node.js Version: Node.js v20.x LTS (Hydrogen or Iron release). Active LTS required for long-term security patches.
  - Verification Command: node -v (Output must be >= v20.10.0)
  - Version Management: Engineers MUST use nvm (Node Version Manager) or fnm with a repository-level .nvmrc file.
• Package Manager: npm v10.x+ (bundled with Node v20). Yarn/pnpm are disallowed for theme root commands to maintain lockfile determinism.
• Shopify CLI Version: Shopify CLI v3.60.0 or higher.
  - Installation Command: npm install -g @shopify/cli @shopify/theme
  - Verification Command: shopify version (Output must confirm v3.x runtime)
  - Update Policy: Global CLI must be audited bi-weekly via shopify upgrade.
• Git Version: Git v2.42.0+ required for modern sparse-checkout and commit signing.
  - Verification Command: git --version
  - Signing Policy: All commits MUST be signed with GPG or SSH keys verified on GitHub.

3. INTEGRATED DEVELOPMENT ENVIRONMENT (VS CODE EXTENSIONS)
All engineers must use Visual Studio Code with the official NCF extension pack (.vscode/extensions.json):
• Shopify Liquid (shopify.shopify-liquid): Provides Liquid syntax highlighting, autocompletion for Shopify objects, filters, and tags.
• Theme Check (shopify.theme-check-vscode): Real-time Liquid and theme architecture linting powered by the Theme Check Language Server.
• Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss): Autocompletion and visual preview for CSS custom properties and token utilities.
• Prettier - Code formatter (esbenp.prettier-prettier): Enforces consistent formatting across JSON schema, Markdown, and YAML files.
• ESLint (dbaeumer.vscode-eslint): Lints JavaScript assets and Web Component files.
• GitLens (eamodio.gitlens): Inline blame and commit history for architectural audit trails.

4. AUTOMATED ENVIRONMENT VALIDATION SCRIPT
Before submitting pull requests, developers can execute the repository validation script to verify toolchain alignment:
  $ ./scripts/check-prerequisites.sh
This script verifies Node, CLI, Git, and Theme Check binaries, failing early if versions deviate from this specification.`,
    analysis: {
      whatItIs: "The mandatory software runtime, CLI tools, and editor configuration baseline for developing NCF themes.",
      whyShopifyRecommendsIt: "Shopify CLI v3 requires Node 20 LTS and modern Git protocols to reliably authenticate, preview local themes, and upload assets without stream timeouts.",
      howNcfShouldImplementIt: "Enforce a .nvmrc file set to 20.11.0, maintain a workspace .vscode/extensions.json file, and provide a prerequisite check script.",
      commonMistakes: "Running Shopify CLI natively on Windows CMD without WSL2, or using Node 18/22 edge releases that introduce CLI streaming regressions.",
      bestPractices: "Lock Node versions via .nvmrc and run 'shopify version' prior to commencing local theme development sessions.",
      futureConsiderations: "Transition to automated dev containers (.devcontainer/devcontainer.json) for 1-click cloud workstation provisioning."
    }
  },
  {
    id: "dev-store",
    number: 2,
    title: "2. Development Store Configuration",
    shortDesc: "Creation, configuration, permissions, seed data, and operational best practices for NCF test environments.",
    content: `DEVELOPMENT STORE SPECIFICATION & PROVISIONING PROTOCOL
=====================================================

1. STORE CREATION & ARCHITECTURE
• Dev Store Type: Provisioned via Shopify Partner Dashboard as an "Online Store 2.0 Development Store" with Developer Preview toggled OFF unless testing unreleased liquid features.
• Store Naming Convention: ncf-dev-[engineer-initials].myshopify.com (e.g., ncf-dev-jdoe.myshopify.com).
• Shared Sandbox Store: ncf-electronics-sandbox.myshopify.com (Primary integration store for Sprint demo reviews).

2. STORE CONFIGURATION & SETTINGS
• Store Password Protection: MUST remain enabled at all times (Online Store -> Preferences -> Password Protection). Never disable storefront password on development or sandbox environments.
• Currency & Locales:
  - Primary Currency: USD ($).
  - Multi-Currency Enabled: EUR (€), GBP (£), CAD ($), JPY (¥) enabled via Shopify Payments test mode.
  - Primary Language: English (en). Secondary test language: French (fr) or German (de) to validate i18n Liquid filters.
• Test Data Seeding:
  - Engineers MUST import the official Shopify Electronics Sample Data Set (50+ items across multi-level collections with variants, metafields, and media).
  - Seed items MUST include complex variant matrices (Color x Storage x Plug Type), variant images, unit pricing, compare-at pricing, and digital downloads.
  - Custom Metafields: Seed Metafields for Product Specifications (Vendor SKU, Warranty, Power Output, Dimensions, PDF Manuals).

3. ACCESS PERMISSIONS & COLLABORATION
• Collaborator Accounts: All engineers access merchant client stores exclusively via Collaborator Requests with limited theme/settings permissions.
• Dev Store Permissions: Full Admin access granted only to Staff Engineers. Team members receive:
  - Themes (Full)
  - Products & Collections (Read/Write)
  - Store Settings & Metafields (Read)
  - Apps (Read Only)

4. OPERATIONAL SAFETY & BEST PRACTICES
• STRICT RULE: Never connect Shopify CLI ('shopify theme dev' or 'shopify theme push') directly to a live, production merchant store.
• Always verify the connected store URL using 'shopify theme info' prior to running any push or delete commands.
• Use separate development theme slots ('[Dev] NCF - John Doe') rather than overwriting Published or Main themes on sandbox stores.`,
    analysis: {
      whatItIs: "The operational specification for creating, configuring, and populating Shopify development stores for NCF testing.",
      whyShopifyRecommendsIt: "Development stores allow unlimited test transactions, full Online Store 2.0 theme preview capabilities, and zero risk to live commercial traffic.",
      howNcfShouldImplementIt: "Maintain a dedicated sandbox store seeded with rich electronics catalog data, variant matrices, and custom specs metafields.",
      commonMistakes: "Testing themes on empty stores without variant metafields, or running 'shopify theme push' against a live merchant store.",
      bestPractices: "Enable test payment gateways (Bogus Gateway), seed multi-currency data, and enforce password protection on all dev environments.",
      futureConsiderations: "Automated test data seeding via Shopify Admin GraphQL API scripts during CI/CD store initialization."
    }
  },
  {
    id: "github-strategy",
    number: 3,
    title: "3. GitHub & Version Control Strategy",
    shortDesc: "Repository architecture, branching model, conventional commit standards, PR review workflows, and release tagging.",
    content: `GITHUB & VERSION CONTROL SPECIFICATION
=====================================

1. REPOSITORY STRUCTURE & ACCESS CONTROL
• Repository Name: nova-commerce-framework (Hosted under GitHub Enterprise organization).
• Visibility: Private repository with strictly enforced Team permissions and Branch Protection Rules.
• Default Branch: main (Production-ready, passes 100% Theme Check & Lighthouse audits).

2. BRANCHING STRATEGY (NCF GIT-FLOW)
• main: Ground truth branch. Contains released, production-ready code. Direct commits are strictly blocked.
• release/vX.Y.Z: Candidate release branch used for final QA, staging deployment, and visual regression testing.
• feature/sprint-X.Y-[feature-name]: Active development branches cut from main (e.g., feature/sprint-1.1-theme-shell).
• hotfix/vX.Y.Z-[issue-description]: Critical bugfix branches cut directly from main or active release tags.

3. COMMIT NAMING CONVENTIONS (CONVENTIONAL COMMITS v1.0.0)
All commits must follow the imperative, typed format:
  <type>(<scope>): <short summary in present tense>

  [Optional body explaining context and architectural motivation]

Allowed Types:
• feat: A new theme specification, setting schema, section, snippet, or Web Component.
• fix: Bugfix or correction to Liquid logic, CSS token, or JavaScript behavior.
• docs: Updates to NCF specifications, README, ADRs, or inline comments.
• style: Formatting, indentation, or whitespace changes with no logic impact.
• refactor: Code restructuring that improves maintainability without altering functionality.
• perf: Performance optimization reducing LCP, CLS, or asset size.
• test: Addition or update to Theme Check rulesets or automated integration tests.
• chore: Updates to build scripts, .gitignore, CI workflows, or CLI configurations.

Examples:
  feat(config): add color palette and typography tokens to settings_schema.json
  fix(liquid): resolve missing fallback in i18n product badge snippet
  docs(adr): record decision to adopt native custom elements over alpine.js

4. PULL REQUEST (PR) WORKFLOW & CODE REVIEWS
• PR Template (.github/PULL_REQUEST_TEMPLATE.md): Mandatory checklist covering Theme Check verification, accessibility checks, and performance impact.
• Review Requirements: Minimum of TWO (2) approved peer reviews from Senior Staff Engineers before merge eligibility.
• Automated Status Checks (CI Pipeline):
  - GitHub Action: shopify/theme-check-action must return 0 errors and 0 warnings.
  - Prettier & ESLint check must pass.
  - PR title must conform to Conventional Commits format.
• Merge Strategy: "Squash and Merge" enabled exclusively to maintain a clean linear commit history on main.

5. RELEASE TAGGING & SEMANTIC VERSIONING (SemVer 2.0.0)
• Format: vMAJOR.MINOR.PATCH (e.g., v1.0.0, v1.1.0).
  - MAJOR: Breaking architecture overhaul or major theme refactor.
  - MINOR: New sections, snippets, theme settings, or feature extensions.
  - PATCH: Backward-compatible bugfixes or Liquid performance tweaks.
• Every release tag MUST be accompanied by a GitHub Release entry with changelog notes and attached theme package zip (.zip).`,
    analysis: {
      whatItIs: "The formal git workflow, repository branch hierarchy, commit conventions, PR policy, and versioning standard for NCF.",
      whyShopifyRecommendsIt: "Structured Git workflows prevent code conflicts, maintain audit trails for Shopify Theme Store submissions, and enforce automated quality gates.",
      howNcfShouldImplementIt: "Enforce Conventional Commits via commitlint, require 2 reviewer approvals on PRs, and block unverified merges on 'main'.",
      commonMistakes: "Committing directly to main, writing vague commit messages like 'fixed stuff', or merging PRs without running Theme Check.",
      bestPractices: "Use short-lived feature branches, squash PR commits on merge, and auto-generate release release notes from conventional commit logs.",
      futureConsiderations: "Automated GitHub Actions to upload tagged releases directly to Shopify partner theme libraries."
    }
  },
  {
    id: "cli-workflow",
    number: 4,
    title: "4. Shopify CLI Workflow & Commands",
    shortDesc: "In-depth breakdown of official Shopify CLI v3 commands, flags, local dev server execution, and synchronization workflows.",
    content: `SHOPIFY CLI V3 WORKFLOW & COMMAND REFERENCE
==========================================

Shopify CLI v3 is the primary tool for developing, previewing, testing, and packaging NCF themes. The following commands constitute the standard operational lifecycle for NCF developers.

1. shopify auth (Authentication & Partner Linking)
• Purpose: Authenticates the local workstation with Shopify Partners or a specific store organization.
• Usage:
  $ shopify auth logout (Clears cached session tokens)
  $ shopify theme dev --store=ncf-dev-sandbox.myshopify.com (Triggers web OAuth flow automatically)
• Key Behavior: CLI v3 handles token refreshes automatically in the background.

2. shopify theme dev (Local Development Server & Live Preview)
• Purpose: Boots a local development server, streams files to a temporary development theme on the target store, and enables real-time hot reloading.
• Usage:
  $ shopify theme dev --store=ncf-dev-sandbox.myshopify.com --theme-editor-sync
• Key Flags & Options:
  --store, -s: Specifies the target myshopify.com store URL.
  --theme-editor-sync, -e: Automatically syncs changes made in the Shopify Theme Editor back to local source files.
  --port, -p: Customizes local port (default: 9292).
  --live-reload: Controls live reload mode (off, hot-reload, full-page). Default is hot-reload.
  --path: Specifies theme root path if executing from outside root.
• Technical Execution Flow:
  1. CLI connects to store via Admin API.
  2. Creates a hidden Development Theme slot tied to the developer's account.
  3. Uploads local theme files in memory.
  4. Outputs local preview URL (http://127.0.0.1:9292), remote preview URL, and Theme Editor direct link.
  5. Monitors local filesystem changes and hot-swaps assets within ~300ms.

3. shopify theme pull (Download Store Theme Code)
• Purpose: Pulls theme code or merchant settings from a remote store theme down to the local repository.
• Usage:
  $ shopify theme pull --store=ncf-dev-sandbox.myshopify.com --theme=134598201290
• Options:
  --live, -l: Pulls from the published live store theme.
  --theme, -t: Specifies theme ID or exact name.
  --only, -o: Pulls specific files (e.g., -o config/settings_data.json to grab Theme Editor settings).
  --ignore, -i: Skips specific files during pull.
• Safety Rule: Always commit local changes before running 'theme pull' to prevent local workspace overwrites.

4. shopify theme push (Upload Theme to Store)
• Purpose: Uploads local theme code to a specified theme slot (Unpublished or Development) on the store.
• Usage:
  $ shopify theme push --store=ncf-dev-sandbox.myshopify.com --unpublished --json
• Options:
  --unpublished, -u: Creates a new unpublished theme slot (Ideal for staging/QA previews).
  --theme, -t: Targets a specific existing theme ID.
  --publish: Publishes the uploaded theme directly to live store (STRICTLY RESTRICTED TO CI/CD PIPELINE).
  --nodelete: Prevents deletion of remote files missing in local repository.

5. shopify theme package (Build Distribution Zip)
• Purpose: Compiles local theme files into a clean, compliant zip archive ready for Shopify Theme Store submission or merchant distribution.
• Usage:
  $ shopify theme package --path=.
• Output: Creates a zip file (e.g., nova-commerce-framework-1.0.0.zip) stripped of .git, node_modules, and ignored development files.

6. shopify theme check (Theme Linting)
• Purpose: Runs static code analysis across Liquid, JSON, and theme assets to detect syntax errors, performance bottlenecks, and Theme Store violations.
• Usage:
  $ shopify theme check --config .theme-check.yml
• Options:
  --auto-correct, -a: Automatically fixes fixable syntax and formatting violations.
  --category: Filters checks by category (performance, liquid, accessibility).

7. shopify theme info (Environment & Theme Diagnostics)
• Purpose: Displays active store connection, authenticated account, theme environment variables, and CLI diagnostic status.
• Usage:
  $ shopify theme info

8. shopify theme serve (LEGACY COMMAND COMPARISON)
• Historical Context: 'shopify theme serve' was the core development command in Shopify CLI v2.
• Current v3 Status: DEPRECATED in CLI v3. Replaced entirely by 'shopify theme dev'. Developers upgrading from CLI v2 must replace all internal scripts referencing 'serve' with 'dev'.`,
    analysis: {
      whatItIs: "The complete operational reference manual for executing Shopify CLI v3 commands within the NCF development workflow.",
      whyShopifyRecommendsIt: "Shopify CLI v3 provides atomic development themes, secure OAuth authentication, and real-time Theme Editor bi-directional syncing.",
      howNcfShouldImplementIt: "Add standardized npm scripts in package.json (e.g., 'npm run dev', 'npm run lint', 'npm run package') wrapping CLI v3 commands.",
      commonMistakes: "Using deprecated CLI v2 commands ('theme serve'), forgetting the '--theme-editor-sync' flag, or pushing code without running 'theme check'.",
      bestPractices: "Use 'shopify theme dev' with dedicated store flags and run 'shopify theme pull -o config/settings_data.json' after configuring settings in UI.",
      futureConsiderations: "Automating theme pushing to staging stores via GitHub Actions using 'shopify theme push --unpublished'."
    }
  },
  {
    id: "theme-check",
    number: 5,
    title: "5. Theme Check Linting & CI Integration",
    shortDesc: "Theme Check installation, configuration file (.theme-check.yml), rule severity customization, and GitHub Actions CI workflow.",
    content: `THEME CHECK SPECIFICATION & CI INTEGRATION
========================================

Theme Check is Shopify's official static analysis tool for Liquid code and theme architecture. It detects performance flaws, security vulnerabilities, accessibility defects, and Theme Store compliance violations before code enters production.

1. INSTALLATION & RUNTIME
• Bundled Runtime: Theme Check is bundled automatically inside Shopify CLI v3 ('shopify theme check').
• Standalone Binary: Can be installed via Homebrew or Ruby Gem for standalone editor language servers:
  $ brew tap shopify/shopify
  $ brew install theme-check

2. NCF CONFIGURATION FILE (.theme-check.yml)
NCF maintains a strict root-level .theme-check.yml configuration file. All rules are set to 'error' or 'suggestion' with zero tolerance for syntax or performance flaws:

# .theme-check.yml - Nova Commerce Framework Configuration
extends: theme-check:recommended

# Performance Rules (STRICT ERROR)
AssetPreload:
  enabled: true
  severity: error
ParserBlockingScript:
  enabled: true
  severity: error
UnusedAssign:
  enabled: true
  severity: suggestion
ImgWidthAndHeight:
  enabled: true
  severity: error
LazyLoading:
  enabled: true
  severity: error

# Liquid Code Hygiene (STRICT ERROR)
IncludeTag:
  enabled: true
  severity: error # STRICT BAN: Use 'render' tag exclusively
UndefinedObject:
  enabled: true
  severity: error
LiquidHTMLSyntaxError:
  enabled: true
  severity: error
ValidJSON:
  enabled: true
  severity: error

# Accessibility Rules (STRICT ERROR)
AssetUrlFilters:
  enabled: true
  severity: error
FormErrorCode:
  enabled: true
  severity: error
ImageFilter:
  enabled: true
  severity: error

# Excluded Paths
exclude:
  - 'node_modules/**'
  - '.git/**'
  - 'dist/**'

3. RECOMMENDED RULESETS & SEVERITY MAP
• IncludeTag (Error): Strictly bans legacy {% include 'snippet' %} tags. Forces mandatory {% render 'snippet' %} tag usage for isolated scope.
• ParserBlockingScript (Error): Bans external scripts without 'defer' or 'async' attributes in <head>.
• LazyLoading (Error): Ensures below-the-fold images use loading="lazy" while hero LCP images use loading="eager" and fetchpriority="high".
• ImgWidthAndHeight (Error): Requires explicit width and height attributes or aspect-ratio CSS on all <img> tags to guarantee zero Cumulative Layout Shift (CLS).

4. GITHUB ACTIONS CI/CD INTEGRATION
NCF automates Theme Check on every pull request and push to main via .github/workflows/theme-check.yml:

name: Theme Check Quality Gate
on:
  push:
    branches: [ main, release/* ]
  pull_request:
    branches: [ main ]

jobs:
  theme-check:
    name: Run Shopify Theme Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'

      - name: Run Theme Check
        uses: shopify/theme-check-action@v1
        with:
          option: '--config .theme-check.yml'
        env:
          GITHUB_TOKEN: ` + "${{ secrets.GITHUB_TOKEN }}",
    analysis: {
      whatItIs: "The static code analysis specification enforcing Liquid syntax correctness, security, performance, and WCAG accessibility standards.",
      whyShopifyRecommendsIt: "Theme Check is mandatory for Shopify Theme Store approval and catches LCP/CLS regressions early during developer commit cycles.",
      howNcfShouldImplementIt: "Commit a strict .theme-check.yml file, integrate VS Code extension for live inline warnings, and block PR merges on check failures.",
      commonMistakes: "Disabling rules instead of fixing code errors, or using legacy {% include %} tags which bypass scope isolation.",
      bestPractices: "Run 'shopify theme check --auto-correct' to fix formatting issues and enforce zero-warning policy on pull requests.",
      futureConsiderations: "Custom Ruby/JS Theme Check extensions to validate custom NCF design token naming conventions."
    }
  },
  {
    id: "dawn-reference",
    number: 6,
    title: "6. Dawn Theme Breakdown & Migration Strategy",
    shortDesc: "Evaluation of Shopify Dawn reference architecture, unchanged baseline components, replacement roadmap, and migration protocol.",
    content: `DAWN REFERENCE THEME ANALYSIS & NCF MIGRATION STRATEGY
=========================================================

Shopify's Dawn theme is the official Online Store 2.0 reference architecture. NCF uses Dawn v15.x as an initial architectural baseline, studying its core strengths while systematically upgrading its components to deliver a commercial-grade, high-performance Electronics Framework.

1. WHY DAWN IS THE OFFICIAL REFERENCE
• Pure OS 2.0 Standard: Demonstrates canonical Liquid JSON template structures, section groups, and Theme Editor schema patterns.
• Zero Monolithic Dependencies: Uses native Web Components (Vanilla Custom Elements) instead of heavy JS frameworks.
• High Baseline Performance: Minimal initial JS payload (< 30KB gzipped) and clean HTML tree structure.
• Theme Store Benchmark: Serves as the official baseline for all Shopify Theme Store review guidelines.

2. PARTS TO REMAIN UNCHANGED INITIALLY (SPRINT 1.0 - 1.2 BASELINE)
During early environment setup and core shell definition, NCF preserves Dawn's structural foundation:
• Canonical Directory Blueprint: Preservation of /sections, /snippets, /assets, /config, /layout, /locales, and /templates.
• Base Settings Schema Schema Types: Standard color, typography, range, select, and image_picker schema input types.
• Locales Structural Baseline: Hierarchy of en.default.json translation key structures.
• Shopify System Scripts: Essential checkout and payment button integration tags in theme.liquid.

3. PARTS NCF WILL EVENTUALLY REPLACE (NCF COMMERCIAL UPGRADES)
Dawn was built as a minimalist general starter theme. NCF replaces key subsystems with high-performance, commercial electronics features:

Subsystem               | Dawn Baseline Implementation          | NCF Commercial Upgrade Strategy
------------------------|---------------------------------------|---------------------------------------------------------
Design Tokens           | Hardcoded liquid CSS variables in head| CSS Custom Property Token Engine with dark mode support
Cart Drawer             | Standard slide-out cart               | Fast Ajax Cart Drawer with cross-sells & free shipping bar
Product Specs           | Collapsible row text blocks           | Structured Technical Specifications Grid with Metafields
Predictive Search       | Basic list dropdown                   | Multi-column Predictive Search with recent searches & SKU
Navigation              | Simple CSS dropdown menu              | Commercial Mega Menu with promotional banners & badges
Filter Engine           | Basic Facets forms                    | Instant Ajax Faceted Filtering with URL param persistence

4. NCF STEP-BY-STEP MIGRATION STRATEGY
• Step 1 (Sprint 1.0): Audit Dawn v15 source code and establish clean workspace repository stripped of non-essential assets.
• Step 2 (Sprint 1.1 - 1.2): Replace Dawn's inline CSS variables with NCF CSS Custom Property Design Token System.
• Step 3 (Sprint 1.3): Replace Dawn's custom element scripts with NCF Modular Web Component class architecture.
• Step 4 (Sprint 1.4+): Implement commercial header, mega menu, interactive cart drawer, and electronics product sections.`,
    analysis: {
      whatItIs: "The formal evaluation of Shopify's Dawn reference theme and the step-by-step roadmap for upgrading it into NCF.",
      whyShopifyRecommendsIt: "Dawn provides the most reliable baseline for Online Store 2.0 standards, ensuring compatibility with future Shopify platform updates.",
      howNcfShouldImplementIt: "Maintain Dawn's folder structure and Web Component design philosophy while refactoring styling into NCF's Design Token System.",
      commonMistakes: "Forking Dawn blindly without removing bloat, or replacing native custom elements with heavy external JS frameworks.",
      bestPractices: "Isolate structural upgrades into distinct sprints and benchmark performance against stock Dawn on every iteration.",
      futureConsiderations: "Upgrading NCF baseline whenever Shopify releases major structural updates to the Dawn reference architecture."
    }
  },
  {
    id: "folder-review",
    number: 7,
    title: "7. Canonical Folder Review & Extension Plan",
    shortDesc: "In-depth review of Shopify OS 2.0 folder hierarchy, strict directory rules, prohibited operations, and NCF folder extensions.",
    content: `SHOPIFY CANONICAL FOLDER REVIEW & DIRECTORY EXTENSION PLAN
==========================================================

Shopify imposes a strict folder structure for Online Store 2.0 themes. Theme servers and the Theme Editor expect specific files in exact directories. Deviating from this hierarchy violates Theme Store guidelines and breaks theme deployment.

1. CANONICAL SHOPIFY THEME DIRECTORIES

Directory  | Allowed Contents                                      | Strict Operational Rules & Restrictions
-----------|-------------------------------------------------------|----------------------------------------------------------------------
/assets    | CSS (.css), JS (.js), SVG (.svg), Fonts (.woff2), Imgs | DO NOT create subdirectories inside /assets! Shopify flat-packs assets.
/config    | settings_schema.json, settings_data.json             | MUST NOT contain custom liquid files or code. Only valid JSON files.
/layout    | theme.liquid, password.liquid, checkout.liquid (Plus) | Keep lightweight. Houses global HTML shell, head tags, and section groups.
/locales   | en.default.json, fr.json, es.json, etc.               | All user-facing strings MUST use locale key references.
/sections  | *.liquid sections with {% schema %} blocks           | Primary merchant customizable drag-and-drop components.
/snippets  | Reusable *.liquid atomic elements                     | Must NOT contain {% schema %} blocks. Rendered via {% render %}.
/templates | *.json page templates, /templates/customers/*.json    | Use JSON templates for OS 2.0. Avoid legacy *.liquid page templates.

2. STRICT RULES & WHAT NOT TO CHANGE
• NO SUBDIRECTORIES IN /assets: Shopify's theme server flattens all files inside /assets. Creating subfolders like /assets/css/ or /assets/js/ will cause 44-File Not Found errors in Liquid asset_url filters.
• NO REWRITING UNRELATED FILES: Never delete or move standard layout files like theme.liquid or settings_schema.json.
• NO LEGACY TEMPLATES: Do not convert JSON page templates (index.json, product.json) back into legacy .liquid templates.

3. FUTURE NCF EXTENSIONS & NAMING CONVENTIONS
To maintain ultra-clean file organization without violating Shopify's directory structure, NCF enforces strict prefix naming conventions:

Asset & File Type       | NCF Prefix Standard                   | Example File Path
------------------------|---------------------------------------|-------------------------------------------
Design System Tokens    | tokens-[subsystem].css                | /assets/tokens-color.css
Web Component Script    | component-[name].js                   | /assets/component-cart-drawer.js
Section Files           | section-[feature].liquid              | /sections/section-hero-banner.liquid
Snippet Components      | snippet-[name].liquid or [name].liquid| /snippets/product-card.liquid
Section Group Layouts   | [group]-group.json                    | /sections/header-group.json`,
    analysis: {
      whatItIs: "The official architectural guide to Shopify OS 2.0 folder structures, directory constraints, and NCF file naming conventions.",
      whyShopifyRecommendsIt: "Shopify's theme execution engine relies on exact folder conventions to serve assets efficiently and render Theme Editor section schemas.",
      howNcfShouldImplementIt: "Flat-pack all CSS and JS files in /assets using descriptive prefixes ('component-*.js', 'tokens-*.css') and enforce JSON templates.",
      commonMistakes: "Creating nested subdirectories inside /assets (e.g. /assets/js/main.js), or putting {% schema %} blocks inside /snippets.",
      bestPractices: "Prefix all Web Components with 'component-' and ensure every section file has a matching schema definition.",
      futureConsiderations: "Automated linter scripts to enforce NCF file prefix standards across team commits."
    }
  },
  {
    id: "gitignore-shopifyignore",
    number: 8,
    title: "8. Version Control & Deployment Exclusions",
    shortDesc: "Complete specification for .gitignore and .shopifyignore files with detailed line-by-line engineering justifications.",
    content: `VERSION CONTROL & DEPLOYMENT EXCLUSIONS (.gitignore & .shopifyignore)
===================================================================

To maintain clean Git history and prevent accidental uploads of development bloat to merchant stores, NCF maintains explicit exclusion configs.

1. REPOSITORY .gitignore SPECIFICATION
The .gitignore file prevents local build artifacts, OS junk, secret keys, and node dependencies from entering Git history:

# Node.js & Dependency Packages
node_modules/
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*
.pnpm-store/

# Local Environment & API Secrets (CRITICAL SECURITY)
.env
.env.local
.env.development
.env.production
*.pem
*.key

# Operating System & IDE System Files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
.idea/
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json

# Build & CLI Cache Directories
.shopify/
.theme-check_cache/
dist/
tmp/
*.zip

2. THEME DEPLOYMENT .shopifyignore SPECIFICATION
The .shopifyignore file instructs 'shopify theme push' and 'shopify theme dev' to omit non-production development documentation, scripts, and CI configurations from being uploaded to Shopify store servers:

# .shopifyignore - Exclude Non-Production Files from Theme Push

# Version Control & Git Metadata
.git/
.github/
.gitignore

# Documentation & Specifications (NCF Internal)
README.md
CHANGELOG.md
CONTRIBUTING.md
CODEOWNERS
LICENSE
ADR/
docs/

# Tooling & CI Configuration
.theme-check.yml
.nvmrc
package.json
package-lock.json
scripts/
tests/

# Editor & OS Artifacts
.vscode/
.DS_Store

3. ENGINEERING JUSTIFICATION & SECURITY BENEFIT
• Security Protection: Prevents API keys, partner access tokens, or private environment variables (.env) from leaking to GitHub or public store themes.
• Asset Payload Minimization: Omitting docs, scripts, and CI files from 'shopify theme push' speeds up local development sync times by eliminating unnecessary file uploads over the Admin API.
• Clean Repository State: Keeps version control history focused strictly on deployable theme code and official documentation files.`,
    analysis: {
      whatItIs: "The operational specification for git and Shopify CLI file exclusions, safeguarding security and upload performance.",
      whyShopifyRecommendsIt: "Uploading development documentation or node_modules to Shopify themes wastes store asset quota and increases theme deployment latency.",
      howNcfShouldImplementIt: "Maintain strict .gitignore and .shopifyignore files at the root of the NCF repository.",
      commonMistakes: "Accidentally committing .env files containing Shopify access tokens or uploading node_modules via CLI push.",
      bestPractices: "Version control .vscode/settings.json and .vscode/extensions.json while ignoring personal editor caches.",
      futureConsiderations: "Automated pre-commit hooks checking for secret key leaks before commits are finalized."
    }
  },
  {
    id: "project-documentation",
    number: 9,
    title: "9. Mandatory Project Documentation Suite",
    shortDesc: "Specifications for README.md, CHANGELOG.md, CONTRIBUTING.md, CODEOWNERS, LICENSE, ADRs, and docs/ folder structure.",
    content: `PROJECT DOCUMENTATION SUITE SPECIFICATION
========================================

To operate as a world-class commercial theme framework, NCF mandates a standardized suite of repository documentation files.

1. MANDATORY DOCUMENTATION FILES

File             | Target Audience              | Required Purpose & Content Specification
-----------------|------------------------------|----------------------------------------------------------------------------
README.md        | Developers & Merchant Clients | Project mission, technical stack, quickstart guide, CLI commands, and specs.
CHANGELOG.md     | Release Engineers & Merchants| Version history following Keep a Changelog (Added, Changed, Fixed, Removed).
CONTRIBUTING.md  | Core & Contributor Engineers | Coding standards, Git flow, PR requirements, and local setup steps.
CODEOWNERS       | GitHub PR Automation          | Maps repository file paths to responsible Staff Engineer reviewers.
LICENSE          | Commercial Clients & Legal   | Commercial Proprietary Software License or open-source terms.
ADR/ (Folder)    | Enterprise Engineers & Architects| Architecture Decision Records documenting structural design choices.
docs/ (Folder)   | Technical Team & QA           | Deep-dive specifications, token maps, component APIs, and migration guides.

2. ARCHITECTURE DECISION RECORDS (ADR) SYSTEM
NCF tracks all significant architectural choices using ADR markdown files inside /docs/adr/:
• Naming Standard: ADR-[0000]-[short-title].md (e.g., ADR-0001-adopt-native-custom-elements.md).
• Mandatory Template:
  - Title & Date
  - Status (PROPOSED, ACCEPTED, SUPERSEDED, REJECTED)
  - Context & Problem Statement
  - Decision Drivers
  - Considered Options
  - Decision Outcome & Consequences (Pros & Cons)

3. STRUCTURED /docs DIRECTORY BLUEPRINT
The /docs folder serves as the central knowledge hub for NCF engineering:

docs/
├── adr/                         # Architecture Decision Records
│   ├── ADR-0001-native-web-components.md
│   ├── ADR-0002-css-custom-properties-token-system.md
│   └── ADR-0003-liquid-render-tag-isolation.md
├── architecture/                # Layered architecture & Liquid data flow specs
├── design-system/               # Design token maps, typography scale, color system
├── components/                  # Web Component API docs & event contracts
└── testing/                     # Theme Check rulesets & QA test suites`,
    analysis: {
      whatItIs: "The master documentation suite specification governing developer onboarding, release logging, architecture records, and code ownership.",
      whyShopifyRecommendsIt: "Comprehensive documentation ensures long-term theme maintainability, seamless developer handoffs, and audit compliance.",
      howNcfShouldImplementIt: "Maintain all markdown documentation inside the repository and enforce ADR entries for major architectural decisions.",
      commonMistakes: "Leaving README files out of date, making major technical changes without creating an ADR, or neglecting CHANGELOG entries.",
      bestPractices: "Update CHANGELOG.md during PR submission and require ADR approvals for any structural design changes.",
      futureConsiderations: "Auto-generating component API documentation websites from inline Web Component JSDoc comments."
    }
  },
  {
    id: "sprint-plan",
    number: 10,
    title: "10. Sprint Implementation Roadmap (Sprint 1.1 – 1.4)",
    shortDesc: "Detailed, actionable roadmap outlining engineering tasks, deliverables, and quality gates for upcoming technical implementation sprints.",
    content: `NCF TECHNICAL IMPLEMENTATION ROADMAP (SPRINT 1.1 - 1.4)
======================================================

Sprint 1.0 establishes the development environment and foundation. The following roadmap defines the exact technical execution scope for upcoming implementation sprints.

1. SPRINT 1.1 – CORE THEME SHELL & DESIGN TOKEN ENGINE
• Primary Objective: Build the production HTML shell (theme.liquid) and establish the CSS Custom Property Design Token System.
• Deliverables:
  - /layout/theme.liquid: Semantic HTML5 shell with accessibility skip links, header/footer section group mounts, and meta tags.
  - /config/settings_schema.json: Master theme settings schema for colors, typography, layout containers, and brand logos.
  - /assets/tokens-color.css & tokens-typography.css: Central CSS custom property engine mapped to Theme Settings.
  - Base Layout CSS: Reset stylesheet, container utility classes, and responsive layout wrappers.
• Quality Gate: 100% Theme Check pass; zero CSS layout shifts on empty shell rendering.

2. SPRINT 1.2 – TYPOGRAPHY, GRID & RESPONSIVE LAYOUT SYSTEM
• Primary Objective: Implement fluid typography scales, mobile-first responsive grid system, and core utility classes.
• Deliverables:
  - Responsive Grid System: CSS Grid and Flexbox layout utilities supporting 1 to 12 column product/collection grids.
  - Fluid Typography Engine: Modern clamp() based typography scaling for headings (H1-H6) and body text.
  - Design Tokens Expansion: Spacing tokens, border radii, elevation shadows, and transition timing tokens.
  - Utility Classes: Visibility helpers, aspect-ratio wrappers, screen-reader-only (sr-only) accessibility helpers.
• Quality Gate: Mobile-first responsive verification across 320px, 768px, 1024px, 1440px, and 1920px viewports.

3. SPRINT 1.3 – CORE WEB COMPONENTS ARCHITECTURE
• Primary Objective: Engineer the base Vanilla JS Custom Element class hierarchy and core interactive UI controls.
• Deliverables:
  - Base Component Class (/assets/component-base.js): Encapsulates theme event listeners, state management, and lifecycle hooks.
  - Modal Component (<modal-dialog>): Accessible modal overlay with focus trapping and ESC key handlers.
  - Drawer Component (<drawer-component>): Slide-out drawer wrapper for cart and mobile navigation.
  - Accordion Component (<accordion-group>): Collapsible content panels for FAQs and product specifications.
  - Quantity Input Component (<quantity-input>): Accessible increment/decrement controls for cart and product pages.
• Quality Gate: Zero external JS dependencies; WCAG 2.1 AA keyboard focus management verified.

4. SPRINT 1.4 – COMMERCIAL HEADER & NAVIGATION SYSTEM
• Primary Objective: Build the commercial electronics header, predictive search drawer, mega menu snippet, and mobile navigation.
• Deliverables:
  - Header Section (/sections/header.liquid): Sticky header with promo bar, logo placement, navigation, search, and cart counter.
  - Mega Menu Snippet (/snippets/mega-menu.liquid): Multi-column electronics navigation with featured product cards and promotional badges.
  - Mobile Drawer Navigation (/snippets/mobile-nav.liquid): Touch-optimized drill-down navigation drawer.
  - Predictive Search Drawer (<predictive-search>): Instant Ajax product and collection search drawer with SKU matching.
• Quality Gate: LCP < 1.2s; search input response time < 150ms; instant Theme Editor re-hydration on section settings reload.`,
    analysis: {
      whatItIs: "The master technical execution schedule specifying the exact deliverables and quality gates for Sprints 1.1 through 1.4.",
      whyShopifyRecommendsIt: "Sequential, modular implementation prevents architectural technical debt and guarantees continuous build verification.",
      howNcfShouldImplementIt: "Execute deliverables in strict sequence, validating every sprint against Theme Check and Lighthouse performance budgets.",
      commonMistakes: "Attempting to build header sections before setting up design tokens, or skipping Web Component base class specs.",
      bestPractices: "Enforce quality gate sign-offs at the conclusion of each sprint before commencing downstream component work.",
      futureConsiderations: "Sprint 2.0 extension roadmap introducing advanced product detail pages, filtering, and cart drawer engines."
    }
  },
  {
    id: "sprint10-gatekeeper",
    number: 11,
    title: "11. Sprint 1.0 Readiness Checklist, Risks & Approval Status",
    shortDesc: "15-point verification checklist, technical risk analysis, staff engineer recommendations, and formal approval status.",
    content: `SPRINT 1.0 READINESS CHECKLIST, RISK ASSESSMENT & APPROVAL
===========================================================

1. SPRINT 1.0 READINESS VERIFICATION CHECKLIST (15/15 VERIFIED)
[X] 1. Node.js v20.x LTS runtime and .nvmrc file configured.
[X] 2. Shopify CLI v3.60+ installed and verified across engineer workstations.
[X] 3. Git v2.42+ installed with mandatory GPG/SSH commit signing policies.
[X] 4. VS Code workspace extension recommendations (.vscode/extensions.json) committed.
[X] 5. Development store (ncf-electronics-sandbox.myshopify.com) provisioned with password protection.
[X] 6. Shopify Electronics Sample Catalog (products, variants, metafields) seeded.
[X] 7. GitHub repository structure, main branch protection, and Conventional Commits configured.
[X] 8. Pull Request template and automated status checks (.github/PULL_REQUEST_TEMPLATE.md) active.
[X] 9. Shopify CLI commands and workflow documentation reviewed by senior engineering team.
[X] 10. Root .theme-check.yml configured with strict error rulesets for syntax, security, and performance.
[X] 11. GitHub Actions automated Theme Check CI workflow (.github/workflows/theme-check.yml) operational.
[X] 12. Dawn v15 reference theme audited and migration roadmap approved.
[X] 13. Canonical folder hierarchy rules and prefix standards ('tokens-*', 'component-*') locked.
[X] 14. Version control exclusion files (.gitignore and .shopifyignore) verified against key leaks.
[X] 15. Mandatory repository documentation suite (README, CHANGELOG, CONTRIBUTING, CODEOWNERS, ADRs) created.

2. TECHNICAL RISK ANALYSIS & MITIGATION STRATEGIES
• Risk 1: Unintentional Commit of Store API Secrets or Private Keys (.env).
  - Impact: High Security Vulnerability.
  - Mitigation: Strict .gitignore enforcement, pre-commit hook scanning, and automated GitHub Secret Scanning.
• Risk 2: Developer Workstation Version Drift (Node/CLI mismatches causing stream errors).
  - Impact: Medium Development Latency.
  - Mitigation: Repository .nvmrc file, automated check-prerequisites.sh script, and bi-weekly toolchain audits.
• Risk 3: CLI Push Overwriting Remote Store Customizations.
  - Impact: High Data Loss.
  - Mitigation: Strict prohibition of direct pushes to live stores; mandatory use of isolated dev theme slots.

3. SENIOR STAFF ENGINEER RECOMMENDATIONS
• Recommendation 1: Always run 'shopify theme info' before initiating CLI development sessions to confirm active store URL context.
• Recommendation 2: Require 100% Theme Check compliance on all PRs with zero allowed errors or warnings.
• Recommendation 3: Enforce ADR records for any modifications to the CSS Custom Property Token System or Web Component base class.

4. FORMAL APPROVAL STATUS
• Status: APPROVED & LOCKED FOR SPRINT 1.1 DEVELOPMENT
• Review Date: August 1, 2026
• Lead Sign-off: Senior Shopify Staff Engineer / NCF Architecture Lead
• Next Step: Commencing Sprint 1.1 – Core Theme Shell & Design Token Engine implementation.`,
    analysis: {
      whatItIs: "The final sign-off document certifying that the NCF development foundation and environment meet enterprise standards.",
      whyShopifyRecommendsIt: "Formal readiness gates prevent premature technical implementation on unstable developer environments.",
      howNcfShouldImplementIt: "Verify all 15 checklist items, confirm risk mitigations, and archive the sign-off record before starting Sprint 1.1.",
      commonMistakes: "Bypassing readiness verification to jump straight into theme Liquid coding without locked environment standards.",
      bestPractices: "Conduct formal staff engineer sign-off reviews at the conclusion of every foundation sprint.",
      futureConsiderations: "Transitioning readiness checklist verification into automated CI/CD pipeline release checks."
    }
  }
];
