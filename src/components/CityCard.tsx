import CardContent from "@mui/material/CardContent";
import { cityType } from "../entities/types";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

export default function CityCard(props: {
  city: cityType;
  deleteCity: (data: number) => void;
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.city.size} in {props.city.region}
        </Typography>
        <Typography variant="h5" component="div">
          {props.city.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Population - {props.city.population}
        </Typography>
        <Typography variant="body2">{props.city.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.deleteCity(props.city.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
