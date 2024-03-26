import { screen } from "@testing-library/react";
import { Search, testId } from "./Search";
import { customRender } from "../../utils/customRender";

test("renders Search component", () => {
  customRender(<Search />);
  const component = screen.getByTestId(testId);
  expect(component).toBeInTheDocument();
});
