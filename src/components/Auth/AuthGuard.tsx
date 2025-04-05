import { useEffect } from "react";
import { useUser } from "@/components/Context/UserContext";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, userLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/");
    }
  }, [user, router, userLoading]);

  if (user) {
    return <>{children}</>;
  }
};

export default AuthGuard;
