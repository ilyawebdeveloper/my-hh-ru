import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "../test-utils";
import App from "../App";

describe("Компонент App (Интеграция)", () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch = vi.fn();

    vi.stubGlobal("fetch", mockFetch);

    mockFetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              found: 1,
              items: [
                { id: "1", name: "Frontend Dev", employer: { name: "HH" } },
              ],
              pages: 1,
            }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                name: "Россия",
                areas: [{ id: "1", name: "Москва" }],
              },
            ]),
        })
      );
  });

  it("показывает лоадер, а затем отрисовывает контент после загрузки данных", async () => {
    render(<App />);

    expect(screen.queryByText("...")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });
  });

  it("выполняет запрос к API с правильными параметрами", async () => {
    render(<App />);

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));

    const firstCallUrl = mockFetch.mock.calls[0][0] as string;

    expect(firstCallUrl).toContain("text=Фронтенд");
    expect(firstCallUrl).toContain("per_page=10");
    expect(firstCallUrl).toContain("page=1");
    expect(firstCallUrl).toContain("search_field=name");
    expect(firstCallUrl).toContain("search_field=company_name");

    expect(firstCallUrl).toContain("skill_set=JavaScript");
    expect(firstCallUrl).toContain("skill_set=React");

    const secondCallUrl = mockFetch.mock.calls[1][0] as string;
    expect(secondCallUrl).toContain("areas");
  });
});
