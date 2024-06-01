import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import CodeEditor from "./components/CodeEditor";
import "@testing-library/jest-dom/extend-expect";

describe("CodeEditor Component", () => {
  it("renders correctly with initial code", () => {
    render(<CodeEditor />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toContain("// Write your code here");
  });

  it("updates the code when typing in the textarea", () => {
    render(<CodeEditor />);
    const textarea = screen.getByRole("textbox");
    act(() => {
      fireEvent.change(textarea, {
        target: { value: "console.log('Hello World');" },
      });
    });
    expect(textarea.value).toBe("console.log('Hello World');");
  });

  it("inserts spaces when Tab is pressed", () => {
    render(<CodeEditor />);
    const textarea = screen.getByRole("textbox");
    textarea.setSelectionRange(0, 0);
    act(() => {
      fireEvent.keyDown(textarea, { key: "Tab", code: "Tab" });
    });
    expect(textarea.value).toBe("  " + textarea.value.trim());
  });
});
