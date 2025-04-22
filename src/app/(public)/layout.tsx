import Chrome from "@/components/Chrome";
import Header from "@/components/Header";

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Chrome>
      <Header isLoggedIn={false} />
      {children}
    </Chrome>
  );
}
