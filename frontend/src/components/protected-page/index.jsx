import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import Loader from "../loader";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <Loader />;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children;
};

export default ProtectedRoute;
