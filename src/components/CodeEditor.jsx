import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Highlight, themes } from "prism-react-renderer";
import CodeTextarea from "./CodeTextarea";

const CodeEditor = () => {
  const [code, setCode] = useState(`// Write your code here`);

  return (
    <div className="code-editor-container">
      <CodeTextarea code={code} setCode={setCode} />

      <Highlight code={code} language="jsx" theme={themes.dracula}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`code-editor-pre ${className}`} style={style}>
            {tokens.map((line, i) => {
              const { key, ...restLineProps } = getLineProps({ line, key: i });
              return (
                <div key={key} {...restLineProps}>
                  {line.map((token, key) => {
                    const { key: tokenKey, ...restTokenProps } = getTokenProps({
                      token,
                      key,
                    });
                    return <span key={tokenKey} {...restTokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeEditor;
