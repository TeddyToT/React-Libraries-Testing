import { Outlet, useNavigation } from "react-router-dom";
import LoadingSpinner from "../components/loader/LoadingSpinner";

function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && <LoadingSpinner />}
      <Outlet />
    </>
  );
}

export default RootLayout;
