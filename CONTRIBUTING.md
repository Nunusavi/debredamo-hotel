# Contributing to DEBREDAMO HOTEL

Thank you for your interest in contributing to the DEBREDAMO HOTEL project! This guide will help you get started.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Submitting Changes](#submitting-changes)
7. [Review Process](#review-process)

---

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Focus on constructive feedback
- Collaborate openly
- Prioritize the project's best interests

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- Git
- Basic knowledge of:
  - TypeScript
  - React
  - Next.js
  - PostgreSQL/Prisma

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/debredamo-hotel.git
   cd debredamo-hotel
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

---

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

```
feature/add-room-search
fix/booking-form-validation
refactor/database-queries
docs/update-api-documentation
chore/update-dependencies
```

### Workflow Steps

1. **Create a new branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following our [coding standards](#coding-standards)
   - Test your changes thoroughly
   - Commit frequently with clear messages

3. **Keep your branch updated**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

4. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Request review from maintainers

---

## Coding Standards

### TypeScript

#### Type Safety

Always use proper TypeScript types:

```typescript
// Good
interface RoomProps {
  id: string
  name: string
  capacity: number
}

function RoomCard({ id, name, capacity }: RoomProps) {
  // ...
}

// Bad
function RoomCard(props: any) {
  // ...
}
```

#### Type Inference

Let TypeScript infer types when obvious:

```typescript
// Good - type inferred
const rooms = getAllRooms()

// Unnecessary - don't over-specify
const rooms: Room[] = getAllRooms()
```

#### Avoid `any`

```typescript
// Bad
const data: any = await fetchData()

// Good
interface ApiResponse {
  rooms: Room[]
  total: number
}

const data: ApiResponse = await fetchData()
```

### React Components

#### Component Structure

```tsx
'use client'  // Only if needed

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ComponentNameProps {
  title: string
  onAction?: () => void
}

export function ComponentName({ title, onAction }: ComponentNameProps) {
  const [state, setState] = useState<string>('')

  const handleClick = () => {
    // Handler logic
    onAction?.()
  }

  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick}>Action</Button>
    </div>
  )
}
```

#### Naming Conventions

- **Components**: PascalCase (`RoomCard`, `BookingForm`)
- **Files**: kebab-case (`room-card.tsx`, `booking-form.tsx`)
- **Functions**: camelCase (`handleSubmit`, `getRoomBySlug`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_GUESTS`, `DEFAULT_LOCALE`)

#### File Organization

```
component-name.tsx        # Main component
component-name.test.tsx   # Tests (if applicable)
component-name.styles.ts  # Styles (if complex CSS-in-JS)
```

### Styling

#### Use Tailwind Classes

```tsx
// Good
<div className="rounded-lg bg-white p-6 shadow-md">
  Content
</div>

// Avoid inline styles unless dynamic
<div style={{ padding: '24px' }}>
  Content
</div>
```

#### Responsive Design

Always consider mobile-first:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

#### Use Design Tokens

Reference CSS variables from `globals.css`:

```tsx
<div className="bg-primary text-primary-foreground">
  Content
</div>
```

### Database Operations

#### Use Prisma Client

```typescript
import { prisma } from '@/lib/db/prisma'

// Good - type-safe
const posts = await prisma.blogPost.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' }
})

// Bad - raw SQL (unless absolutely necessary)
await prisma.$queryRaw`SELECT * FROM blog_posts`
```

#### Error Handling

Always handle database errors:

```typescript
try {
  const submission = await prisma.contactSubmission.create({
    data: formData
  })
  return { success: true, data: submission }
} catch (error) {
  console.error('Database error:', error)
  return { success: false, error: 'Failed to save submission' }
}
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

#### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Examples

```
feat(rooms): Add room filtering by price range

Implemented price range slider in room filters component.
Users can now filter rooms by minimum and maximum price.

Closes #123
```

```
fix(booking): Correct date validation in booking form

Fixed bug where past dates could be selected for check-in.
Now validates that check-in date is in the future.

Fixes #456
```

```
docs(api): Update contact API documentation

Added examples and response schemas for contact endpoint.
```

---

## Testing

### Manual Testing

Before submitting a PR, test your changes:

1. **Functionality**
   - Feature works as expected
   - Edge cases handled
   - Error states display correctly

2. **Responsive Design**
   - Test on mobile (< 768px)
   - Test on tablet (768px - 1024px)
   - Test on desktop (> 1024px)

3. **Browser Compatibility**
   - Chrome/Edge
   - Firefox
   - Safari

4. **Accessibility**
   - Keyboard navigation works
   - Screen reader friendly
   - Proper ARIA labels

### Build Testing

Always verify your changes build successfully:

```bash
npm run build
```

Fix any TypeScript errors or build warnings.

### Linting

Ensure code passes linting:

```bash
npm run lint
```

Fix any ESLint errors before committing.

---

## Submitting Changes

### Pull Request Checklist

Before opening a PR, ensure:

- [ ] Code follows project coding standards
- [ ] All TypeScript errors resolved
- [ ] Build completes successfully (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Tested on multiple screen sizes
- [ ] i18n: Added translations for both en and am
- [ ] Database migrations tested (if applicable)
- [ ] No console.log statements (or justified if needed)
- [ ] Commit messages follow conventions
- [ ] PR description is clear and complete

### PR Title Format

```
<type>(<scope>): <short description>
```

Examples:
- `feat(booking): Add email booking functionality`
- `fix(navigation): Correct mobile menu scroll issue`
- `docs(readme): Update installation instructions`

### PR Description Template

```markdown
## Description
Brief description of changes and why they were made.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Closes #123
Relates to #456

## Changes Made
- Added room price filter component
- Updated room data structure to include price ranges
- Modified room listing page to use new filter

## Testing
Describe how you tested your changes:
- Tested room filtering on desktop and mobile
- Verified price ranges display correctly
- Checked that no rooms with price = 0 appear

## Screenshots (if applicable)
Add screenshots showing the changes

## Additional Notes
Any additional context or notes for reviewers
```

---

## Review Process

### What to Expect

1. **Initial Review**: A maintainer will review within 2-3 business days
2. **Feedback**: You may receive comments and change requests
3. **Iteration**: Make requested changes and push updates
4. **Approval**: Once approved, your PR will be merged
5. **Merge**: Changes will be merged into `develop` branch

### Responding to Feedback

- **Be receptive** to suggestions
- **Ask questions** if feedback is unclear
- **Explain your reasoning** if you disagree
- **Update quickly** to keep the PR moving

### After Merge

Once your PR is merged:
- Your changes will be included in the next release
- Delete your feature branch locally and remotely:
  ```bash
  git branch -d feature/your-feature
  git push origin --delete feature/your-feature
  ```

---

## Specific Contribution Areas

### Adding New Features

1. **Discuss first**: Open an issue to discuss major features
2. **Plan architecture**: Consider impact on existing code
3. **Document**: Update relevant documentation
4. **Test thoroughly**: Ensure feature works in all scenarios

### Fixing Bugs

1. **Reproduce**: Ensure you can reproduce the bug
2. **Identify root cause**: Understand why the bug occurs
3. **Fix minimally**: Make the smallest change that fixes the issue
4. **Test**: Verify the fix works and doesn't break anything
5. **Add tests**: If possible, add tests to prevent regression

### Improving Documentation

1. **Identify gaps**: What's missing or unclear?
2. **Be clear**: Write for developers of all skill levels
3. **Use examples**: Show code examples where helpful
4. **Update related docs**: Keep all documentation in sync

### Refactoring Code

1. **Have a clear goal**: Improve performance, readability, or maintainability
2. **Keep behavior unchanged**: Refactoring shouldn't change functionality
3. **Test extensively**: Ensure nothing breaks
4. **Document reasoning**: Explain why the refactor is beneficial

---

## Internationalization (i18n) Guidelines

### Adding Translatable Content

When adding new user-facing text:

1. **Static Content** (`config/site.ts`):
   ```typescript
   {
     label: 'New Feature',
     label_am: 'አዲስ ባህሪ'
   }
   ```

2. **Database Content** (Prisma schema):
   ```prisma
   model NewModel {
     title       String
     titleAm     String
   }
   ```

3. **Components**:
   ```tsx
   const title = locale === 'am' ? titleAm : title
   ```

### Translation Quality

- **Accuracy**: Ensure translations are accurate
- **Context**: Consider cultural context
- **Consistency**: Use consistent terminology
- **Professional**: Maintain professional tone

---

## Database Schema Changes

### Making Schema Changes

1. **Modify** `prisma/schema.prisma`
2. **Create migration**:
   ```bash
   npx prisma migrate dev --name descriptive_migration_name
   ```
3. **Test migration**: Ensure it applies cleanly
4. **Update seed**: Modify `prisma/seed.ts` if needed
5. **Document**: Update relevant documentation

### Migration Best Practices

- **Descriptive names**: `add_room_amenities_table`, `add_price_to_rooms`
- **Backwards compatible**: Avoid breaking changes when possible
- **Test rollback**: Ensure you can revert if needed
- **Data migration**: Include data transformation if schema changes affect existing data

---

## Questions or Need Help?

- **Documentation**: Check [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- **Issues**: Search existing issues or open a new one
- **Discussions**: Use GitHub Discussions for questions
- **Contact**: Reach out to the development team

---

## Recognition

Contributors will be recognized in:
- Project README (if making significant contributions)
- Release notes (for feature contributions)
- Our appreciation and gratitude!

Thank you for contributing to DEBREDAMO HOTEL!
