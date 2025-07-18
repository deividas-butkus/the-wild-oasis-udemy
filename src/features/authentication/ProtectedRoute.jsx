import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";
import Spinner from "../../ui/Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO the authenticated user, redirect to the login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
