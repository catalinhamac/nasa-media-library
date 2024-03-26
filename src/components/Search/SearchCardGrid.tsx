import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface ISearchCardGridProps {
  children: ReactNode;
}

export const SearchCardGrid = ({ children }: ISearchCardGridProps) => {
  return (
    <Box p={2}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {children}
      </Grid>
    </Box>
  );
};
