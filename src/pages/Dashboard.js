import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// react-vis
import {
  FlexibleXYPlot,
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineMarkSeries,
  VerticalBarSeries,
  Hint
} from 'react-vis';
// @material-ui/core components
import { indigo } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// @material-ui/lab components
import AvatarGroup from '@material-ui/lab/AvatarGroup';
// @material-ui/icons components
import DollarIcon from '@material-ui/icons/AttachMoney';
import FolderIcon from '@material-ui/icons/Folder';
import PaymentIcon from '@material-ui/icons/Payment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LaunchIcon from '@material-ui/icons/Launch';
// core components
//...

// styled components
const TopCards = styled(Grid)`
  margin-top: 24px;
`;
const StyledCard = styled(Card)`
  display: flex;
  padding: 16px 24px;
  align-items: center;
  justify-content: space-between;
`;
const AvatarContainer = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;
const StyledAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
  background-color: ${indigo[500]};
`;
const PercentageUp = styled.span`
  color: #4caf50;
  background-color: rgba(76, 175, 80, 0.08);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`;
const PercentageDown = styled.span`
  color: #f44336;
  background-color: rgba(244, 67, 54, 0.08);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`;
const GraphTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
`;
const GraphAction = styled(Typography)`
  padding: 8px;
`;
const StyledAvatarGroup = styled(AvatarGroup)`
  margin-right: 25px;
`;

// main component
const Dashboard = () => {
  // data
  const perfData = [
    { x: 0, y: 10 },
    { x: 1, y: 5 },
    { x: 2, y: 11 },
    { x: 3, y: 20 },
    { x: 4, y: 13 },
    { x: 5, y: 30 },
    { x: 6, y: 18 },
    { x: 7, y: 4 },
    { x: 8, y: 13 },
    { x: 9, y: 12 },
    { x: 10, y: 13 },
    { x: 11, y: 5 }
  ];
  const pageViewsData = [
    { x: 0, y: 139 },
    { x: 1, y: 127 },
    { x: 2, y: 102 },
    { x: 3, y: 143 },
    { x: 4, y: 143 },
    { x: 5, y: 156 },
    { x: 6, y: 172 },
    { x: 7, y: 148 },
    { x: 8, y: 132 },
    { x: 9, y: 135 },
    { x: 10, y: 124 },
    { x: 11, y: 129 }
  ];
  // state
  const [graphHintVal, setGraphHintVal] = useState(null);
  const [pageViews, setPageViews] = useState(100);
  const [lastPageViews, setLastPageViews] = useState(pageViewsData);
  // useEffect hook
  useEffect(() => {
    let id = setInterval(() => {
      const pageViews = Math.floor(Math.random() * 100) + 100; // random int between 100 and 200
      setPageViews(pageViews);
      setLastPageViews(oldState => {
        let newState = oldState.slice(1).map(val => ({ x: val.x - 1, y: val.y }));
        newState.push({ x: newState.length - 1, y: pageViews });
        return newState;
      });
    }, 1000);
    return () => clearInterval(id);
  });
  // render component
  const renderHeader = () => (
    <>
      <Typography variant="overline" component="h2">Home</Typography>
      <Typography variant="h5" component="h1">Good Morning, Marion</Typography>
    </>
  );
  const renderTopCards = () => {
    const items = [
      { 
        title: "Today's earnings",
        text: "$2,400",
        icon: <DollarIcon />,
        percentage: 7,
      },
      { 
        title: "Today's orders",
        text: "153",
        icon: <PaymentIcon />,
        percentage: 13.5,
      },
      { 
        title: "ROI per customer",
        text: "$27.5",
        icon: <DollarIcon />,
        percentage: 1,
      },
      { 
        title: "New projects",
        text: "15",
        icon: <FolderIcon />,
        percentage: -11,
      }
    ];
    return (
      <TopCards container spacing={3}>
        {
          items.map((item, id) => (
            <Grid item xs={12} sm={6} lg={3} key={id}>
              <StyledCard>
                <Grid 
                  container
                  justify="space-between"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs={9}>
                    <Typography variant="overline" component="h3" gutterBottom={true}>{item.title}</Typography>
                    <Grid
                      container
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Typography variant="h5" component="h3">{item.text}</Typography>
                      </Grid>
                      {
                        item.percentage && (
                          <Grid item>
                            {
                              item.percentage > 0 ?
                                <PercentageUp>+{item.percentage}%</PercentageUp> :
                                <PercentageDown>{item.percentage}%</PercentageDown>
                            }
                          </Grid>
                        )
                      }
                    </Grid>
                  </Grid>
                  <AvatarContainer item xs={3}>
                    {
                      item.icon && (
                        <StyledAvatar>
                          {item.icon}
                        </StyledAvatar>
                      )
                    }
                  </AvatarContainer>
                </Grid>
              </StyledCard>
            </Grid>
          ))
        }
      </TopCards>
    );
  };
  const renderPerformanceGraph = () => (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <GraphTitle variant="h5">Performance over time</GraphTitle>
        }
      />
      <Divider />
      <CardContent style={{height: "400px"}}>
        <FlexibleXYPlot>
          <HorizontalGridLines
            tickValues={[5, 10, 15, 20, 25, 30]}
          />
          <XAxis
            style={{ line: {stroke: "none"} }}
            tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            tickFormat={v => {
              switch(v) {
                case 0: return 'Jan';
                case 1: return 'Feb';
                case 2: return 'Mar';
                case 3: return 'Avr';
                case 4: return 'May';
                case 5: return 'Jun';
                case 6: return 'Jul';
                case 7: return 'Aug';
                case 8: return 'Sep';
                case 9: return 'Oct';
                case 10: return 'Nov';
                case 11: return 'Dec';
                default: return '';
              }
            }}
          />
          <YAxis
            style={{ line: {stroke: "none"} }}
            tickValues={[0, 5, 10, 15, 20, 25, 30]}
            tickFormat={v => `${v}K`}
          />
          <LineMarkSeries
            data={perfData}
            color="#3f51b5"
            size={6}
            curve={'curveMonotoneX'}
            lineStyle={{ fill: "none", strokeWidth: "3px" }}
            markStyle={{ stroke: "#fff", strokeWidth: "3px" }}
            onValueMouseOver={(dt, e) => setGraphHintVal(dt)}
            onValueMouseOut={() => setGraphHintVal(null)}
          />
          {
            graphHintVal ?
              <Hint value={graphHintVal}>
                <Paper style={{padding: "4px 12px"}}>
                  <p style={{ color: "black" }}>Income: ${graphHintVal.y}K</p>
                </Paper>
              </Hint>:
              null
          }
        </FlexibleXYPlot>
      </CardContent>
    </Card>
  );
  const renderPageViewsGraph = () => (
    <Card>
      <CardHeader
        action={
          <GraphAction variant="h5" component="h3">{pageViews}</GraphAction>
        }
        title={
          <GraphTitle variant="h5">Page views / sec</GraphTitle>
        }
      />
      <Divider />
      <CardContent style={{height: "400px", padding: 0}}>
        <XYPlot height={140} width={250} margin={{left: 10, right: 10, top: 20, bottom: 0}}>
          <VerticalBarSeries
            data={lastPageViews}
            color="#3f51b5"
            barWidth={.45}
          />
        </XYPlot>
        <List>
          <ListItem>
            <ListItemText primary="/cart" />
            <ListItemSecondaryAction>
              37
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="/cart/checkout" />
            <ListItemSecondaryAction>
              21
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="/contact-us" />
            <ListItemSecondaryAction>
              12
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="/blog" />
            <ListItemSecondaryAction>
              8
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </List>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
        >
          <Button 
            endIcon={<NavigateNextIcon />}
            style={{ marginRight: "10px" }}
          >
            See all
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
  const renderTasks = () => (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <GraphTitle variant="h5">Team Tasks</GraphTitle>
        }
      />
      <Divider />
      <CardContent style={{padding: 0}}>
        <List>
          <ListItem>
            <ListItemText primary="Update API calls" secondary="1 days remaining" />
            <ListItemAvatar>
              <StyledAvatarGroup spacing="small">
                <Avatar src="/avatar.jpg" />
                <Avatar src="/avatar1.jpg" />
                <Avatar src="/avatar2.jpg" />
              </StyledAvatarGroup>
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <IconButton><LaunchIcon /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Set up database" secondary="2 days remaining" />
            <ListItemAvatar>
              <StyledAvatarGroup spacing="small">
                <Avatar src="/avatar1.jpg" />
                <Avatar src="/avatar2.jpg" />
              </StyledAvatarGroup>
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <IconButton><LaunchIcon /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Bug fixing" secondary="N/A" />
            <ListItemAvatar>
              <StyledAvatarGroup spacing="small">
                <Avatar src="/avatar.jpg" />
                <Avatar src="/avatar1.jpg" />
                <Avatar src="/avatar2.jpg" />
              </StyledAvatarGroup>
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <IconButton><LaunchIcon /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Release v1.0 Beta" secondary="N/A" />
            <ListItemAvatar>
              <StyledAvatarGroup spacing="small">
                <Avatar src="/avatar.jpg" />
                <Avatar src="/avatar1.jpg" />
                <Avatar src="/avatar2.jpg" />
              </StyledAvatarGroup>
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <IconButton><LaunchIcon /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="GDPR compliance" secondary="N/A" />
            <ListItemAvatar>
              <StyledAvatarGroup spacing="small">
                <Avatar src="/avatar.jpg" />
              </StyledAvatarGroup>
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <IconButton><LaunchIcon /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </List>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
        >
          <Button 
            endIcon={<NavigateNextIcon />}
            style={{ margin: "10px" }}
          >
            See all
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
  const renderProjects = () => (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <GraphTitle variant="h5">Latest Projects</GraphTitle>
        }
      />
      <Divider />
      <CardContent style={{padding: 0}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Technologies</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Dashboard Design</TableCell>
              <TableCell><Avatar src="/avatar.jpg" /></TableCell>
              <TableCell>$12,500</TableCell>
              <TableCell>ReactJS, MongoDB, Node.js, ...</TableCell>
              <TableCell>May 04, 2020</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>iOS App Dev</TableCell>
              <TableCell><Avatar src="/avatar1.jpg" /></TableCell>
              <TableCell>$2,800</TableCell>
              <TableCell>ReactNative</TableCell>
              <TableCell>May 11, 2020</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Database Setup</TableCell>
              <TableCell><Avatar src="/avatar2.jpg" /></TableCell>
              <TableCell>$7,350</TableCell>
              <TableCell>MongoDB</TableCell>
              <TableCell>May 23, 2020</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>API Design</TableCell>
              <TableCell><Avatar src="/avatar1.jpg" /></TableCell>
              <TableCell>$4,200</TableCell>
              <TableCell>Node.js, ExpressJS</TableCell>
              <TableCell>June 02, 2020</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
        >
          <Button 
            endIcon={<NavigateNextIcon />}
            style={{ margin: "10px" }}
          >
            See all
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <>
      {renderHeader()}
      {renderTopCards()}
      <Grid
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item xs={12} lg={3}>{renderPageViewsGraph()}</Grid>
        <Grid item xs={12} lg={9}>{renderPerformanceGraph()}</Grid>
      </Grid>
      <Grid
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item xs={12} lg={5}>{renderTasks()}</Grid>
        <Grid item xs={12} lg={7}>{renderProjects()}</Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
