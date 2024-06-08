import User from '@/models/User';

interface UserState {
  current: User | null;
}

export interface RootState {
  user: UserState;
}
