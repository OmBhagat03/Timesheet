import React from 'react';

const StatusBadge = ({ status }: { status: string }) => {
  const colorMap: Record<string, string> = {
    COMPLETED: 'bg-green-200 text-green-800',
    INCOMPLETE: 'bg-yellow-200 text-yellow-800',
    MISSING: 'bg-pink-200 text-pink-800',
  };
  return (
    <span className={`px-2 py-1 rounded text-sm ${colorMap[status] || ''}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
