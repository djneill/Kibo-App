import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "@/hooks/useProducts";
import { mockProducts } from "@/data/mockProducts";

const mockFetch = (response: unknown, ok = true) => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok,
    status: ok ? 200 : 500,
    json: async () => response,
  } as Response);
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe("useProducts", () => {
  it("starts in a loading state", async () => {
    mockFetch(mockProducts);
    const { result } = renderHook(() => useProducts());
    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();
    // Flush pending state updates so the fetch resolves inside act()
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("returns products on successful fetch", async () => {
    mockFetch(mockProducts);
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it("sets error message when fetch returns a non-ok response", async () => {
    mockFetch(null, false);
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/500/);
    expect(result.current.products).toEqual([]);
  });

  it("sets error message when fetch throws a network error", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network error"));
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Network error");
    expect(result.current.products).toEqual([]);
  });

  it("sets a fallback error message when a non-Error is thrown", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce("plain string rejection");
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Something went wrong");
    expect(result.current.products).toEqual([]);
  });

  it("returns an empty array when the API responds with no products", async () => {
    mockFetch([]);
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("sets loading to false after a successful fetch", async () => {
    mockFetch(mockProducts);
    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
  });
});
