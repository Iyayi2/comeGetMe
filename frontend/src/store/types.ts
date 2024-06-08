import User from '@/models/User';

interface UserState {
  loggedIn: User | null;
}

export interface RootState {
  user: UserState;
}
