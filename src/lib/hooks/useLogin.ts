import { useEffect } from 'react';
import useSWR from 'swr';
import type { Response } from '../api/response';
import { useUserStore } from '../store/user';
import { isAdministrator } from '../role';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

export default function useLogin(administratorOnly: boolean = false) {
  const navigate = useNavigate();
  const { data, error, isLoading, mutate } = useSWR<Response['/api/user']>('/api/user', {
    fallbackData: { user: undefined },
  });

  const [user, setUser] = useUserStore(useShallow((state) => [state.user, state.setUser]));

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    } else if (error) {
      navigate('/auth/login');
    }
  }, [data, error]);

  useEffect(() => {
    if (user && administratorOnly && !isAdministrator(user.role)) {
      navigate('/dashboard');
    }
  }, [user]);

  return { user, loading: isLoading || !user, mutate };
}
