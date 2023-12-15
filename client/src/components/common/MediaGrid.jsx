import { Grid } from "@mui/material";
import MediaItem from "./MediaItem";

const MediaGrid = ({ medias, mediaTypes }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
      {medias.map((media, index) => (
        <Grid item xs={6} md={3} key={index}>
          <MediaItem media={media} mediaType={mediaTypes} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;
