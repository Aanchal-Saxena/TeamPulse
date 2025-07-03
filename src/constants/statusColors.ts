// Centralized status color configuration
export const STATUS_COLORS = {
  Working: '#10b981',
  Break: '#f59e0b', 
  Meeting: '#8b5cf6',
  Offline: '#ef4444'
} as const;

export const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.Offline;
};