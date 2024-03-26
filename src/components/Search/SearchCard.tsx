import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ISearchResultCollectionItem } from "./triggerSearch";
import { IconButton } from "@mui/material";
import { ROUTES } from "../routes";

interface ISearchCardProps {
  item: ISearchResultCollectionItem;
}

export const SearchCard = ({ item }: ISearchCardProps) => {
  const { data, links } = item;
  const { title, location, nasa_id } = data[0];
  const { href } = links[0];

  const navigate = useNavigate();
  const handleGoShow = () => {
    navigate(`${ROUTES.SEARCH}/${nasa_id}`);
  };

  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={href} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginBottom: "10px", fontWeight: 700 }}
        >
          {`Location: ${location ? location : "Location missing"}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleGoShow}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};
