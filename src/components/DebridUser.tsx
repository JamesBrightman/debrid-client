"use client";

import { useDebridUser } from "@/hooks/useDebridUser";

export const DebridUser: React.FC = () => {
  const { data, isLoading, error } = useDebridUser();

  if (isLoading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Debrid User</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};