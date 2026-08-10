---
trigger: always_on
---

---
description: Accessibility (WCAG 2.2) enforcement for all UI components
globs: ["**/*.tsx", "**/*.jsx"]
alwaysApply: false
---
# Accessibility Rules
- Treat detected accessibility violations as blocking issues, and verify them with automated linting and tests where possible.
- Use semantic HTML first (never ARIA as crutch).
- All interactive elements must be keyboard accessible.
- Proper labels, aria-label on icon buttons, focus management.
- Meet WCAG 2.2 AA contrast requirements, including 4.5:1 for normal text, 3:1 for qualifying large text and relevant 3:1 non-text contrast requirements.
- Implement focus trapping in modals and skip links.
- Check expected accessible names, roles, focus order and announcements, then verify important flows with automated tooling and at least one real screen reader when practical.