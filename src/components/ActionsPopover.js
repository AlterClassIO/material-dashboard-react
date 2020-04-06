import React from "react";
import styled, { css } from 'styled-components';
// @material-ui/core components
import { indigo, grey } from '@material-ui/core/colors';
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
// @material-ui/icons components
import DollarIcon from '@material-ui/icons/AttachMoney';
import FolderIcon from '@material-ui/icons/Folder';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';

// styled components
const StyledPopover = styled(Popover)`  
  .MuiPopover-paper {
    width: 320px;
  }
  .MuiPaper-rounded {
    border-radius: 0px;
  }
`;
const Header = styled.header`
  padding: 24px;
`;
const Main = styled.main``;
const Name = styled(Typography)`
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 10px;
`;
const StyledButton = styled(Button)`
  padding: 3.3rem .75rem;
  border-radius: 0;
  ${props => {
    switch(props.pos){
      case 'tl': return `
        border-right: 1px solid #ebedf2;
        border-bottom: 1px solid #ebedf2;
      `;
      case 'tr': return `
        border-bottom: 1px solid #ebedf2;
      `;
      case 'bl': return `
        border-right: 1px solid #ebedf2;
      `;
      case 'br':
      default: return null;
    }
  }}
`;
const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled(Typography)`
  text-transform: capitalize;
  font-size: 1.1rem;
`;
const Subtitle = styled(Typography)`
  color: ${grey[700]};
  text-transform: capitalize;
  font-size: .85rem;
`;
const iconStyles = css`
  color: ${indigo[400]};
  font-size: 2.2rem;
`;
const StyledDollarIcon = styled(DollarIcon)`${iconStyles}`;
const StyledFolderIcon = styled(FolderIcon)`${iconStyles}`;
const StyledAssignmentIcon = styled(AssignmentIcon)`${iconStyles}`;
const StyledPeopleIcon = styled(PeopleIcon)`${iconStyles}`;

// main component
const ActionsPopover = (props) => {
  // actions
  const actions = [
    { pos: "tl", title: "Accounting", subtitle: "e-commerce", icon: <StyledDollarIcon /> },
    { pos: "tr", title: "Administration", subtitle: "Console", icon: <StyledFolderIcon /> },
    { pos: "bl", title: "Projects", subtitle: "Pending Tasks", icon: <StyledAssignmentIcon /> },
    { pos: "br", title: "Customers", subtitle: "Latest Cases", icon: <StyledPeopleIcon /> },
  ];
  // render component
  return (
    <StyledPopover {...props}>
      <Header>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Name variant="subtitle1" noWrap>Quick Actions</Name>
          <Button
            variant="contained"
            color="primary"
          >
            7 tasks pending
          </Button>
        </Grid>
      </Header>
      <Divider />
      <Main>
        <Grid container>
          {
            actions.map(action => (
              <Grid item xs={6} key={action.pos}>
                <StyledButton fullWidth={true} pos={action.pos}>
                  <ButtonContent>
                    {action.icon}
                    <Title variant="button">{action.title}</Title>
                    <Subtitle variant="caption">{action.subtitle}</Subtitle>
                  </ButtonContent>
                </StyledButton>
              </Grid>
            ))
          }
        </Grid>
      </Main>
    </StyledPopover>
  );
};

export default ActionsPopover;
