import { ReactNode } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

export const customRender = (ui: ReactNode, renderOptions?: RenderOptions) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>,
    renderOptions
  );
};
