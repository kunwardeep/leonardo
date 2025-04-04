"use client";

import AuthGuard from "@/components/Auth/AuthGuard";
import useGetCharacters from "@/hooks/useGetCharacters";

const DisplayCharacters = () => {
  return (
    <AuthGuard>
      <DisplayCharactersComponent />
    </AuthGuard>
  );
};

const DisplayCharactersComponent = () => {
  const { loading, data, error } = useGetCharacters({ page: 1 });

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  if (data) {
    return <div>Data - {JSON.stringify(data)}</div>;
  }
};

export default DisplayCharacters;
