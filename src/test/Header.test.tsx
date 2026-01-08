import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test-utils";
import Header from "../../src/components/header/Header";

vi.mock("../../assets/userIcon", () => ({
  default: () => <div data-testid="mock-user-icon" />,
}));

describe("Компонент Header", () => {
  it("отображает заголовок '.FrontEnd'", () => {
    render(<Header />);

    expect(screen.getByText(".FrontEnd")).toBeInTheDocument();
  });

  it("отображает ссылку 'Вакансии FE'", () => {
    render(<Header />);

    expect(screen.getByText("Вакансии FE")).toBeInTheDocument();
  });

  it("отображает текст 'Обо мне'", () => {
    render(<Header />);

    expect(screen.getByText("Обо мне")).toBeInTheDocument();
  });

  it("отображает иконку пользователя (UserIcon)", () => {
    render(<Header />);

    expect(screen.getByTestId("mock-user-icon")).toBeInTheDocument();
  });
});