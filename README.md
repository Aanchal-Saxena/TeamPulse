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
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation with role switching
│   ├── MemberCard.tsx  # Team member display card
│   ├── TaskForm.tsx    # Task assignment form
│   ├── TaskList.tsx    # Member task management
│   └── StatusSelector.tsx # Status update buttons
├── constants/          # App-wide constants
│   ├── appConstants.ts # Configuration values
│   └── enums.ts       # TypeScript enums
├── pages/
│   └── Dashboard.tsx   # Main dashboard with role-based views
├── redux/
│   ├── slices/        # Redux Toolkit slices
│   │   ├── membersSlice.ts # Team members state
│   │   └── roleSlice.ts    # User role state
│   └── store.ts       # Redux store configuration
├── services/
│   └── api.ts         # API service functions
├── types/
│   └── index.ts       # TypeScript interfaces
└── utils/
    └── index.ts       # Common utility functions
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

## Key Features

- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: All changes reflect immediately across the app
- **Type Safety**: Full TypeScript implementation
- **Modular Architecture**: Clean separation of concerns
- **Performance Optimized**: Minimal re-renders with Redux Toolkit

## Demo Data

The app uses the Random User API (https://randomuser.me/) to generate sample team member data on first load. This provides realistic names, emails, and avatars for demonstration purposes.

## Future Enhancements

- Dark mode toggle
- Task filtering and search
- Due date notifications
- Team performance analytics
- Export functionality
- Real-time collaboration features