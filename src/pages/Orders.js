import React from 'react';
import styled from 'styled-components';
// @material-ui/core components
import { grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// core components
import Search from '../components/Search';
import EnhancedTable from '../components/EnhancedTable';

// styled components
const StyledGrid = styled(Grid)`
  margin-top: 24px;
`;
const StyledSearchButton = styled(Button)`
  margin-left: 10px;
`;
const Status = styled(Typography)`
  ${props => {
    let color;
    switch(props.status) {
      case "completed": color = "rgb(67, 160, 71)"; break;
      case "pending": color = "rgb(251, 140, 0)"; break;
      case "rejected": color = "rgb(229, 57, 53)"; break;
      case "canceled": color = "rgb(117, 117, 117)"; break;
      default: color = "rgb(67, 160, 71)";
    }
    return {
      border: `1px solid ${color};`,
      color: `${color};`
    };
  }};
  display: inline-flex;
  padding: 4px 8px;
  align-items: center;
  border-radius: 2px;
  justify-content: center;
  text-transform: uppercase;
  height: 20px;
  font-size: 10px;
`;
const RefAndDate = styled.div`
  display: flex;
  flex-direction: column;
`;
const Ref = styled(Typography)`
  font-weight: 500;
`;
const OrderDate = styled(Typography)`
  font-size: 12px;
  color: ${grey[700]};
`;

const Orders = () => {
  // state
  const orders = [
    {
      id: "001",
      ref: "ODR001",
      date: new Date(2020, 3, 5, 15, 24),
      customer: "Pierre Niney",
      paymentMethod: "Credit Card",
      total: 150,
      status: "completed"
    },
    {
      id: "002",
      ref: "ODR002",
      date: new Date(2020, 3, 1, 10, 11),
      customer: "Robert DeNiro",
      paymentMethod: "PayPal",
      total: 1240,
      status: "pending"
    },
    {
      id: "003",
      ref: "ODR003",
      date: new Date(2020, 2, 27, 19, 12),
      customer: "Robert DeNiro",
      paymentMethod: "PayPal",
      total: 125,
      status: "completed"
    },
    {
      id: "004",
      ref: "ODR004",
      date: new Date(2020, 2, 27, 14, 45),
      customer: "Natalie Portman",
      paymentMethod: "Credit Card",
      total: 110,
      status: "completed"
    },
    {
      id: "005",
      ref: "ODR005",
      date: new Date(2020, 2, 26, 12, 28),
      customer: "Uma Thurman",
      paymentMethod: "Credit Card",
      total: 150,
      status: "completed"
    },
    {
      id: "006",
      ref: "ODR006",
      date: new Date(2020, 2, 26, 8, 19),
      customer: "Uma Thurman",
      paymentMethod: "Credit Card",
      total: 150,
      status: "canceled"
    },
    {
      id: "007",
      ref: "ODR007",
      date: new Date(2020, 2, 26, 8, 13),
      customer: "Uma Thurman",
      paymentMethod: "Credit Card",
      total: 1530,
      status: "rejected"
    },
    {
      id: "008",
      ref: "ODR008",
      date: new Date(2020, 2, 3, 11, 20),
      customer: "Pierre Niney",
      paymentMethod: "Credit Card",
      total: 2450,
      status: "completed"
    },
    {
      id: "009",
      ref: "ODR009",
      date: new Date(2020, 2, 2, 18, 39),
      customer: "Leonardo DiCaprio",
      paymentMethod: "Credit Card",
      total: 1760,
      status: "completed"
    }
  ];
  // render component
  const renderRefAndDate = (ref, date) => {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth()+1).toString().padStart(2, '0');
    let year = date.getFullYear();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    return (
      <RefAndDate>
        <Ref variant="body2">{ref}</Ref>
        <OrderDate variant="body2">{month}/{day}/{year} - {hours}:{minutes}</OrderDate>
      </RefAndDate>
    );
  };
  const renderStatus = (status) => (
    <Status
      status={status}
      variant="body2"
    >
      {status}
    </Status>
  );
  const renderHeader = () => (
    <>
      <Typography variant="overline" component="h2">Management</Typography>
      <Typography variant="h5" component="h1">Orders</Typography>
    </>
  );
  const renderSearch = () => (
    <Grid
      container
      alignItems="center"
    >
      <Grid item>
        <Search 
          bgColor="#fff"
          color="rgba(0, 0, 0, 0.87)"
          elevation={1}
        />
      </Grid>
      <Grid item>
        <StyledSearchButton
          variant="contained"
          color="secondary"
        >
          Search
        </StyledSearchButton>
      </Grid>
    </Grid>
  );
  return (
    <>
      {renderHeader()}
      <StyledGrid
        container
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          {renderSearch()}
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
          >
            Add order
          </Button>
        </Grid>
      </StyledGrid>
      <EnhancedTable
        title="All orders"
        header={["Ref", "Customer", "Payment Method", "Total Amount", "Status"]}
        data={orders.map(order => {
          order.total = '$' + order.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          order.status = renderStatus(order.status);
          order.ref = renderRefAndDate(order.ref, order.date);
          return order;
        })}
        excludeColumns={["id", "date"]}
      />
    </>
  );
};

export default Orders;
