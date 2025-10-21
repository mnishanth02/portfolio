# Portfolio Redesign - Brownfield Refactoring Corrections

**Date**: 2024
**Branch**: `002-portfolio-redesign`
**Status**: Documentation updated, ready for implementation

## Executive Summary

This document tracks the critical corrections made to portfolio redesign documentation to accurately reflect **brownfield refactoring** instead of incorrectly assuming greenfield development.

### Problem Identified

The original `tasks.md` file (generated from spec.md) incorrectly assumed a **greenfield** implementation with all "Create" tasks, when in reality the codebase is **brownfield** with existing components that need **refactoring**.

**Discovery Method**: Comprehensive consistency analysis following `speckit.analyze.prompt.md` revealed:
- 6 CRITICAL issues
- 6 HIGH priority issues
- 8 MEDIUM priority issues
- 5 LOW priority issues

**Root Cause**: Original tasks generated without verifying existing codebase implementation.

---

## Corrective Actions Taken

### 1. Updated `spec.md`

**File**: `specs/002-portfolio-redesign/spec.md`

**Changes**:
- Added "BROWNFIELD REFACTORING" context header
- Added FR-058a through FR-065: Design token standardization requirements
- Added 15 clarifications for existing component modifications
- Documented 5 constitution violations to fix

**Key Additions**:
- FR-058a: Section spacing standardization (py-16)
- FR-058b: Heading typography (text-3xl font-bold tracking-tight)
- FR-059: Heading margin consistency (mb-8)
- FR-060: Grid gap standardization (gap-6)
- FR-061a: Icon sizing (h-6 w-6 for primary, h-4 w-4 for decorative)
- FR-062: Container width standardization (max-w-7xl)
- FR-063: Typo fix requirement (Videos.tsx line 7: "ontainer" → "container")
- FR-064: Hover effect standardization (transition-all duration-300 ease-in-out)
- FR-065: Component consistency (shadcn/ui Card, semantic section tags)

### 2. Updated `plan.md`

**File**: `specs/002-portfolio-redesign/plan.md`

**Changes**:
- Updated summary to reflect brownfield reality
- Listed 5 critical constitution violations to fix
- Added "REFACTORING" suffix to all phase titles
- Updated all phases to use "REFACTOR" verbs instead of "CREATE"
- Added "Current State" and "Target State" to each phase
- Inserted missing Phase 3 (Skills refactoring)

**Constitution Violations Documented**:
1. Projects.tsx uses `'use client'` with useEffect (MUST be Server Component)
2. Mock data embedded in Projects.tsx (MUST extract to lib/projects.ts)
3. Missing ARIA labels on all sections
4. Incomplete JSDoc comments
5. Inconsistent spacing (mb-16 vs py-20 - standardize to py-16)

**Phase Updates**:
- Phase 2: Timeline - "REFACTOR from single alternating to dual parallel"
- Phase 3: Skills - "REFACTOR to tabbed interface" (WAS MISSING)
- Phase 4: Blog→Articles - "REFACTOR to carousel + RENAME"
- Phase 5: Projects - "CONVERT client to server + bento grid"
- Phase 6: Videos - "ADD tabbed categories"

### 3. Created `tasks-refactoring.md`

**File**: `specs/002-portfolio-redesign/tasks-refactoring.md` (NEW)

**Purpose**: Replace incorrect greenfield tasks with accurate brownfield refactoring tasks

**Structure**:
- **Phase 1: Foundation** (21 tasks) - Constitution violations + design tokens
- **Phase 2: Timeline Refactoring** (12 tasks) - Dual-column layout
- **Phase 3: Skills Refactoring** (13 tasks) - Tabbed interface
- **Phase 4: Articles Refactoring** (13 tasks) - Horizontal carousel
- **Phase 5: Projects Refactoring** (14 tasks) - Server component + bento grid
- **Phase 6: Videos Refactoring** (12 tasks) - Tabbed categories
- **Phase 7: Philosophy** (9 tasks) - Relocation to /about
- **Phase 8: Polish** (28 tasks) - Cross-cutting quality assurance

**Total Tasks**: 122 refactoring tasks (vs 178 greenfield tasks)

**Key Differences**:
- Uses "REFACTOR", "MODIFY", "RENAME", "EXTRACT" verbs
- Includes "REMOVE" and "DELETE" tasks for old code
- Adds "BREAKING CHANGE" warnings
- Documents constitution violation remediation

### 4. Archived Obsolete Files

**Actions**:
- Renamed: `tasks.md` → `tasks-greenfield-OBSOLETE.md`
- Created symlink: `tasks.md` → `tasks-refactoring.md`

**Reason**: Preserve original for reference while making correct version canonical

---

## Existing Components Requiring Refactoring

| Component | Current State | Required Changes | Complexity |
|-----------|---------------|------------------|------------|
| `Timeline.tsx` | Single alternating column | → Dual parallel columns (career \| running) | HIGH |
| `Skills.tsx` | Grid of cards (2 cols) | → Tabbed interface (4 categories, 2/3/4 col grid) | MEDIUM |
| `Blog.tsx` | Vertical grid | → Horizontal carousel + RENAME to Articles.tsx | MEDIUM |
| `Projects.tsx` | Client component with mock data | → Server component + bento grid + extract data | HIGH |
| `Videos.tsx` | Simple grid | → Tabbed categories (Running/Coding/Talks) | MEDIUM |

---

## Constitution Violations Summary

### CRITICAL (Must Fix Before Feature Work)

1. **Projects.tsx Client Component**
   - **Violation**: Uses `'use client'` with useEffect for data fetching
   - **Constitution**: "Server Components default, Client Components only when necessary"
   - **Fix**: Remove 'use client', convert to RSC, extract data to lib/projects.ts

2. **Embedded Mock Data**
   - **Violation**: Project data hardcoded in component file
   - **Constitution**: "Content Management - Git-based content"
   - **Fix**: Extract to lib/projects.ts with proper TypeScript types

3. **Missing ARIA Labels**
   - **Violation**: No aria-label on section elements
   - **Constitution**: "WCAG AA compliance mandatory"
   - **Fix**: Add aria-label to all Timeline, Skills, Projects, Videos, Blog sections

### HIGH (Should Fix Early)

4. **Incomplete JSDoc Comments**
   - **Violation**: Missing comprehensive documentation
   - **Constitution**: "JSDoc comments required for all components"
   - **Fix**: Add @param, @returns, @example to all home components

5. **Inconsistent Spacing**
   - **Violation**: Mix of mb-16, py-20, py-16 across sections
   - **Constitution**: "Tailwind-only styling with consistency"
   - **Fix**: Standardize all to py-16 per FR-058a

---

## Design Token Standardization

### Spacing
- **Section padding**: `py-16` (NOT mb-16, NOT py-20)
- **Grid gaps**: `gap-6` (consistent across all grids)
- **Heading margin**: `mb-8` for all h2 elements

### Typography
- **H2 headings**: `text-3xl font-bold tracking-tight` (NOT text-2xl)
- **Container**: `max-w-7xl` for all section containers

### Icons
- **Primary icons**: `h-6 w-6` (timeline icons, tab icons)
- **Decorative icons**: `h-4 w-4` (inline icons, badges)

### Effects
- **Hover transitions**: `transition-all duration-300 ease-in-out`

### Components
- **Card usage**: Always use shadcn/ui Card component (NOT custom bg-card divs)
- **Semantic HTML**: All sections use `<section>` tags with id attributes

---

## Implementation Strategy

### MVP Approach (Recommended)

**Week 1**: Foundation + Critical Features
1. ✅ Complete Phase 1: Foundation (constitution + tokens)
2. ✅ Complete Phase 2: Timeline dual-column
3. ✅ Complete Phase 3: Skills tabbed interface
4. **VALIDATE**: Test, Lighthouse, WAVE audits
5. Deploy to preview

**Expected Result**: ~1100-1500px vertical scroll reduction

### Full Feature Implementation

**Week 2**: Important Features
4. Complete Phase 4: Blog→Articles carousel
5. Complete Phase 5: Projects bento grid + server component
6. **VALIDATE**: Test P1 + P2 together

**Week 3**: Nice-to-Have + Polish
7. Complete Phase 6: Videos tabs
8. Complete Phase 7: Philosophy relocation
9. Complete Phase 8: Cross-cutting polish
10. **FINAL**: Production deployment

**Expected Result**: Full 3000-3800px vertical scroll reduction

---

## Validation Checklist

### Documentation Accuracy
- [x] spec.md reflects brownfield reality
- [x] plan.md uses refactoring language
- [x] tasks-refactoring.md has correct verbs (REFACTOR, MODIFY, EXTRACT)
- [x] Constitution violations documented
- [x] Design tokens standardized

### Technical Alignment
- [x] All existing components identified
- [x] Breaking changes flagged
- [x] Data extraction tasks included
- [x] Server/Client component strategy clarified
- [x] Accessibility requirements explicit

### Execution Readiness
- [x] Tasks organized by dependency
- [x] Parallel work opportunities identified
- [x] Estimated timelines provided
- [x] Acceptance criteria defined
- [x] Testing strategy documented

---

## Next Steps

1. **Review**: Validate all documentation changes for accuracy
2. **Phase 1**: Fix constitution violations (R001-R003) - TOP PRIORITY
3. **Phase 1**: Standardize design tokens (R009-R021)
4. **Choose**: MVP (US1+US2) OR Full (all 6 user stories)
5. **Execute**: Follow tasks-refactoring.md sequentially
6. **Validate**: Lighthouse + WAVE audits after each phase
7. **Deploy**: Preview deployment after Phase 3 (MVP validation)

---

## Lessons Learned

### What Went Wrong
- Generated tasks without verifying existing codebase first
- Assumed greenfield when components already existed
- Missed constitution violations in initial spec review

### What Went Right
- Comprehensive consistency analysis caught ALL issues
- Systematic documentation updates ensured alignment
- Clear brownfield vs greenfield distinction now documented

### Process Improvements
- **ALWAYS** run `grep_search` for existing components before task generation
- **ALWAYS** analyze constitution compliance before spec approval
- **ALWAYS** verify design token consistency during spec review

---

## Approval Status

- [x] spec.md updated and reviewed
- [x] plan.md updated and reviewed
- [x] tasks-refactoring.md created and reviewed
- [x] Constitution violations documented
- [ ] **PENDING**: Final review before implementation start

**Ready for Implementation**: ✅ YES - All documentation corrections complete

---

## References

- Original spec: `specs/002-portfolio-redesign/spec.md`
- Implementation plan: `specs/002-portfolio-redesign/plan.md`
- **Active tasks**: `specs/002-portfolio-redesign/tasks-refactoring.md` (CANONICAL)
- Obsolete tasks: `specs/002-portfolio-redesign/tasks-greenfield-OBSOLETE.md` (ARCHIVED)
- Consistency analysis: Findings documented in conversation history

**Document Status**: FINAL
**Last Updated**: 2024
**Author**: AI Coding Agent (GitHub Copilot)
