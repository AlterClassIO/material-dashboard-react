import React, { useState } from 'react';
import styled from 'styled-components';
// @material-ui/core components
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
// core components
//...

// styled components
const StyledTabs = styled(Tabs)`
  margin-top: 24px;
`;
const TabPanel = styled.div`
  margin-top: 24px;
`;
const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
`;

// main component
const Settings = () => {
  // state
  const [currentTab, setCurrentTab] = useState(0);
  const [makeProfilePublic, setMakeProfilePublic] = useState(true);
  const [availableToHire, setAvailableToHire] = useState(false);
  // function to handle tab selection
  const handleTabChange = (e, newValue) => {
    setCurrentTab(newValue);
  };

  // render component
  const renderHeader = () => (
    <>
      <Typography variant="overline" component="h2">Settings</Typography>
      <Typography variant="h5" component="h1">Change account information</Typography>
    </>
  );
  const renderTabs = () => (
    <>
      <StyledTabs
        value={currentTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="tabs"
      >
        <Tab value={0} label="General" />
        <Tab value={1} label="Subscription" />
        <Tab value={2} label="Notifications" />
        <Tab value={3} label="Security" />
      </StyledTabs>
      <Divider />
    </>
  );
  const renderTabPanel0 = () => {
    const textFields = [
      { id: "firstName", label: "First name", defaultValue: "Marion" },
      { id: "lastName", label: "Last name", defaultValue: "Cotillard" },
      { id: "emailAddress", label: "Email address", defaultValue: "marion.cotillard@alterclass.io" },
      { id: "phoneNumber", label: "Phone number", defaultValue: "+33 611223344" },
      { id: "city", label: "City", defaultValue: "Lyon", size: 4 },
      { id: "state", label: "State", defaultValue: "Rhône", size: 4 },
      { id: "country", label: "Country", defaultValue: "France", size: 4 }
    ];
    const switchFields = [
      { 
        checked: makeProfilePublic,
        onChange: () => setMakeProfilePublic(!makeProfilePublic),
        name: "makeProfilePublic",
        header: "Make profile public",
        subHeader: "Enabling this setting will allow anyone to view your profile and contact information."
      },
      { 
        checked: availableToHire,
        onChange: () => setAvailableToHire(!availableToHire),
        name: "availableToHire",
        header: "Available to hire",
        subHeader: "Enabling this setting will let companies know that you are available for your next challenge."
      }
    ];
    return (
      <TabPanel>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card>
              <StyledCardContent>
                <StyledAvatar alt="Marion Cotillard" src="avatar.jpg" />
                <Typography variant="h6" component="h3">Marion Cotillard</Typography>
                <Typography variant="body1">Lyon, FRANCE</Typography>
              </StyledCardContent>
              <StyledCardContent>
                <Button fullWidth={true}>EDIT PICTURE</Button>
              </StyledCardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card>
              <CardHeader 
                disableTypography={true}
                title={<Typography variant="h6">Profile</Typography>}
              />
              <Divider />
              <CardContent>
                <form noValidate>
                  <Grid container spacing={4}>
                    {
                      textFields.map(field => (
                        <Grid item xs={field.size || 6} key={field.id}>
                          <TextField
                            required
                            id={field.id}
                            label={field.label}
                            defaultValue={field.defaultValue}
                            variant="outlined"
                            fullWidth={true}
                          />
                        </Grid>
                      ))
                    }
                    {
                      switchFields.map(field => (
                        <Grid item xs={6} key={field.name}>
                          <Typography variant="subtitle1">{field.header}</Typography>
                          <Typography variant="caption">{field.subHeader}</Typography>
                          <Switch
                            checked={field.checked}
                            onChange={() => field.onChange()}
                            name={field.name}
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </Grid>
                      ))
                    }
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderTabs()}
      {currentTab === 0 && renderTabPanel0()}
    </>
  );
};

export default Settings;
