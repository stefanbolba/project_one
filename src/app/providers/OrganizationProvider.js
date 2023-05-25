import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import organizationStatuses from "@/contants/organizationStatuses";
import { useAuth } from "./AuthProvider";

const OrganizationContext = createContext();

const OrganizationProvider = ({ children }) => {
  const [organization, setOrganization] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useQuery(["organization"], () => axios.get(`${process.env.FUNCTIONS}/organization`).then((res) => res.data), {
    enabled: !!user && !localStorage.getItem("organization"),
    onSuccess: (data) => {
      localStorage.setItem("organization", JSON.stringify(data));
      setIsLoading(false);
    },
    onError: (error) => {
      console.log("error getting organization", error);
    },
  });

  useEffect(() => {
    const org = JSON.parse(localStorage.getItem("organization"));
    if (org) {
      setOrganization(org);
      setIsLoading(false);
    }
  }, []);

  const state = {
    organization,
    isLoading,
  };

  return <OrganizationContext.Provider value={state}>{children}</OrganizationContext.Provider>;
};

const RequireOrganization = ({ children }) => {
  const org = useOrganization();
  const router = useRouter();

  if (org.isLoading) return <div>Loading...</div>;
  if (!org.organization) router.push("/create");
  if (org.status === organizationStatuses.BLOCKED) router.push("/organization/blocked");

  return children;
};

export default RequireOrganization;

const useOrganization = () => useContext(OrganizationContext);

export { OrganizationProvider, useOrganization, RequireOrganization };
