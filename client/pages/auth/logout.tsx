import { useUserStore } from '@/lib/store/user';
import { LoadingOverlay } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { mutate } from 'swr';

export default function Logout() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    (async () => {
      const userRes = await fetch('/api/user');

      if (userRes.ok) {
        const res = await fetch('/api/auth/logout');

        if (res.ok) {
          setUser(null);
          mutate('/api/user', null);
          navigate('/auth/login');
        }
      } else {
        navigate('/dashboard');
      }
    })();
  }, []);

  return <LoadingOverlay visible />;
}
