# Components Structure

## Organization
- **layout/**: Header, Sidebar - App layout components
- **ui/**: SearchBar, ThemeToggle, Toast, StatusBadge - Reusable UI elements  
- **charts/**: ChartView, CustomLegend - Data visualization components
- **tasks/**: TaskForm, TaskList - Task management components
- **members/**: MemberCard, StatusSelector, StatusSummary, UserStats - Member-related components

## Usage
Import components from the main index:
```typescript
import { Header, Sidebar, TaskForm, MemberCard } from '../components';
```

## Benefits
- Clear separation of concerns
- Easy to locate components
- Cleaner imports
- Better maintainability