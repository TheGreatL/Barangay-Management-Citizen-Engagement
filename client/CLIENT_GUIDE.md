# Barangay Management & Citizen Engagement App - Client Guide

A comprehensive React-based web application for managing barangay operations, services, and citizen engagement. Built with TanStack Start, React Query, and modern web technologies.

## Tech Stack

- **Framework**: TanStack Start (React 19)
- **Routing**: TanStack Router (File-based routing)
- **State Management**: Zustand, React Query
- **Styling**: Tailwind CSS v4, Radix UI, shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Charts**: Recharts
- **UI Components**: Lucide icons, Sonner toasts

## Project Structure

```
client/src/
├── routes/                          # File-based routes (TanStack Router)
│   ├── (auth)/                      # Auth routes (login, register)
│   ├── _protected/                  # Protected routes (requires auth)
│   │   ├── dashboard*               # Citizen dashboard
│   │   ├── dashboard.complaints*    # Complaints management
│   │   ├── dashboard.documents*     # Document requests
│   │   ├── dashboard.announcements* # Announcements & alerts
│   │   ├── dashboard.services*      # Community services
│   │   ├── _official/               # Official routes (role-based)
│   │   └── _admin/                  # Admin routes (role-based)
│   └── __root.tsx                   # Root route layout
├── features/                        # Feature modules
│   ├── auth/                        # Authentication (login, register)
│   ├── complaints/                  # Complaint submission & tracking
│   ├── documents/                   # Document requests
│   ├── announcements/               # Public announcements
│   ├── services/                    # Community services
│   ├── disasters/                   # Disaster alerts & response
│   └── dashboard/                   # Dashboard components
├── shared/                          # Shared utilities & components
│   ├── api/                         # API configuration & interceptors
│   ├── components/                  # Reusable UI components
│   ├── stores/                      # Zustand state stores
│   ├── utils/                       # Utility functions
│   └── styles/                      # Global styles
└── types/                           # TypeScript type definitions
```

## Core Features

### For Citizens

- **User Authentication**: Secure login and registration
- **Complaint Submission**: Report issues with file attachments
- **Document Requests**: Apply for barangay documents
- **Announcements**: Browse latest barangay updates
- **Services**: View community services directory
- **Dashboard**: Personal account overview and quick access

### For Barangay Officials

- **Complaint Management**: Review and manage citizen complaints
- **Residents Database**: Search and manage resident records
- **Document Processing**: Approve/reject document requests
- **Reports & Analytics**: View system-wide analytics
- **Quick Actions**: Fast access to key management functions

### For Administrators

- **User Management**: Create and manage system users
- **System Analytics**: Comprehensive system-wide analytics
- **Announcements**: Manage system announcements
- **System Settings**: Configure system parameters

## Authentication & Authorization

### Role-Based Access Control

```typescript
- citizen: Basic access to citizen features
- barangay_official: Access to official dashboard and management
- admin: Full system access
```

### Protected Routes

- `/dashboard/*` - Citizen routes (requires authentication)
- `/_protected/_official/*` - Official routes (requires barangay_official or admin role)
- `/_protected._admin/*` - Admin routes (requires admin role)

Routes are protected at the component level using route layout guards.

## API Integration

### Base Configuration

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
```

### Service Layers

Each feature has a service layer for API calls:

- `complaintService` - Complaint operations
- `documentService` - Document requests
- `announcementService` - Announcements
- `serviceService` - Services listing
- `disasterService` - Disaster alerts

### Authentication Flow

1. User logs in with credentials
2. Access token stored in Zustand store
3. Token automatically included in all API requests
4. Session persistence via localStorage
5. Automatic logout on token expiration (401)

## Form Validation

### Zod Schemas

All forms use Zod for validation:

- `loginSchema` - Login form validation
- `registerSchema` - Registration validation
- `complaintSchema` - Complaint submission
- `documentRequestSchema` - Document request validation
- `announcementSchema` - Announcement creation

### React Hook Form Integration

Forms use React Hook Form with Zod resolver for seamless validation:

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<TCreateComplaint>({
  resolver: zodResolver(createComplaintSchema),
})
```

## State Management

### Zustand Store - Authentication

```typescript
useAuthStore()
- user: Current user object
- isAuthenticated: Authentication status
- hasHydrated: LocalStorage hydration status
- setAuth(): Set user after login
- logout(): Clear auth and user data
- initialize(): Fetch user profile on app load
```

### React Query - Data Fetching

All data queries use React Query with automatic caching:

```typescript
useQuery({
  queryKey: ['complaints', page],
  queryFn: () => complaintService.list(page, 10),
})
```

## Environment Variables

Required environment variables (in `.env` or via CI/CD):

```bash
VITE_API_URL=http://localhost:3000/api  # API server URL
```

## Development

### Installation

```bash
cd client
npm install  # or pnpm install, yarn install
```

### Development Server

```bash
npm run dev  # Starts Vite dev server on port 5173
```

### Build

```bash
npm run build  # Production build
```

### Preview

```bash
npm run preview  # Preview production build locally
```

### Linting & Formatting

```bash
npm run lint      # Run ESLint
npm run format    # Run Prettier (check)
npm run check     # Prettier + ESLint with --fix
```

## Component Structure

### Feature Components

Features follow a consistent structure:

```
feature/
├── {feature}.schema.ts      # Zod schemas & types
├── {feature}.service.ts     # API service layer
├── components/
│   ├── {feature}-list.tsx   # List/table view
│   ├── {feature}-form.tsx   # Form/creation
│   └── ...                  # Additional components
└── hooks/                   # Custom hooks (if needed)
```

### UI Components

Reusable UI components from Radix UI + shadcn/ui:

- `Button` - Action buttons
- `Input` - Text inputs
- `Badge` - Status badges
- `Alert` - Error/info alerts
- And more...

## Styling

### Tailwind CSS v4

- Mobile-first responsive design
- Custom color system via CSS variables
- Utility-first approach
- Hover/focus states for interactivity

### Theme System

Color scheme defined in `globals.css`:

```css
:root {
  --primary: 210 100% 50%;
  --secondary: 217.2 32.6% 17.5%;
  --background: 0 0% 100%;
  /* ... */
}
```

## Error Handling

### API Errors

```typescript
try {
  await api.post('/endpoint', data)
} catch (error) {
  // Automatic 401 logout on auth failure
  // User feedback via Sonner toast notifications
  toast.error(error.message)
}
```

### Form Errors

Errors automatically displayed below form fields:

```typescript
{errors.fieldName && (
  <p className="text-sm text-red-600">{errors.fieldName.message}</p>
)}
```

## Performance Optimizations

- React Query caching for API data
- Code splitting via TanStack Router
- Lazy loading of images
- Memoization of expensive computations
- Optimistic updates where applicable

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Build Output

Production build output goes to `dist/` directory:

```bash
npm run build
```

### Environment Setup

Set `VITE_API_URL` for your environment before building:

- Development: `http://localhost:3000/api`
- Staging: `https://api-staging.example.com/api`
- Production: `https://api.example.com/api`

### Docker Deployment

See `Dockerfile` for containerized deployment.

## Troubleshooting

### API Connection Issues

- Check `VITE_API_URL` environment variable
- Verify backend server is running
- Check browser console for CORS errors

### Authentication Issues

- Clear localStorage and refresh
- Check token expiration
- Verify user role/permissions

### Form Validation Errors

- Check Zod schema definitions
- Verify form field names match schema
- Check React Hook Form resolver setup

## Contributing

### Code Style

- ESLint configuration in `eslint.config.js`
- Prettier formatting in `prettier.config.js`
- TypeScript strict mode enabled

### Adding New Features

1. Create feature folder under `src/features/`
2. Add schema, service, and components
3. Create route file under `src/routes/`
4. Update navigation if needed
5. Add tests if applicable

## Support & Contact

For issues or questions:

1. Check existing documentation
2. Review error messages in browser console
3. Check API server logs for backend errors
4. Contact development team

## License

[Add your license information here]
