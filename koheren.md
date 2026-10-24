team-coherence-validator
Synchronize team projects to ensure feature coherence, avoid code and page duplication, and map cross-feature connections. Use when collaborating on software, web, or mobile projects where multiple team members are working simultaneously and need to check alignment, check for duplicate components, or unify project architecture.

Instructions
Team Coherence Validator
A systematic workflow to review team contributions, map dependencies, detect feature/page duplication, and ensure architectural coherence across collaborative development projects.

When to Use
Reviewing new features or pages before merging or building to check for duplication.
Synchronizing team member contributions to ensure design, routing, and database consistency.
Designing a centralized navigation, component, or module map.
Core Workflow Steps
1. Feature & Page Inventory Mapping
Maintain a clear catalog or map of existing pages, components, API endpoints, and database models.
Group modules by functional domain (e.g., Authentication, Dashboard, Core Logic, Settings).
2. Duplicate Check Protocol
Before a team member builds a new page, component, or utility, cross-reference it against the catalog:
Does an existing page cover 80% of this requirement? (Can it be extended instead of created from scratch?)
Does a reusable component or helper already exist?
Flag redundant or overlapping work immediately.
3. Coherence & Integration Audit
Routing & Navigation: Ensure new pages are properly linked in navigation menus, routers, and breadcrumbs.
Data & State Consistency: Verify that frontend forms match backend database schemas and API contracts.
UI/UX Consistency: Check that styling patterns (e.g., design system, Tailwind classes) match the rest of the app.
4. Structured Team Sync Report
Provide a clear summary for the team:
Alignment Status: Coherent / Overlapping / Duplicate.
Shared Dependencies: Required shared components, APIs, or database updates.
Actionable Next Steps: Precise instructions on how to integrate the feature seamlessly.
