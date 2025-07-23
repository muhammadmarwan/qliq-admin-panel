'use client';

import React, { useEffect, useState, useCallback } from 'react';
import UserNode from '@/components/UserNode';
import { getMlmTree } from '@/api/users';
import { FaUsersSlash } from 'react-icons/fa';
import socket from '@/lib/socket'; 

interface User {
  _id: string;
  name: string;
  email?: string;
  level: number;
  downlines: User[];
}

function NoUsersFound() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md max-w-md mx-auto mt-20">
      <FaUsersSlash className="text-gray-400 text-6xl mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">No Users Found</h2>
      <p className="text-gray-500 text-center">
        Sorry, there are no users available in the MLM tree at the moment.
      </p>
    </div>
  );
}

export default function UsersPage() {
  const [rootUsers, setRootUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTree = useCallback(async () => {
    try {
      const data = await getMlmTree();
      setRootUsers(data as any);
    } catch (error) {
      console.error('Failed to fetch user tree', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTree();
    socket.on('userTreeUpdated', fetchTree);

    return () => {
      socket.off('userTreeUpdated', fetchTree);
    };
  }, [fetchTree]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (rootUsers.length === 0) return <NoUsersFound />;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">MLM User Tree</h1>
      <div className="space-y-4">
        {rootUsers.map((user) => (
          <UserNode key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
