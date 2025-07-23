'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Users } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email?: string;
  level: number;
  downlines: User[];
  commissionBalance?: number;
}

interface UserNodeProps {
  user: User;
  level?: number;
}

const levelStyles = [
  'bg-blue-100 text-blue-900 text-base',
  'bg-green-100 text-green-900 text-sm',
  'bg-yellow-100 text-yellow-900 text-xs',
  'bg-pink-100 text-pink-900 text-xs',
  'bg-purple-100 text-purple-900 text-xs',
];

export default function UserNode({ user, level = 0 }: UserNodeProps) {
  const style = levelStyles[level] || 'bg-gray-100 text-gray-900 text-xs';

  return (
    <div className="ml-4 border-l border-gray-300 pl-4 relative">
      <Card className={`mb-2 shadow-md ${style}`}>
        <CardContent className="py-2 flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">
              {level === 0 ? '' : `Level ${level}`}
            </div>
            {user.email && (
              <div className="text-xs text-muted-foreground">
                {user.email}
              </div>
            )}
            {user?.commissionBalance != 0 && user?.commissionBalance != null && (
              <div className="text-xs pt-3 text-muted-foreground">
                Commission Balance: {user?.commissionBalance}$
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {user.downlines?.length > 0 && (
        <div className="ml-4">
          <Separator className="my-2" />
          {user.downlines.map((downline) => (
            <UserNode key={downline._id} user={downline} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
