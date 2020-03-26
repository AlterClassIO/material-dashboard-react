import React from "react";
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
// @material-ui/core components
import { green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

// styled components
const ripple = keyframes`
  0% {
    transform: scale(.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;
const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: ${green[500]};
    color: ${green[500]};
    box-shadow: 0 0 0 1px #fff;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: ${ripple} 1.2s infinite ease-in-out;
      border: 1px solid ${green[500]};
      content: "";
    }
  }
`;

// main component
const AvatarWithBadge = (props) => {
  const {
    src = "",
    alt = "",
    overlap = "circle",
    variant = "dot"
  } = props;
  // render component
  return (
    <StyledBadge
      overlap={overlap}
      variant={variant}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Avatar alt={alt} src={src} />
    </StyledBadge>
  );
};

AvatarWithBadge.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  overlap: PropTypes.string,
  variant: PropTypes.string
};

export default AvatarWithBadge;
