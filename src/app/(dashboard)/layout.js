import Header from "@/app/components/header/Header";

export const metadata = {
  title: "Dashboard",
  description: "Welcome to the dashboard",
};

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
