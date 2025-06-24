import { describe, it, expect, beforeEach, vi, beforeAll, afterAll } from "vitest";
import { Browser } from "happy-dom";

const browser = new Browser({
  console,
  settings: { fetch: { virtualServers: [{ url: "https://test/", directory: "." }] } },
});

describe("bootstrap-alert", () => {
  let page = browser.newPage();
  let document, window;

  beforeAll(async () => {
    // Don't wait for real timeouts in tests. Fake them.
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(async () => {
    await page.goto("https://test/bootstrap-alert.html");
    await page.waitUntilComplete();
    document = page.mainFrame.document;
    window = page.mainFrame.window;
    // Ensure happy-dom's page uses vitest's setTimeout
    window.setTimeout = setTimeout;
  });

  it("creates toast with default options", async () => {
    document.querySelector("#simpleToast").click();

    const container = document.querySelector(".toast-container");
    expect(container).toBeTruthy();
    expect(container.className).toBe("toast-container position-fixed top-0 end-0 p-3");

    const toast = container.querySelector(".toast");
    expect(toast).toBeTruthy();
    expect(toast.querySelector(".toast-header")).toBeNull();
    expect(toast.querySelector(".toast-body").textContent.trim()).toBe("Simple message");

    vi.runAllTimers();
    expect(container.querySelector(".toast.show")).toBeFalsy();
  });

  it("creates toast with custom colors", async () => {
    document.querySelector("#colorToast").click();
    expect(document.querySelector(".toast .text-bg-primary")).toBeTruthy();
  });

  it("handles custom options", async () => {
    document.querySelector("#customToast").click();
    const toast = document.querySelector(".toast");
    expect(toast.querySelector(".toast-header").textContent.trim()).toContain("Success");
    expect(toast.querySelector(".toast-body").textContent.trim()).toBe("Custom toast message");
    expect(toast.querySelector(".toast-header").className).toContain("text-bg-success");
  });

  it("replaces existing toast when append is false", async () => {
    document.querySelector("#simpleToast").click();
    document.querySelector("#replaceToast").click();

    const container = document.querySelector(".toast-container");
    expect(container.children.length).toBe(1);
    expect(container.querySelector(".toast-body").textContent.trim()).toBe("This replaces previous toast");
  });

  it("handles different positions", async () => {
    document.querySelector("#bottomLeftToast").click();
    expect(document.querySelector(".toast-container").className).toContain("bottom-0 start-0");
    document.querySelector("#topRightToast").click();
    expect(document.querySelector(".toast-container").className).toContain("top-0 end-0");
  });

  it("renders HTML", async () => {
    document.querySelector("#htmlToast").click();
    expect(document.querySelector(".toast-body").innerHTML).toBe("Well <u>done</u>!");
    expect(document.querySelector(".toast-header").innerHTML).toContain('<i class="bi bi-cake2 me-2"></i> Congrats!');
  });

  it("handles persistent toasts", async () => {
    document.querySelector("#dontHide").click();
    vi.advanceTimersByTime(20000);
    expect(document.querySelector(".toast.show")).toBeTruthy();
  });

  it("handles quick timeout", async () => {
    document.querySelector("#quickHide").click();
    vi.advanceTimersByTime(200);
    expect(document.querySelector(".toast.show")).toBeTruthy();
    vi.advanceTimersByTime(1000);
    expect(document.querySelector(".toast.show")).toBeFalsy();
  });

  it("handles special characters in body", async () => {
    document.querySelector("#specialCharsToast").click();
    expect(document.querySelector(".toast-body").innerHTML).toBe("Test &amp; &lt; &gt; \" ' message");
  });

  it("reuses existing container", async () => {
    document.querySelector("#simpleToast").click();
    const firstContainer = document.querySelector(".toast-container");

    document.querySelector("#customToast").click();
    const secondContainer = document.querySelector(".toast-container");

    expect(firstContainer).toBe(secondContainer);
    expect(secondContainer.children.length).toBe(2);
  });

  it("resets container when not in DOM", async () => {
    document.querySelector("#simpleToast").click();
    const container = document.querySelector(".toast-container");
    container.remove();

    document.querySelector("#customToast").click();

    const newContainer = document.querySelector(".toast-container");
    expect(newContainer).not.toBe(container);
    expect(newContainer.children.length).toBe(1);
  });

  describe("error handling", () => {
    it("throws error when body is missing", async () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      document.querySelector("#errorToast").click();
      expect(spy).toHaveBeenCalledWith("bootstrapAlert: body is required");
      spy.mockRestore();
    });
    it("throws error for empty string body", async () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      document.querySelector("#emptyErrorToast").click();
      expect(spy).toHaveBeenCalledWith("bootstrapAlert: body is required");
      spy.mockRestore();
    });
  });
});
