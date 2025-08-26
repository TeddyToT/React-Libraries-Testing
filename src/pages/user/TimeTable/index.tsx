import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { styled } from "@mui/material";

const HeadCell = styled(TableCell)({
  textAlign: "center",
  backgroundColor: "gray",
  border: "1px solid",
});
const daysOfWeek = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

const times = [
  {
    classcPeriod: 1,
    time: "7:30 - 8:15",
  },
  { classcPeriod: 2, time: "8:15 - 9:00" },
  { classcPeriod: 3, time: "9:00 - 9:45" },
  { classcPeriod: 4, time: "10:00 - 10:45" },
  { classcPeriod: 5, time: "10:45 - 11:30" },
  { classcPeriod: 6, time: "13:00 - 13:45" },
  { classcPeriod: 7, time: "13:45 - 14:30" },
  { classcPeriod: 8, time: "14:30 - 15:15" },
  { classcPeriod: 9, time: "15:30 - 16:15" },
  { classcPeriod: 10, time: "16:15 - 17:00" },
];

const CustomCell = styled(TableCell)({
  textAlign: "center",
});
type ScheduleItem = {
  date: string;
  schedule: {
    period: string;
    time: string;
    subject: string;
  }[];
};

export default function SchedulePage() {
  const data = useLoaderData() as { message: string; data: ScheduleItem[] };
  const schedule = data.data as ScheduleItem[];
  const [page, setPage] = useState(0);
  const [thisMonday, setThisMonday] = useState(Number);

  const getTime = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const day = today.getDay();

    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);

    setThisMonday(monday.getTime());
  };

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    console.log("thisMonday updated:", new Date(thisMonday));
  }, [thisMonday]);

  const handleChangePage = (_: unknown, newPage: number) => {
    if (newPage > page) {
      setThisMonday((prev) => prev + 7 * 24 * 60 * 60 * 1000);
    } else {
      setThisMonday((prev) => prev - 7 * 24 * 60 * 60 * 1000);
    }
    setPage(newPage);
  };

  return (
    <div className="p-6 text-center">
      <Typography variant="h5" gutterBottom>
        Thời khóa biểu trong tuần
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <HeadCell>Tiết/Thứ</HeadCell>
              {daysOfWeek.map((day, index) => {
                const day2 = new Date(thisMonday + index * 24 * 60 * 60 * 1000);
                let date = day2.getDate();
                if (date < 10) {
                  date = "0" + date;
                }
                let month = day2.getMonth();
                if (month + 1 < 10) {
                  month = "0" + (month + 1);
                } else {
                  month = month + 1;
                }
                const year = day2.getFullYear();
                const dayRender =
                  "(" + date + "/" + month + "/" + day2.getFullYear() + ")";

                return (
                  <HeadCell>
                    <p>{day}</p>
                    <p>{dayRender}</p>
                  </HeadCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {times.map((t) => (
              <TableRow key={t.classcPeriod}>
                <CustomCell>
                  <p>Tiết {t.classcPeriod}</p>
                  <p>{t.time}</p>
                </CustomCell>
                {daysOfWeek.map((day, index) => {
                  const day2 = new Date(
                    thisMonday + index * 24 * 60 * 60 * 1000
                  );
                  let date = day2.getDate();
                  if (date < 10) {
                    date = "0" + date;
                  }
                  let month = day2.getMonth();
                  if (month + 1 < 10) {
                    month = "0" + (month + 1);
                  } else {
                    month = month + 1;
                  }
                  const dayRender =
                    date + "/" + month + "/" + day2.getFullYear();
                  const daySchedule = schedule.find(
                    (d) => d.date == dayRender
                  );
                  const subject = daySchedule?.schedule.find(
                    (s) => s.period == `Tiết ${t.classcPeriod}`
                  )?.subject;
                  return <CustomCell key={index}>{subject || "-"}</CustomCell>;
                })}
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10]}
                count={schedule.length}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
