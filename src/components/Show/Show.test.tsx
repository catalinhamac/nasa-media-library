import { screen } from "@testing-library/react";
import { Show, testId } from "./Show";
import { customRender } from "../../utils/customRender";

test("renders Search component", () => {
  customRender(<Show />);
  const component = screen.getByTestId(testId);
  expect(component).toBeInTheDocument();
});
