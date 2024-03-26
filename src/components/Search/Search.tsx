import { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import { ISearchParams, useSearch } from "./useSearch";
// import { useDebounce } from "../../utils/useDebounce";
import { ISearchResult, ISearchResultCollection } from "./triggerSearch";
import { SearchCard } from "./SearchCard";
import { SearchCardSkeleton } from "./SearchCardSkeleton";
import { SearchCardGrid } from "./SearchCardGrid";
import { Box, FormHelperText, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchFormSchema } from "./searchFormSchema";
import styled from "@emotion/styled";

export const testId = "Search";

export const Search = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    search: "",
  });
  // const debouncedSearch = useDebounce(async (value: string) => {
  //   setSearchParams((prevState) => ({
  //     ...prevState,
  //     search: value,
  //   }));
  // });
  const { data, isLoading } = useSearch(searchParams, {
    enabled: !!searchParams.search,
  });
  const { collection, reason } = data || ({} as ISearchResult);
  const { items } = collection || ({} as ISearchResultCollection);

  //for search at onChange
  // const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   debouncedSearch(event.target.value);
  // };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchFormSchema),
  });

  const noSearch =
    searchParams.search && items && items.length === 0 ? (
      <p>
        No results found! Please insert more characters or change query search.
      </p>
    ) : (
      "Search results page"
    );

  const onSubmit = (data: ISearchParams) => {
    setSearchParams((prevState) => ({
      ...prevState,
      search: data.search,
      yearStart: data.yearStart,
      yearEnd: data.yearEnd,
    }));
  };

  const BoxSection = styled(Box)`
    @media (min-width: 768px) {
      width: 650px;
      margin: auto;
    }
  `;

  return (
    <Container data-testid={testId}>
      <BoxSection component="section">
        <h1>Search Page</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box p={1}>
            <InputLabel htmlFor="search">Search*</InputLabel>
            <Input
              {...register("search")}
              name="search"
              placeholder="Start typing..."
              // onChange={handleSearchOnChange}
              required
              error={!!errors.search}
              style={{ width: "100%" }}
            />
            {errors.search ? (
              <FormHelperText error={!!errors.search}>
                {errors.search.message}
              </FormHelperText>
            ) : null}
          </Box>
          <Box p={1}>
            <InputLabel htmlFor="yearStart">Start year</InputLabel>
            <Input
              {...register("yearStart")}
              name="yearStart"
              placeholder="Start year"
              inputProps={{ maxLength: 4 }}
              style={{ width: "100%" }}
            />
            {errors.yearStart ? (
              <FormHelperText error={!!errors.search}>
                {errors.yearStart.message}
              </FormHelperText>
            ) : null}
          </Box>
          <Box p={1}>
            <InputLabel htmlFor="yearStart">End year</InputLabel>
            <Input
              {...register("yearEnd")}
              name="yearEnd"
              placeholder="End year"
              inputProps={{ maxLength: 4 }}
              style={{ width: "100%" }}
            />
            {errors.yearEnd ? (
              <FormHelperText error={!!errors.search}>
                {errors.yearEnd.message}
              </FormHelperText>
            ) : null}
          </Box>
          <Box p={1}>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Box>
        </form>
      </BoxSection>
      {isLoading ? (
        <SearchCardGrid>
          {Array.from(Array(10).keys()).map((n) => (
            <Grid item xs={6} sm={4} md={4} key={n}>
              <SearchCardSkeleton />
            </Grid>
          ))}
        </SearchCardGrid>
      ) : items && items.length ? (
        <SearchCardGrid>
          {items.map((item) => {
            return (
              <Grid item xs={6} sm={4} md={4} key={item.href}>
                <SearchCard item={item} />
              </Grid>
            );
          })}
        </SearchCardGrid>
      ) : (
        <p style={{ textAlign: "center" }}>{noSearch}</p>
      )}
      <Snackbar open={!!reason} autoHideDuration={3000} message={reason} />
    </Container>
  );
};
