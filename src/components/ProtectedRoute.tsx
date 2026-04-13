import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [hasUsername, setHasUsername] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async (session: any) => {
      setIsAuthenticated(!!session);
      setUser(session?.user || null);

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .maybeSingle();

        setHasUsername(!!profile?.username);
      } else {
        setHasUsername(null);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAuth(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAuth(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show nothing while checking
  if (isAuthenticated === null || (isAuthenticated && hasUsername === null)) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user && !user.email_confirmed_at) {
    return <Navigate to="/verify-email" replace />;
  }

  // Redirect to username setup if no username (avoid loop on setup page)
  if (!hasUsername && location.pathname !== "/setup-username") {
    return <Navigate to="/setup-username" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
