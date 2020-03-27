import React from "react";
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
// @material-ui/core components
import { green, orange, red, grey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

// styled components
const rippleAnimation = keyframes`
  0% {
    transform: scale(.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;
const rippleStyles = css`
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: ${rippleAnimation} 1.2s infinite ease-in-out;
    border: 1px solid ${green[500]};
    content: "";
  }
`;
const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    ${props => {
      let color;
      switch(props.status) {
        case 'active': color = green[500]; break;
        case 'doNotDisturb': color = orange[500]; break;
        case 'busy': color = red[500]; break;
        case 'off': color = grey[400]; break;
        default: color = green[500];
      }
      return `
        background-color: ${color};
        color: ${color};
      `;
    }};
    box-shadow: 0 0 0 1px #fff;
    ${props => props.status === "active" ? rippleStyles : null}
  }
`;

// main component
const AvatarWithBadge = (props) => {
  const {
    src = "",
    alt = "",
    overlap = "circle",
    variant = "dot",
    status = 'active'
  } = props;
  // render component
  return (
    <StyledBadge
      status={status}
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
  variant: PropTypes.string,
  status: PropTypes.oneOf(['active', 'doNotDisturb', 'busy', 'off'])
};

export default AvatarWithBadge;
