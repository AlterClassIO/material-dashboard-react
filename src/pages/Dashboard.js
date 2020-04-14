import React from 'react';
import styled from 'styled-components';
// @material-ui/core components
import { indigo } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
// @material-ui/icons components
import DollarIcon from '@material-ui/icons/AttachMoney';
import FolderIcon from '@material-ui/icons/Folder';
import PaymentIcon from '@material-ui/icons/Payment';
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
            <Grid item xs={12} md={6} lg={3} key={id}>
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

  return (
    <>
      {renderHeader()}
      {renderTopCards()}
    </>
  );
};

export default Dashboard;
