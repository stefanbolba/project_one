"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { OrganizationProvider } from "@/app/providers/OrganizationProvider";
import ErrorBoundary from "@/app/components/errorBoundary/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      retry: false,
    },
  },
});

// Remove the organization provider since we can get the org id from the userId -> agent -> orgId
const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ErrorBoundary> */}
      <AuthProvider>
        <OrganizationProvider>{children}</OrganizationProvider>
      </AuthProvider>
      {/* </ErrorBoundary> */}
    </QueryClientProvider>
  );
};

export default Providers;
