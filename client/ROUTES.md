# Route Map & Navigation Guide

Complete documentation of all routes and their purposes in the Barangay Management application.

## Route Structure Overview

### Public Routes (No Authentication Required)

```
/login                    - User login page
/signup                   - User registration page
/                        - Root redirect to /login
```

### Protected Routes (Authentication Required)

All protected routes require a valid authentication token and appropriate user role.

## Detailed Route Map

### Authentication Routes (`/(auth)/`)

No authentication required. Redirect to dashboard if already logged in.

| Route       | Component      | Purpose                        | Accessible To |
| ----------- | -------------- | ------------------------------ | ------------- |
| `/login`    | `login.tsx`    | User login with email/password | All           |
| `/register` | `register.tsx` | New user registration          | All           |

### Citizen Dashboard Routes (`/_protected/dashboard/*`)

Requires authentication. All citizens can access these routes.

#### Main Dashboard

| Route        | Component       | Purpose                                   |
| ------------ | --------------- | ----------------------------------------- |
| `/dashboard` | `dashboard.tsx` | Main citizen dashboard with quick actions |

#### Complaints Management

| Route                       | Component                      | Purpose                            |
| --------------------------- | ------------------------------ | ---------------------------------- |
| `/dashboard/complaints`     | `dashboard.complaints.tsx`     | View and filter citizen complaints |
| `/dashboard/complaints/new` | `dashboard.complaints.new.tsx` | Submit new complaint               |

#### Document Requests

| Route                      | Component                     | Purpose                |
| -------------------------- | ----------------------------- | ---------------------- |
| `/dashboard/documents`     | `dashboard.documents.tsx`     | View document requests |
| `/dashboard/documents/new` | `dashboard.documents.new.tsx` | Request new document   |

#### Announcements & Alerts

| Route                               | Component                              | Purpose                           |
| ----------------------------------- | -------------------------------------- | --------------------------------- |
| `/dashboard/announcements`          | `dashboard.announcements.tsx`          | View announcements                |
| `/dashboard/announcements-detailed` | `dashboard.announcements-detailed.tsx` | Announcements with map and alerts |

#### Services

| Route                 | Component                | Purpose                   |
| --------------------- | ------------------------ | ------------------------- |
| `/dashboard/services` | `dashboard.services.tsx` | Browse community services |

### Official Dashboard Routes (`/_protected/_official/*`)

Requires authentication + `barangay_official` or `admin` role.

#### Main Dashboard

| Route                 | Component                 | Purpose                       |
| --------------------- | ------------------------- | ----------------------------- |
| `/official/dashboard` | `_official/dashboard.tsx` | Official dashboard with stats |

#### Complaints Management

| Route                  | Component                  | Purpose                        |
| ---------------------- | -------------------------- | ------------------------------ |
| `/official/complaints` | `_official/complaints.tsx` | View and manage all complaints |

#### Residents Management

| Route                 | Component                 | Purpose                     |
| --------------------- | ------------------------- | --------------------------- |
| `/official/residents` | `_official/residents.tsx` | Search and manage residents |

#### Document Processing

| Route                 | Component                 | Purpose                   |
| --------------------- | ------------------------- | ------------------------- |
| `/official/documents` | `_official/documents.tsx` | Process document requests |

#### Reports & Analytics

| Route               | Component               | Purpose                    |
| ------------------- | ----------------------- | -------------------------- |
| `/official/reports` | `_official/reports.tsx` | View reports and analytics |

### Admin Dashboard Routes (`/_protected/_admin/*`)

Requires authentication + `admin` role.

#### Main Dashboard

| Route              | Component              | Purpose                           |
| ------------------ | ---------------------- | --------------------------------- |
| `/admin/dashboard` | `_admin/dashboard.tsx` | Admin dashboard with system stats |

#### User Management

| Route          | Component          | Purpose                       |
| -------------- | ------------------ | ----------------------------- |
| `/admin/users` | `_admin/users.tsx` | Manage system users and roles |

#### System Analytics

| Route              | Component              | Purpose                          |
| ------------------ | ---------------------- | -------------------------------- |
| `/admin/analytics` | `_admin/analytics.tsx` | System-wide analytics and charts |

#### Announcements

| Route                  | Component                  | Purpose                     |
| ---------------------- | -------------------------- | --------------------------- |
| `/admin/announcements` | `_admin/announcements.tsx` | Manage system announcements |

#### System Settings

| Route             | Component             | Purpose                     |
| ----------------- | --------------------- | --------------------------- |
| `/admin/settings` | `_admin/settings.tsx` | Configure system parameters |

## Navigation Hierarchy

```
Root (/)
├── Public Routes
│   ├── /login
│   └── /register
│
└── Protected Routes (_protected)
    ├── Citizen Dashboard (/dashboard)
    │   ├── /dashboard
    │   ├── /dashboard/complaints
    │   ├── /dashboard/complaints/new
    │   ├── /dashboard/documents
    │   ├── /dashboard/documents/new
    │   ├── /dashboard/announcements
    │   ├── /dashboard/announcements-detailed
    │   └── /dashboard/services
    │
    ├── Official Dashboard (_official)
    │   ├── /official/dashboard
    │   ├── /official/complaints
    │   ├── /official/residents
    │   ├── /official/documents
    │   └── /official/reports
    │
    └── Admin Dashboard (_admin)
        ├── /admin/dashboard
        ├── /admin/users
        ├── /admin/analytics
        ├── /admin/announcements
        └── /admin/settings
```

## Route Guards & Protection

### Authentication Guard (`_protected`)

- Checks `isAuthenticated` in Zustand store
- Redirects unauthenticated users to `/login`
- Waits for localStorage hydration
- Fetches user profile on initialization

### Role-Based Guards

- **`_official`**: Requires `barangay_official` or `admin` role
- **`_admin`**: Requires `admin` role
- Redirects users without proper role to `/dashboard`

## Navigation Patterns

### Programmatic Navigation

```typescript
import { useNavigate } from '@tanstack/react-router'

const navigate = useNavigate()
navigate({ to: '/dashboard/complaints' })
navigate({ to: '/login', search: { reason: 'expired' } })
```

### Link Navigation

```typescript
import { Link } from '@tanstack/react-router'

<Link to="/dashboard/complaints">View Complaints</Link>
<Link to="/dashboard/complaints/new">New Complaint</Link>
```

### Search Parameters

Some routes support search parameters:

```typescript
// Login with session expired message
/login?reason=expired
```

## Deep Linking

All routes support deep linking:

- Users can bookmark and return to specific pages
- Back/forward browser navigation works correctly
- Page refreshes maintain current location

## Redirect Behavior

### On Login

```
/login → /dashboard (citizen)
/login → /official/dashboard (official)
/login → /admin/dashboard (admin)
```

### On Logout

```
Any protected route → /login
```

### On Unauthorized Access

```
/official/route (as citizen) → /dashboard
/admin/route (as citizen/official) → /dashboard
```

### On Page Refresh

- Zustand store rehydrates from localStorage
- User stays on current page if still authorized
- Redirects to login if session expired

## Route Parameters

Routes with dynamic parameters:

### Complaint Detail (Planned)

```
/dashboard/complaints/[id]
/official/complaints/[id]
```

### Document Detail (Planned)

```
/dashboard/documents/[id]
/official/documents/[id]
```

### User Detail (Admin, Planned)

```
/admin/users/[id]
```

## File-Based Routing Convention

TanStack Router uses file-based routing:

- File name determines route path
- Folders create path segments
- Bracket notation `[param]` creates dynamic segments
- Underscore prefix `_` creates layout groups
- Parentheses `(group)` create non-path groups

Examples:

```
dashboard.tsx                  → /dashboard
dashboard.complaints.tsx       → /dashboard/complaints
dashboard.complaints.new.tsx   → /dashboard/complaints/new
(auth)/login.tsx              → /login (non-path group)
_protected.tsx                → Layout group (doesn't affect path)
```

## Performance Considerations

- Routes are code-split automatically by Vite
- Each feature loads only when accessed
- Nested routes inherit parent layouts
- Protected routes prevent unauthorized data loading

## SEO & Metadata

Route metadata is set in each route component:

```typescript
export const Route = createFileRoute('/dashboard')({
  component: DashboardComponent,
})
```

Root route configures global metadata:

```typescript
head: () => ({
  meta: [
    { title: 'Dashboard - Barangay Management' },
    { name: 'description', content: '...' },
  ],
})
```

## Adding New Routes

1. Create file in appropriate location under `src/routes/`
2. Use TanStack Router API:
   ```typescript
   export const Route = createFileRoute('/new-route')({
     component: NewRouteComponent,
   })
   ```
3. Create component file
4. Add navigation links if needed

## Troubleshooting Routes

### Route Not Found (404)

- Check file name matches expected route
- Verify underscore prefixes for layouts
- Check for typos in path

### Cannot Access Route

- Verify authentication status
- Check user role/permissions
- Check browser console for errors
- Verify token hasn't expired

### Lost Navigation State

- TanStack Router preserves some state
- Use URL search params for persistable state
- Use Zustand store for session state
- Avoid relying on component state across navigation
