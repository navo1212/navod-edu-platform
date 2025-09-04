import { useEffect } from 'react';
import { getToken, removeToken } from '../utils/auth';
import { useRouter } from 'next/router';

export default function UserPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/');
    } else {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'user') {
        router.push('/');
      }
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
