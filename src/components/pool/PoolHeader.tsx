import React from 'react';

interface PoolHeaderProps {
  name: string;
  description: string;
}

export const PoolHeader = ({ name, description }: PoolHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2">{name}</h1>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );
};