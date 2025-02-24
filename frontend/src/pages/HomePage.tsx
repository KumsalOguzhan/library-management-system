import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/users/getAllUsers';

interface User {
  id: number;
  name: string;
  email: string;
}

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getAllUsers();
        if (res.users && res.users.length > 0) {
          setUsers(res.users);
        }
      } catch (err: any) {
        setError(err.message || 'Kullanıcılar alınırken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Kütüphane Üyeleri</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
