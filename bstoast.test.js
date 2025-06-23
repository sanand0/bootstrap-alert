import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { bstoast } from "./bstoast.js";

// Simple DOM setup
const dom = new (await import("jsdom")).JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;

describe("bstoast", () => {
  let mockToast;

  beforeEach(() => {
    // Clean DOM
    document.body.innerHTML = "";
    
    // Mock Bootstrap Toast
    mockToast = {
      show: vi.fn(),
    };
    
    globalThis.bootstrap = {
      Toast: vi.fn().mockImplementation(() => mockToast),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("basic functionality", () => {
    it("creates toast with default options", () => {
      bstoast({ body: "Test message" });
      
      const container = document.querySelector(".toast-container");
      expect(container).toBeTruthy();
      expect(container.className).toBe("toast-container position-fixed top-0 end-0 p-3");
      
      const toast = container.querySelector(".toast");
      expect(toast).toBeTruthy();
      expect(toast.innerHTML).toContain("Alert");
      expect(toast.innerHTML).toContain("Test message");
      expect(toast.innerHTML).toContain("text-bg-primary");
      
      expect(globalThis.bootstrap.Toast).toHaveBeenCalledWith(
        toast,
        expect.objectContaining({ autohide: true, delay: 5000 })
      );
    });

    it("accepts string as body parameter", () => {
      bstoast("Simple message");
      
      const toast = document.querySelector(".toast");
      expect(toast).toBeTruthy();
      expect(toast.innerHTML).toContain("Simple message");
    });

    it("handles different positions", () => {
      bstoast({ body: "Test", position: "bottom-0 start-0" });
      
      const container = document.querySelector(".toast-container");
      expect(container.className).toContain("bottom-0 start-0");
    });

    it("handles different colors", () => {
      bstoast({ body: "Test", color: "success" });
      
      const toast = document.querySelector(".toast");
      expect(toast.innerHTML).toContain("text-bg-success");
    });

    it("handles custom icons", () => {
      bstoast({ body: "Test", icon: "check-circle" });
      
      const toast = document.querySelector(".toast");
      expect(toast.innerHTML).toContain("bi-check-circle");
    });

    it("handles custom timeout", () => {
      bstoast({ body: "Test", timeout: 10000 });
      
      expect(globalThis.bootstrap.Toast).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({ delay: 10000 })
      );
    });

    it("handles disabled timeout", () => {
      bstoast({ body: "Test", timeout: false });
      
      expect(globalThis.bootstrap.Toast).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({ autohide: false, delay: false })
      );
    });
  });

  describe("HTML content", () => {
    it("renders HTML in body", () => {
      bstoast({ body: "<strong>bold</strong> text" });
      
      const toastBody = document.querySelector(".toast-body");
      expect(toastBody.innerHTML).toBe("<strong>bold</strong> text");
    });

    it("renders HTML in title", () => {
      bstoast({ title: "<em>italic</em> title", body: "Test" });
      
      const toastHeader = document.querySelector(".toast-header strong");
      expect(toastHeader.innerHTML).toBe("<em>italic</em> title");
    });
  });

  describe("container management", () => {
    it("reuses existing container", () => {
      bstoast({ body: "First toast" });
      const firstContainer = document.querySelector(".toast-container");
      
      bstoast({ body: "Second toast" });
      const secondContainer = document.querySelector(".toast-container");
      
      expect(firstContainer).toBe(secondContainer);
      expect(secondContainer.children.length).toBe(2);
    });

    it("clears container when append is false", () => {
      bstoast({ body: "First toast" });
      bstoast({ body: "Second toast", append: false });
      
      const container = document.querySelector(".toast-container");
      const toasts = container.querySelectorAll(".toast");
      
      expect(toasts.length).toBe(1);
      expect(toasts[0].innerHTML).toContain("Second toast");
    });

    it("resets container when not in DOM", () => {
      bstoast({ body: "First toast" });
      const container = document.querySelector(".toast-container");
      
      // Remove container from DOM
      container.remove();
      
      bstoast({ body: "Second toast" });
      const newContainer = document.querySelector(".toast-container");
      
      expect(newContainer).not.toBe(container);
      expect(newContainer.children.length).toBe(1);
    });
  });

  describe("error handling", () => {
    it("throws error when body is missing", () => {
      expect(() => bstoast({})).toThrow("bstoast: body is required");
    });

    it("throws error when Bootstrap is not available", () => {
      delete globalThis.bootstrap;
      expect(() => bstoast({ body: "Test" })).toThrow("bstoast: Bootstrap 5 is required");
    });
  });

  describe("edge cases", () => {
    it("throws error for empty string body", () => {
      expect(() => bstoast({ body: "" })).toThrow("bstoast: body is required");
    });

    it("handles special characters in body", () => {
      bstoast({ body: "Test & < > \" ' message" });
      
      const toastBody = document.querySelector(".toast-body");
      expect(toastBody.innerHTML).toBe("Test &amp; &lt; &gt; \" ' message");
    });

    it("handles zero timeout", () => {
      bstoast({ body: "Test", timeout: 0 });
      
      expect(globalThis.bootstrap.Toast).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({ delay: 0 })
      );
    });
  });
});
