# Theming Guide

This guide explains how to customize the color theme of the Barangay Management application using CSS variables.

## Quick Start

All colors are defined as CSS variables in `client/src/shared/styles/global.css`. To change the theme, simply update the color values in the `:root` selector.

## Available CSS Variables

### Primary Colors (Brand Color)
```css
--color-primary: #2563eb;              /* Main brand color (Blue) */
--color-primary-light: #3b82f6;        /* Lighter shade for hover states */
--color-primary-dark: #1e40af;         /* Darker shade for active states */
```

### Semantic Colors
```css
--color-success: #16a34a;              /* Success/green color */
--color-warning: #d97706;              /* Warning/amber color */
--color-error: #dc2626;                /* Error/red color */
--color-info: #0ea5e9;                 /* Info/cyan color */
```

### Neutral Colors (Light Theme)
```css
--color-bg-primary: #ffffff;           /* Main background (white) */
--color-bg-secondary: #f8fafc;         /* Secondary background (light gray) */
--color-bg-tertiary: #f1f5f9;          /* Tertiary background (lighter gray) */

--color-text-primary: #0f172a;         /* Main text (dark) */
--color-text-secondary: #475569;       /* Secondary text (gray) */
--color-text-tertiary: #94a3b8;        /* Tertiary text (light gray) */

--color-border: #e2e8f0;               /* Borders */
--color-border-light: #f1f5f9;         /* Light borders */
```

### Sidebar Colors
```css
--color-sidebar-bg: #ffffff;           /* Sidebar background */
--color-sidebar-text: #0f172a;         /* Sidebar text color */
--color-sidebar-hover: #f8fafc;        /* Hover state background */
--color-sidebar-active: #eff6ff;       /* Active link background */
--color-sidebar-active-text: #2563eb;  /* Active link text color */
```

## How to Change the Theme

### 1. Light Theme (Default)

Edit the `:root` selector in `client/src/shared/styles/global.css`:

```css
:root {
  /* Change primary color */
  --color-primary: #2563eb;           /* Change to your brand color */
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1e40af;
  
  /* Change semantic colors */
  --color-success: #16a34a;           /* Green */
  --color-warning: #d97706;           /* Orange */
  --color-error: #dc2626;             /* Red */
  --color-info: #0ea5e9;              /* Cyan */
  
  /* Change backgrounds */
  --color-bg-primary: #ffffff;        /* Main background */
  --color-bg-secondary: #f8fafc;      /* Secondary background */
  --color-bg-tertiary: #f1f5f9;       /* Tertiary background */
  
  /* ... rest of variables ... */
}
```

### 2. Dark Theme

Edit the `.dark` selector for dark mode colors:

```css
.dark {
  --color-primary: #60a5fa;           /* Lighter blue for dark mode */
  --color-primary-light: #93c5fd;
  --color-primary-dark: #1e40af;
  
  --color-bg-primary: #0f172a;        /* Very dark background */
  --color-bg-secondary: #1e293b;      /* Dark background */
  --color-bg-tertiary: #334155;       /* Medium dark background */
  
  --color-text-primary: #f8fafc;      /* Light text */
  --color-text-secondary: #cbd5e1;    /* Light gray text */
  
  /* ... rest of variables ... */
}
```

## Example Theme Customizations

### 1. Modern Purple Theme

```css
:root {
  --color-primary: #7c3aed;           /* Purple-600 */
  --color-primary-light: #a78bfa;     /* Purple-400 */
  --color-primary-dark: #5b21b6;      /* Purple-800 */
  
  --color-success: #059669;           /* Emerald-600 */
  --color-warning: #ea580c;           /* Orange-600 */
  --color-error: #e11d48;             /* Rose-600 */
  
  --color-sidebar-active: #f3e8ff;    /* Purple-100 */
  --color-sidebar-active-text: #7c3aed;
}
```

### 2. Professional Green Theme

```css
:root {
  --color-primary: #059669;           /* Emerald-600 */
  --color-primary-light: #10b981;     /* Emerald-500 */
  --color-primary-dark: #047857;      /* Emerald-700 */
  
  --color-success: #0891b2;           /* Cyan-600 */
  --color-warning: #f59e0b;           /* Amber-500 */
  --color-error: #ef4444;             /* Red-500 */
  
  --color-sidebar-active: #ecfdf5;    /* Emerald-50 */
  --color-sidebar-active-text: #059669;
}
```

### 3. Corporate Blue Theme

```css
:root {
  --color-primary: #0369a1;           /* Sky-700 */
  --color-primary-light: #0284c7;     /* Sky-600 */
  --color-primary-dark: #082f49;      /* Sky-900 */
  
  --color-success: #1e7e34;           /* Green-700 */
  --color-warning: #b45309;           /* Amber-700 */
  --color-error: #b91c1c;             /* Red-700 */
  
  --color-sidebar-active: #f0f9ff;    /* Sky-50 */
  --color-sidebar-active-text: #0369a1;
}
```

## Hex Color References

### Color Palettes (Tailwind CSS)

#### Blues
- `#1e3a8a` - Blue-900
- `#1e40af` - Blue-800
- `#1d4ed8` - Blue-700
- `#2563eb` - Blue-600
- `#3b82f6` - Blue-500
- `#60a5fa` - Blue-400
- `#93c5fd` - Blue-300
- `#dbeafe` - Blue-100
- `#eff6ff` - Blue-50

#### Greens
- `#15803d` - Green-700
- `#16a34a` - Green-600
- `#22c55e` - Green-500
- `#4ade80` - Green-400

#### Reds
- `#991b1b` - Red-800
- `#dc2626` - Red-600
- `#ef4444` - Red-500
- `#f87171` - Red-400

#### Grays (Slate)
- `#0f172a` - Slate-900
- `#1e293b` - Slate-800
- `#334155` - Slate-700
- `#475569` - Slate-600
- `#64748b` - Slate-500
- `#94a3b8` - Slate-400
- `#cbd5e1` - Slate-300
- `#e2e8f0` - Slate-200
- `#f1f5f9` - Slate-100
- `#f8fafc` - Slate-50
- `#ffffff` - White

## Dark Mode Support

The application automatically detects the system's dark mode preference. To force dark mode, add the `dark` class to the `html` element:

```html
<!-- In __root.tsx or your main layout -->
<html className="dark">
  ...
</html>
```

## Components Using CSS Variables

The following components use CSS variables for styling:

- **Sidebar** - `sidebar.tsx`
- **Page Header** - `page-header.tsx`
- **Dashboard Stats** - `dashboard-stats.tsx`
- **Recent Activity** - `recent-activity.tsx`
- **Upcoming Events** - `upcoming-events.tsx`

## Best Practices

1. **Consistency** - Ensure primary color shades are used consistently
2. **Contrast** - Maintain good contrast ratios for accessibility (WCAG AA)
3. **Testing** - Test both light and dark modes after color changes
4. **Gradual Update** - Update all related colors at once (primary, sidebar, etc.)

## Updating Component Colors

To apply theme changes to custom components, use inline styles with CSS variables:

```tsx
<div
  style={{
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    borderColor: 'var(--color-border)',
  }}
>
  Themed Component
</div>
```

Or use Tailwind's color utility classes:

```tsx
<div className="bg-white text-slate-900 border border-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:border-slate-700">
  Themed Component
</div>
```
