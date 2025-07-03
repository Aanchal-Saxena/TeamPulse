# Team Pulse Dashboard

A productivity monitoring tool for internal teams built with React, Redux Toolkit, and TypeScript.

## Features

### Team Lead View
- Monitor team member statuses (Working, Break, Meeting, Offline)
- View status distribution with pie chart visualization
- Assign tasks to team members with due dates
- Filter members by status and sort by active tasks
- Summary dashboard with status counts

### Team Member View
- Update personal status with one-click buttons
- View assigned tasks with progress tracking
- Increment/decrement task progress in 10% steps
- Visual progress bars for each task
- Automatic task completion at 100% progress

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Custom CSS with responsive design
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite
- **API**: Random User API for demo data

## Project Structure

```
src/
├── components/              # Organized UI components
│   ├── layout/             # Layout components
│   │   ├── Header.tsx      # Navigation with role switching
│   │   └── Sidebar.tsx     # Navigation sidebar
│   ├── members/            # Member-related components
│   │   ├── MemberCard.tsx  # Team member display card
│   │   ├── StatusSelector.tsx # Status update buttons
│   │   ├── StatusSummary.tsx  # Team status overview
│   │   └── UserStats.tsx   # Individual user statistics
│   ├── tasks/              # Task management components
│   │   ├── TaskForm.tsx    # Task assignment form
│   │   └── TaskList.tsx    # Member task management
│   ├── charts/             # Data visualization components
│   │   ├── ChartView.tsx   # Main chart component
│   │   └── CustomLegend.tsx # Chart legend
│   ├── ui/                 # Reusable UI elements
│   │   ├── SearchBar.tsx   # Search input component
│   │   ├── ThemeToggle.tsx # Dark/light mode toggle
│   │   ├── Toast.tsx       # Notification component
│   │   └── StatusBadge.tsx # Status display badge
│   └── index.ts            # Main components export
├── constants/              # App-wide constants
│   ├── appConstants.ts     # Configuration values
│   ├── enums.ts           # TypeScript enums
│   ├── dummyData.ts       # Sample user data
│   └── statusColors.ts    # Status color mappings
├── pages/
│   └── Dashboard.tsx       # Main dashboard with role-based views
├── redux/
│   ├── slices/            # Redux Toolkit slices
│   │   ├── membersSlice.ts # Team members state
│   │   ├── roleSlice.ts    # User role state
│   │   └── themeSlice.ts   # Theme state
│   └── store.ts           # Redux store configuration
├── services/
│   └── api.ts             # API service functions
├── styles/                # Global styles
│   ├── variables.css      # CSS custom properties
│   ├── dark-mode.css      # Dark theme styles
│   └── card-headers.css   # Shared card styles
├── types/
│   └── index.ts           # TypeScript interfaces
└── utils/
    ├── index.ts           # Common utility functions
    ├── localStorage.ts    # Local storage utilities
    └── searchUtils.ts     # Search functionality
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TeamPulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Usage

1. **Role Switching**: Use the toggle button in the top-right corner to switch between Team Lead and Team Member views.

2. **Team Lead Features**:
   - View team status overview with counts and pie chart
   - Filter team members by status using the dropdown
   - Sort members by number of active tasks using the checkbox
   - Assign new tasks using the task form on the right

3. **Team Member Features**:
   - Update your status using the four status buttons
   - View your assigned tasks with progress bars
   - Use +10% and -10% buttons to update task progress
   - Tasks automatically complete at 100% progress

## Component Organization

Components are organized into logical folders for better maintainability:

- **layout/**: Core layout components (Header, Sidebar)
- **members/**: Member management and display components
- **tasks/**: Task creation and management components  
- **charts/**: Data visualization components
- **ui/**: Reusable UI elements and controls

Each folder includes an `index.ts` file for clean imports:
```typescript
import { Header, MemberCard, TaskForm } from '../components';
```

## Key Features

- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: All changes reflect immediately across the app
- **Type Safety**: Full TypeScript implementation
- **Modular Architecture**: Clean separation of concerns with organized components
- **Performance Optimized**: Minimal re-renders with Redux Toolkit and React.memo
- **Theme Support**: Light and dark mode with CSS custom properties

## Demo Data

The app uses the Random User API (https://randomuser.me/) to generate sample team member data on first load. This provides realistic names, emails, and avatars for demonstration purposes.

## Development Notes

### User Switching (Development)
For testing different user perspectives, use browser console:
```javascript
// Switch to Aanchal Saxena
window.store.dispatch({ type: "role/setUser", payload: "Aanchal Saxena"});

// Switch to John Smith  
window.store.dispatch({ type: "role/setUser", payload: "John Smith"});
```

### Code Quality Features
- **Memoized Components**: React.memo prevents unnecessary re-renders
- **Optimized Selectors**: useMemo for expensive calculations
- **Reusable Utilities**: Shared functions for common operations
- **Type Safety**: Comprehensive TypeScript coverage
- **Clean Architecture**: Organized folder structure with clear separation

## Future Enhancements

- Task filtering and search
- Due date notifications
- Team performance analytics
- Export functionality
- Real-time collaboration features
- Advanced user management