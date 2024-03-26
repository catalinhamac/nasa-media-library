import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import { Search } from "../Search/Search";
import { Show } from "../Show/Show";
import { ROUTES } from "../routes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={ROUTES.SEARCH} />} />
      <Route path={ROUTES.SEARCH} element={<Search />}></Route>
      <Route path={`${ROUTES.SEARCH}/:id`} element={<Show />} />
    </Routes>
  );
};
