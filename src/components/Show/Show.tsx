import {
  Box,
  Button,
  Chip,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../routes";
import { useImagesCollection, useSearch } from "../Search/useSearch";
import {
  ISearchResult,
  ISearchResultCollection,
} from "../Search/triggerSearch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { format } from "date-fns";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Show.css";

export const testId = "Show";

export const Show = () => {
  const navigate = useNavigate();
  const handleGoShow = () => {
    navigate(`${ROUTES.SEARCH}`);
  };
  const { id } = useParams<{ id: string }>();

  const { data: imagesData } = useImagesCollection(id as string);
  const { data: searchData } = useSearch({ nasaId: id });
  const { collection, reason } = searchData || ({} as ISearchResult);
  const { items } = collection || ({} as ISearchResultCollection);
  const { data: collectionData } = items?.[0];
  const {
    title,
    location,
    description,
    keywords,
    date_created: dateCreated,
  } = collectionData[0];

  return (
    <Container data-testid={testId}>
      <Box pt={2} pb={2}>
        <Button variant="contained" onClick={handleGoShow}>
          Back to search
        </Button>
      </Box>
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
      <Typography
        variant="body2"
        color="text.secondary"
        style={{ marginBottom: "10px" }}
      >
        {description}
      </Typography>
      {keywords && keywords.length ? (
        <Box mb={1}>
          <Typography gutterBottom variant="h6" component="div">
            Keywords
          </Typography>
          {keywords.map((key) => (
            <Box
              key={key}
              p={0.5}
              component="span"
              style={{ display: "inline-block" }}
            >
              <Chip label={key} size="small" variant="outlined" />
            </Box>
          ))}
        </Box>
      ) : null}
      {dateCreated ? (
        <>
          <Typography gutterBottom variant="h6" component="div">
            Date
          </Typography>
          <p>{format(new Date(dateCreated), "do MMMM yyyy")}</p>
        </>
      ) : null}
      <Typography gutterBottom variant="h6" component="div">
        Latest Images
      </Typography>
      {imagesData && imagesData.length ? (
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {imagesData.map((src, index) => {
            return (
              <SwiperSlide key={`packshotslide-${index}`}>
                <img
                  srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${src}?w=248&fit=crop&auto=format`}
                  alt={title}
                  loading="lazy"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
      <Snackbar open={!!reason} autoHideDuration={3000} message={reason} />
    </Container>
  );
};
