import { API_ENDPOINTS } from '../constants';

export const fetchRandomUsers = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.RANDOM_USERS);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
};