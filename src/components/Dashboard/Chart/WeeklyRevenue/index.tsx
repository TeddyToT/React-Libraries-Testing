import moment from "moment";
import { useState } from "react";
import DatePicker from "react-datepicker";
import type { CoffeeRevunue } from "../../../../types/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyRevenueProps{
    data: CoffeeRevunue
}
const WeeklyRevenue = ({data}:WeeklyRevenueProps) =>{

      const [selectedDate, setSelectedDate] = useState<Date | null>(new Date("2024-03-01"));

  const startDate = moment(selectedDate).startOf("week");
  const endDate = moment(selectedDate).endOf("week");

  const filtered = data.filter((item) => {
    const dateMoment = moment(item.date, "DD/MM/YYYY");
    return dateMoment.isBetween(startDate, endDate, "day", "[]");
  });

  const revenueByDate: { [key: string]: number } = {};
  filtered.forEach((item) => {
    const date = moment(item.date, "DD/MM/YYYY").format("DD/MM/YYYY");
    const money = parseFloat(item.money.replace(/[^\d.-]/g, ""));
    revenueByDate[date] = (revenueByDate[date] || 0) + money;
  });

  const labels = Object.keys(revenueByDate).sort(
    (a, b) => moment(a).valueOf() - moment(b).valueOf()
  );

  console.log(revenueByDate);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue by Date",
        data: labels.map((d) => revenueByDate[d]),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: `Coffee Revenue (${startDate.format(
          "DD/MM/YYYY"
        )} - ${endDate.format("DD/MM/YYYY")})`,
      },
    },
  };

  return(
    <div className="w-full">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="border p-2 rounded bg-red-500"
          />
          <p className="mt-2 text-sm text-gray-600">
            Tuần: {startDate.format("DD/MM/YYYY")} - {endDate.format("DD/MM/YYYY")}
          </p>
        <Bar options={options} data={chartData} />
    </div>
  )

}

export default WeeklyRevenue