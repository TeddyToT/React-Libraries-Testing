import { useLoaderData } from "react-router-dom";
import type { CoffeeRevunue } from "../../../types/types";
import WeeklyRevenue from "../../../components/Dashboard/Chart/WeeklyRevenue";
import "react-datepicker/dist/react-datepicker.css";


export default function Dashboard() {
  const data = useLoaderData() as { message: string; data: CoffeeRevunue };
  const revenue = data.data as CoffeeRevunue;


  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="w-1/2">
      <WeeklyRevenue data={revenue}/>
      </div>
    </div>
  );
}
