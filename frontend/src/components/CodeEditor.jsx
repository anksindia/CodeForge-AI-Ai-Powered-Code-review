'use client';
import React from 'react';
import Editor from 'react-simple-code-editor';
import prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const CodeEditor = ({ code, onChange }) => {
  return (
    <div
      className="rounded-xl p-3 flex-1 relative"
      style={{
        background: 'transparent',
        border: '1px solid #333', // Subtle Border
      }}
    >
      <Editor
        value={code}
        onValueChange={(c) => onChange(c)}
        highlight={(c) =>
          prism.highlight(c, prism.languages.javascript, 'javascript')
        }
        padding={16}
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: 16,
          outline: 'none',
          color: '#f8fafc',
          background: 'transparent',
        }}
        className="rounded-xl focus:outline-none w-full h-full"
      />
    </div>
  );
};

export default CodeEditor;
