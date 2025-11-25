# Project Best Practices

## React & TypeScript
- **Strict Typing**: Do NOT use `any`. Define proper interfaces and types for all props and state.
- **Functional Components**: Use functional components with hooks. Avoid class components.
- **Folder Structure**:
    - `src/components`: Reusable UI components.
    - `src/pages`: Page-level components.
    - `src/hooks`: Custom React hooks.
    - `src/utils`: Helper functions.
    - `src/types`: Shared TypeScript definitions.
- **Modularization**: Break down large components into smaller, focused sub-components.
- **Styling**: Use CSS modules or standard CSS with BEM naming convention where appropriate. Avoid inline styles for complex styling.
- **State Management**: Use React Context or local state for simple needs. Keep state as local as possible.

## General
- **Clean Code**: Write readable, self-documenting code.
- **Comments**: Comment complex logic, but prefer clear variable/function names.
