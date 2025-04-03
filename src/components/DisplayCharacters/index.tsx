"use client";

import AuthGuard from "@/components/auth/AuthGuard";

const DisplayCharacters = () => {
  return (
    <AuthGuard>
      <Information />
    </AuthGuard>
  );
};

const Information = () => {
  console.log("Information");
  return <div>DisplayCharacters</div>;
};
export default DisplayCharacters;
