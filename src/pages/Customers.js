import React from 'react';
import styled, { css } from 'styled-components';
// @material-ui/core components
import { amber } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// @material-ui/icons components
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// core components
import Search from '../components/Search';
import EnhancedTable from '../components/EnhancedTable';

// styled components
const User = styled.div`
  display: flex;
  align-items: center;
`;
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled(Typography)`
  font-weight: 500;
`;
const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;
const StyledSearchButton = styled(Button)`
  margin-left: 10px;
`;
const starIconStyles = css`
  color: ${amber[400]};
`;
const StyledStarIcon = styled(StarIcon)`${starIconStyles}`;
const StyledStarHalfIcon = styled(StarHalfIcon)`${starIconStyles}`;

const Customers = () => {
  // state
  const customers = [
    { 
      id: "001",
      avatar: "/avatar1.jpg",
      name: "Robert DeNiro",
      email: "robert.deniro@alterclass.io",
      location: "Los Angeles, USA",
      spent: 4500,
      rating: 4.5
    },
    {
      id: "002",
      avatar: "/avatar1.jpg",
      name: "Al Pacino",
      email: "al.pacino@alterclass.io",
      location: "San Francisco, USA",
      spent: 300,
      rating: 4
    },
    { 
      id: "003",
      avatar: "/avatar1.jpg",
      name: "Pierre Niney",
      email: "pierre.niney@alterclass.io",
      location: "Paris, France",
      spent: 2600,
      rating: 3.5
    },
    { 
      id: "004",
      avatar: "/avatar2.jpg",
      name: "Natalie Portman",
      email: "natalie.portman@alterclass.io",
      location: "Lyon, France",
      spent: 3500,
      rating: 5
    },
    { 
      id: "005",
      avatar: "/avatar2.jpg",
      name: "Emma Stone",
      email: "emma.stone@alterclass.io",
      location: "Amsterdam, Netherlands",
      spent: 1750,
      rating: 4
    },
    { 
      id: "006",
      avatar: "/avatar2.jpg",
      name: "Uma Thurman",
      email: "uma.thurman@alterclass.io",
      location: "Roma, Italy",
      spent: 8120,
      rating: 5
    },
    { 
      id: "007",
      avatar: "/avatar1.jpg",
      name: "Leonardo DiCaprio",
      email: "leonardo.dicaprio@alterclass.io",
      location: "Los Angeles, USA",
      spent: 3400,
      rating: 4
    },
    { 
      id: "008",
      avatar: "/avatar1.jpg",
      name: "Matthew McConaughey",
      email: "matthew.mcconaughey@alterclass.io",
      location: "Los Angeles, USA",
      spent: 600,
      rating: 4.5
    },
    { 
      id: "009",
      avatar: "/avatar1.jpg",
      name: "Kevin Spacey",
      email: "kevin.spacey@alterclass.io",
      location: "Madrid, Spain",
      spent: 5100,
      rating: 3
    },
    { 
      id: "010",
      avatar: "/avatar2.jpg",
      name: "Jessica Chastain",
      email: "jessica.chastain@alterclass.io",
      location: "Shanghai, China",
      spent: 1200,
      rating: 4
    },
  ];
  // method to render star rating
  const renderUser = (avatar, name, email) => (
    <User>
      <StyledAvatar alt={name} src={avatar} />
      <NameContainer>
        <Name variant="body2">{name}</Name>
        <Typography variant="body2">{email}</Typography>
      </NameContainer>
    </User>
  );
  const renderRatingStars = (rating) => {
    let stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<StyledStarIcon />);
    }
    if (rating - Math.floor(rating) > 0) {
      stars.push(<StyledStarHalfIcon />);
    }
    while (stars.length < 5) {
      stars.push(<StarBorderIcon />);
    }
    return stars;
  };
  // render component
  const renderHeader = () => (
    <>
      <Typography variant="overline" component="h2">Management</Typography>
      <Typography variant="h5" component="h1">Customers</Typography>
    </>
  );
  const renderSearch = () => (
    <SearchContainer>
      <Search 
        bgColor="#fff"
        color="rgba(0, 0, 0, 0.87)"
        elevation={1}
      />
      <StyledSearchButton
        variant="contained"
        color="secondary"
      >
        Search
      </StyledSearchButton>
    </SearchContainer>
  );

  return (
    <>
      {renderHeader()}
      {renderSearch()}
      <EnhancedTable
        title="All customers"
        header={["Name", "Location", "Total Spent", "Rating"]}
        data={customers.map(customer => {
          customer.rating = renderRatingStars(customer.rating);
          customer.spent = '$' + customer.spent.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          customer.name = renderUser(customer.avatar, customer.name, customer.email);
          return customer;
        })}
        excludeColumns={["id", "email", "avatar"]}
      />
    </>
  );
};

export default Customers;
