// src/test/test-utils.tsx
import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  mantineProviderProps?: any;
}

const customRender = (
  ui: React.ReactElement,
  {
    mantineProviderProps,
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <MantineProvider {...mantineProviderProps}>{children}</MantineProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { customRender as render };