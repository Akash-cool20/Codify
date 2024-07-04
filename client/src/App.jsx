import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice";
import AllRoutes from "./AllRoutes";

function App() {
  const { data, isError, error, isLoading } = useGetUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    } else if (isError) {
      // Handle specific error cases if needed
      // console.error("Error fetching user details:", error);
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }
  }, [data, isError,error, dispatch]);

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        {isLoading ? (
          <p>Loading user details...</p>
        ) : (
          <AllRoutes />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
