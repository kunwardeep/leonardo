import Chrome from "@/components/Chrome";
import { UserProvider } from "@/components/Context/UserContext";
import Header from "@/components/Header";

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <UserProvider>
      <Chrome>
        <Header isLoggedIn />
        {children}
      </Chrome>
    </UserProvider>
  );
}
