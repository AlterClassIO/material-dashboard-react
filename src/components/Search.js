import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
// custom hooks
import { useEventListener } from '../hooks';
// @material-ui/core components
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
// @material-ui/icons components
import SearchIcon from '@material-ui/icons/Search';

// styled components
const Container = styled(Paper)`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${props => props.bgColor ? props.bgColor : "rgba(255, 255, 255, 0.15)"};
  border-radius: 5px;
  width: ${props => props.wider ? '250px' : '180px'};
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: ${props => props.bgColor ? props.bgColor : "rgba(255, 255, 255, 0.25)"};
  }
`;
const SearchIconContainer = styled(SearchIcon)`
  position: absolute;
  margin: 0 16px;
  ${props => props.color ? `color: ${props.color};` : null};
`;
const StyledInput = styled(InputBase)`
  color: ${props => props.color ? props.color: "#fff"};
  padding: 4px 8px;
  padding-left: calc(1rem + 32px);
  width: 100%;
`;

// main component
const Search = ({ 
  placeholder = "Search...",
  bgColor = "",
  color = "#fff",
  elevation = 0
}) => {
  // state
  const [wider, setWider] = useState(false);
  // ref to help detect click inside/outside container
  const containerEl = useRef(null);
  // function to toggle search bar width
  const handleOnClick = event => {
    if (containerEl.current && !containerEl.current.contains(event.target)) {
      setWider(false);
    }
    else {
      setWider(!wider);
    }
  };
  // use hook to detect click event
  useEventListener('mousedown', handleOnClick);
  // render component
  return (
    <Container
      elevation={elevation}
      ref={containerEl}
      wider={wider ? 1 : 0}
      bgColor={bgColor}
    >
      <SearchIconContainer color={color}>
        <SearchIcon  />
      </SearchIconContainer>
      <StyledInput 
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
        color={color}
      />
    </Container>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  bgColor: PropTypes.string,
  elevation: PropTypes.number
};

export default Search;
