import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import hljs from 'highlight.js';
import '../../node_modules/highlight.js/styles/monokai-sublime.css';

const Pre = styled.pre`
  border-radius: 5px;
  padding: 16px;
`;

const Code = styled.code`
  font-size: 0.9rem;
`;

// main component
const CodeHighlighter = ({ children, language }) => {
  const codeRef = useRef(null); 

  useEffect(() => {
    if (codeRef) {
      console.log(codeRef);
      hljs.highlightBlock(codeRef.current);
    }
  }, [codeRef]);

  return (
    <Pre ref={codeRef}>
      <Code className={language}>
        {children}
      </Code>
    </Pre>
  );
};

CodeHighlighter.propTypes = {
  language: PropTypes.string.isRequired
};

export default CodeHighlighter;
