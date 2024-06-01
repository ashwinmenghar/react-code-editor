import React, { useRef } from "react";

const CodeTextarea = ({ code, setCode }) => {
  const textareaRef = useRef(null);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      insertTextAtCursor("  ");
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleNewLineIndentation();
    }
  };

  const insertTextAtCursor = (text) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + text + code.substring(end);
      setCode(newCode);

      // Move the cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + text.length;
      }, 0);
    }
  };

  const handleNewLineIndentation = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const beforeCursor = code.substring(0, start);
      const afterCursor = code.substring(end);

      const currentLine = beforeCursor.split("\n").pop() || "";
      const indentation = currentLine.match(/^\s*/)?.[0] || "";

      const newCode = beforeCursor + "\n" + indentation + afterCursor;
      setCode(newCode);

      // Move the cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          start + 1 + indentation.length;
      }, 0);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className="code-editor-textarea"
      value={code}
      onChange={handleCodeChange}
      onKeyDown={handleKeyDown}
      spellCheck="false"
    />
  );
};

export default CodeTextarea;
