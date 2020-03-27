import React, { useState } from "react";
import styled from 'styled-components';
// @material-ui/core components
import { teal, amber, indigo, red, grey } from '@material-ui/core/colors';
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
// @material-ui/icons components
import StarIcon from '@material-ui/icons/Star';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import BarChartIcon from '@material-ui/icons/BarChart';
import BuildIcon from '@material-ui/icons/Build';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import CommentIcon from '@material-ui/icons/Comment';
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
`;
const StyledList = styled(List)`
  padding-top: 0px;
  padding-bottom: 0px;
`;
const StyledListItem = styled(ListItem)`
  padding-left: 24px;
  padding-right: 24px;
`;
const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 20px;
  margin-right: 16px;
`;
const TabsContainer = styled.div`
  background-color: ${indigo[500]};
`;
const StyledTabs = styled(Tabs)`
  .MuiTab-root {
    text-transform: capitalize;
    min-width: 72px;
    color: #fff;
  }
  .MuiTabs-indicator {
    width: 72px!important;
    left: ${props => props.value * 72}px!important;
  }
`;
const EmptyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

// main component
const NotificationsPopover = (props) => {
  // state
  const [currentTab, setCurrentTab] = useState(0);
  // list items to render
  const items = [
    [
      {
        primary: "New order has been received",
        secondary: "2 hrs ago",
        icon: <BarChartIcon fontSize="small" style={{ color: `${teal[300]}` }} />
      },
      {
        primary: "New customer is registered",
        secondary: "3 hrs ago",
        icon: <PersonIcon fontSize="small" style={{ color: `${amber[300]}` }} />
      },
      {
        primary: "Application has been approved",
        secondary: "3 hrs ago",
        icon: <StarIcon fontSize="small" style={{ color: `${red[400]}` }} />
      },
      {
        primary: "New user feedback received",
        secondary: "5 hrs ago",
        icon: <AssignmentIcon fontSize="small" style={{ color: `${indigo[400]}` }} />
      }
    ],
    [
      {
        primary: "Build successful",
        secondary: "Just now",
        icon: <BuildIcon fontSize="small" style={{ color: `${teal[300]}` }} />
      },
      {
        primary: "New report has been generated",
        secondary: "1 hr ago",
        icon: <DescriptionIcon fontSize="small" style={{ color: `${amber[300]}` }} />
      },
      {
        primary: "New report has been generated",
        secondary: "Yesterday",
        icon: <DescriptionIcon fontSize="small" style={{ color: `${amber[300]}` }} />
      },
      {
        primary: "New customer comment received",
        secondary: "Yesterday",
        icon: <CommentIcon fontSize="small" style={{ color: `${red[300]}` }} />
      }
      ,
      {
        primary: "Company meeting canceled",
        secondary: "2 days ago",
        icon: <PeopleIcon fontSize="small" />
      }
    ],
    []
  ];
  // render component
  const renderListTab = (items) => (
    <StyledList dense={true}>
      {
        items.map(item => (
          <React.Fragment key={item.primary}>
            <StyledListItem button>
              <StyledListItemIcon>{item.icon}</StyledListItemIcon>
              <ListItemText
                primary={item.primary}
                secondary={item.secondary}
              />
              <NavigateNextIcon style={{ color: `${grey[400]}` }} />
            </StyledListItem>
            <Divider />
          </React.Fragment>
        ))
      }
      { 
        items.length === 0 && (
          <EmptyList>
            <Typography variant="body2">All caught up!</Typography>
            <Typography variant="body2">No new notifications.</Typography>
          </EmptyList>
        )
      }
    </StyledList>
  );
  return (
    <StyledPopover {...props}>
      <Header>
        <Grid
          container
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Name variant="subtitle1" noWrap>User Notifications</Name>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
            >
              9 new
            </Button>
          </Grid>
        </Grid>
      </Header>
      <Divider />
      <Main>
       <TabsContainer>
          <StyledTabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            aria-label="notification tabs"
          >
            <Tab label="Alerts" />
            <Tab label="Events" />
            <Tab label="Logs" />
          </StyledTabs>
        </TabsContainer>
        <Divider />
        {currentTab === 0 && renderListTab(items[0])}
        {currentTab === 1 && renderListTab(items[1])}
        {currentTab === 2 && renderListTab(items[2])}
      </Main>
    </StyledPopover>
  );
};

export default NotificationsPopover;
