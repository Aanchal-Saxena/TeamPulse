import { Member } from '../types';

// Search members by name, email, or status
export const searchMembers = (members: Member[], searchTerm: string): Member[] => {
  const trimmedTerm = searchTerm.trim();
  if (!trimmedTerm) return members;
  
  const term = trimmedTerm.toLowerCase();
  return members.filter(member => {
    const name = member.name.toLowerCase();
    const email = member.email.toLowerCase();
    const status = member.status.toLowerCase();
    
    return name.includes(term) || email.includes(term) || status.includes(term);
  });
};