import { useLoaderData } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

export default function LoginPage() {
  const data = useLoaderData() as { message: string }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
        <h2 className="text-xl text-red-600 font-bold mb-4">{data.message}</h2>

        <Card sx={{ maxWidth: 400, mt: 3 }}>
          <CardHeader title="UI/UX Review Check" />
          <CardMedia
            component="img"
            height="200"
            image="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80"
            alt="card-image"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to "Naviglio" where you can enjoy the main night life in
              Barcelona.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Read More
            </Button>
          </CardActions>
        </Card>
    </div>
  );
}
