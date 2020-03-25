import React from 'react';
import styled from 'styled-components';
// @material-ui/core components
import { green } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import DollarIcon from '@material-ui/icons/AttachMoney';
import Avatar from '@material-ui/core/Avatar';
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
  background-color: ${green[400]};
`;

// main component
const Dashboard = () => {

  // render component
  const renderHeader = () => (
    <>
      <Typography variant="overline" component="h2">Home</Typography>
      <Typography variant="h5" component="h1">Good Morning, Marion</Typography>
    </>
  );
  const renderTopCards = () => {
    const items = [
      { title: "Today's earnings", text: "$2,400" },
      { title: "Today's earnings", text: "$2,400" },
      { title: "Today's earnings", text: "$2,400" },
      { title: "Today's earnings", text: "$2,400" },
    ];
    return (
      <TopCards container spacing={3}>
        {
          items.map((item, id) => (
            <Grid item xs={12} md={6} lg={3} key={id}>
              <StyledCard>
                <Grid 
                  container
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={8} key={id}>
                    <Typography variant="overline" component="h3" gutterBottom={true}>{item.title}</Typography>
                    <Typography variant="h5" component="h3">{item.text}</Typography>
                  </Grid>
                  <AvatarContainer item xs={4} key={id}>
                    <StyledAvatar>
                      <DollarIcon />
                    </StyledAvatar>
                  </AvatarContainer>
                </Grid>
              </StyledCard>
            </Grid>
          ))
        }
      </TopCards>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderTopCards()}
    </>
  );
};

export default Dashboard;
