import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
// @material-ui/core components
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// core components
import AvatarWithBadge from "./AvatarWithBadge";

// styled components
const StyledButton = styled(Button)`
  .MuiButton-label {
    text-transform: capitalize;
    color: #fff;
  }
`;

// main component
const ProfileButton = (props) => {
  const {
    text = "",
    src = "",
    alt = "",
    ...rest
  } = props;
  // render component
  if (text.length === 0) {
    return (
      <IconButton {...rest}>
        <AvatarWithBadge alt={alt} src={src} />
      </IconButton>
    );
  }
  return (
    <StyledButton
      {...rest}
      endIcon={
        <AvatarWithBadge alt={alt} src={src} />
      }
    >
      {text}
    </StyledButton>
  );
};

ProfileButton.propTypes = {
  text: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default ProfileButton;
