import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "../test-utils"; // Используем наш кастомный render
import SelectCities from "../components/selectCities/SelectCities";
import userEvent from "@testing-library/user-event";

// 1. Мокаем иконку
vi.mock("../../assets/locationIcon", () => ({
  default: () => <div data-testid="location-icon" />,
}));

describe("Компонент SelectCities", () => {
  // Очистка после каждого теста, чтобы dropdowns не пересекались
  afterEach(() => {
    cleanup();
  });

  it("рендерит компонент с правильным плейсхолдером", () => {
    const mockFn = vi.fn();
    render(<SelectCities selectCities={mockFn} />);

    // MultiSelect рендерится как input с role="textbox"
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Все города");
  });

  it("отображает иконку слева от поля ввода", () => {
    const mockFn = vi.fn();
    render(<SelectCities selectCities={mockFn} />);

    expect(screen.getByTestId("location-icon")).toBeInTheDocument();
  });

  it("при выборе города вызывает функцию selectCities с массивом выбранных значений", async () => {
    // Создаем мок-функцию
    const mockFn = vi.fn();
    
    // Рендерим компонент
    render(<SelectCities selectCities={mockFn} />);

    // Инициализируем объект userEvent
    const user = userEvent.setup();

    // Находим инпут (роль textbox)
    const input = screen.getByRole("textbox");

    // 1. Кликаем на инпут, чтобы открыть список (dropdown)
    await user.click(input);

    // 2. Проверяем, что опция появилась в DOM (Mantine рендерит dropdown через Portal)
    const optionMoscow = screen.getByText("Москва");
    expect(optionMoscow).toBeInTheDocument();

    // 3. Кликаем на опцию "Москва"
    await user.click(optionMoscow);

    // 4. Проверяем, что наша функция была вызвана с массивом, содержащим "Москва"
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(["Москва"]);
  });

  it("при выборе нескольких городов передает массив всех выбранных значений", async () => {
    const mockFn = vi.fn();
    render(<SelectCities selectCities={mockFn} />);

    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    // Открываем
    await user.click(input);

    // Выбираем первый город
    await user.click(screen.getByText("Москва"));
    
    // Ждем обновления интерфейса и кликаем снова для открытия списка (иногда нужно, иногда нет, но надежно)
    await user.click(input); 
    
    const optionSPb = screen.getByText("Санкт-Петербург");
    await user.click(optionSPb);

    expect(mockFn).toHaveBeenLastCalledWith(["Москва", "Санкт-Петербург"]);
  });
});