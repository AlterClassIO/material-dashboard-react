import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

const Code = styled.code`
  font-size: 0.9rem;
  border-radius: 5px;
  padding: 16px;
`;

// main component
const CodeHighlighter = ({ children, language }) => {
  const codeRef = useRef(null); 

  useEffect(() => {
    if (codeRef) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [codeRef]);

  return (
    <pre>
      <Code 
        ref={codeRef}
        className={language}
      >
        {children}
      </Code>
    </pre>
  );
};

CodeHighlighter.propTypes = {
  language: PropTypes.string.isRequired
};

export default CodeHighlighter;
