// Task management constants
export const TASK_PROGRESS_STEP = 10;
export const TASK_PROGRESS_MAX = 100;
export const TASK_PROGRESS_MIN = 0;

// UI Messages
export const MESSAGES = {
  TASK_ASSIGNED: 'Task assigned successfully!',
  NO_TASKS: 'No tasks assigned',
  NO_TASKS_FOUND: 'No tasks found',
  NO_RESULTS: 'No members found matching your search criteria.'
} as const;

// App Configuration
export const APP_CONFIG = {
  TEAM_SIZE_THRESHOLD: 2, // Minimum members before loading API data
  PERCENTAGE_MULTIPLIER: 100
} as const;

// API Configuration
export const API_ENDPOINTS = {
  RANDOM_USERS: 'https://randomuser.me/api/?results=6'
} as const;