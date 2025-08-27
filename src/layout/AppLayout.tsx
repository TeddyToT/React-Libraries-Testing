import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import useRole from "../hooks/useRole";
const LayoutContent: React.FC = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col ">
      <div className="w-11/12 mx-auto min-h-screen">
        <Outlet />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            useRole.clearRole();
            navigate("/login")
          }}
          className="p-5 text-lg bg-red-500 hover:bg-blue-400 cursor-pointer"
        >
          Clear Role Status
        </button>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return <LayoutContent />;
};

export default AppLayout;
