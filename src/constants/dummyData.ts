import { Member } from '../types';
import { MemberStatus } from './enums';

export const DUMMY_MEMBER: Member = {
  id: 'aanchal-001',
  name: 'Aanchal Saxena',
  email: 'aanchal.saxena@company.com',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  status: MemberStatus.WORKING,
  tasks: []
};

export const DUMMY_MEMBER_2: Member = {
  id: 'john-002',
  name: 'John Smith',
  email: 'john.smith@company.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  status: MemberStatus.BREAK,
  tasks: []
};