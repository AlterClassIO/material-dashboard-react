import React from 'react';
import styled from 'styled-components';
// @material-ui/core components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// @material-ui/icons components
//..
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

const Projects = () => {
  // state
  const projects = [
    {
      id: "001",
      name: "Dashboard desgin",
      price: 17550,
      startDate: new Date(2020, 2, 15),
      endDate: new Date(2020, 3, 15),
      status: "completed"
    }
  ];

  // render component
  const renderStatus = (status) => (
    <Status
      status={status}
      variant="body2"
    >
      {status}
    </Status>
  );
  const renderDate = (date) => {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth()+1).toString().padStart(2, '0');
    let year = date.getFullYear();
    return <Typography variant="body2">{month}/{day}/{year}</Typography>;
  };
  const renderHeader = () => (
    <>
      <Typography variant="overline" component="h2">Management</Typography>
      <Typography variant="h5" component="h1">Projects</Typography>
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
            Add project
          </Button>
        </Grid>
      </StyledGrid>
      <EnhancedTable
        title="All projects"
        header={["Name", "Budget", "Start Date", "Deadline", "Status"]}
        data={projects.map(project => {
          project.price = '$' + project.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          project.status = renderStatus(project.status);
          project.startDate = renderDate(project.startDate);
          project.endDate = renderDate(project.endDate);
          return project;
        })}
        excludeColumns={["id"]}
      />
    </>
  );
};

export default Projects;
