"use client";

import Header from "@/app/components/header/Header";
import { RequireOrganization } from "@/app/providers/OrganizationProvider";
import { withAuth } from "@/app/providers/AuthProvider";

export const metadata = {
  title: "Dashboard",
  description: "Welcome to the dashboard",
};

function Layout({ children }) {
  return (
    <html lang='en'>
      <head />
      <RequireOrganization>
        <body>
          <Header />
          {children}
        </body>
      </RequireOrganization>
    </html>
  );
}

export default withAuth(Layout);
