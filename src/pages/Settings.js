import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import styled from 'styled-components';
// @material-ui/core components
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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
const StyledCardActions = styled(CardActions)`
  padding: 16px;
`;
const CheckboxContainer = styled.div`
  margin-top: 10px;
`;

// main component
const Settings = () => {
  // router hooks
  let { params } = useRouteMatch("/settings/:slug");
  let history = useHistory();
  // state
  const [currentTab, setCurrentTab] = useState('general');
  const [makeProfilePublic, setMakeProfilePublic] = useState(true);
  const [availableToHire, setAvailableToHire] = useState(false);
  const [emailMarketing, setEmailMarketing] = useState(true);
  const [emailCommunity, setEmailCommunity] = useState(true);
  const [emailServices, setEmailServices] = useState(true);
  // function to handle tab selection
  const handleTabChange = (e, newValue) => {
    setCurrentTab(newValue);
    history.replace(newValue);
  };
  // set current tab based on url
  useEffect(() => {
    switch(params.slug) {
      case 'general': setCurrentTab('general'); break;
      case 'subscription': setCurrentTab('subscription'); break;
      case 'notifications': setCurrentTab('notifications'); break;
      case 'security': setCurrentTab('security'); break;
      default: setCurrentTab('general');
    }
  },
  [params.slug]);

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
        <Tab value='general' label="General" />
        <Tab value='subscription' label="Subscription" />
        <Tab value='notifications' label="Notifications" />
        <Tab value='security' label="Security" />
      </StyledTabs>
      <Divider />
    </>
  );
  const renderTabPanelGeneral = () => {
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
                <StyledAvatar alt="Marion Cotillard" src="/avatar.jpg" />
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
  const renderTabPanelSubscription = () => {};
  const renderTabPanelNotifications = () => {
    return (
      <TabPanel>
        <Card>
          <CardHeader 
            disableTypography={true}
            title={<Typography variant="h6">Notifications</Typography>}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">Marketing Communications</Typography>
                <Typography variant="caption">Learn about new courses and programs, scholarship opportunities and upcoming special events.</Typography>
                <CheckboxContainer>
                  <FormControl component="fieldset">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={emailMarketing}
                          onChange={(e) => setEmailMarketing(e.target.checked)} 
                          name="email" 
                        />
                      }
                      label="Email alerts"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={false} disabled={true} onChange={null} name="sms" />}
                      label={<>SMS<FormHelperText>Phone number is missing and/or unverified.</FormHelperText></>}
                    />
                  </FormControl>
                </CheckboxContainer>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">Community</Typography>
                <Typography variant="caption">Send me personalized messages from my Community Manager about events and news in the field.</Typography>
                <CheckboxContainer>
                  <FormControl component="fieldset">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={emailCommunity}
                          onChange={(e) => setEmailCommunity(e.target.checked)} 
                          name="email" 
                        />
                      }
                      label="Email alerts"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={false} disabled={true} onChange={null} name="sms" />}
                      label={<>SMS<FormHelperText>Phone number is missing and/or unverified.</FormHelperText></>}
                    />
                  </FormControl>
                </CheckboxContainer>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">Career and Alumni Services</Typography>
                <Typography variant="caption">Keep me connected with career and alumni support included in my Nanodegree program.</Typography>
                <CheckboxContainer>
                  <FormControl component="fieldset">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={emailServices}
                          onChange={(e) => setEmailServices(e.target.checked)} 
                          name="email" 
                        />
                      }
                      label="Email alerts"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={false} disabled={true} onChange={null} name="sms" />}
                      label={<>SMS<FormHelperText>Phone number is missing and/or unverified.</FormHelperText></>}
                    />
                  </FormControl>
                </CheckboxContainer>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <StyledCardActions>
            <Button variant="contained" color="primary">
              SAVE CHANGES
            </Button>
          </StyledCardActions>
        </Card>
      </TabPanel>
    );
  };
  const renderTabPanelSecurity = () => {};

  return (
    <>
      {renderHeader()}
      {renderTabs()}
      {currentTab === 'general' && renderTabPanelGeneral()}
      {currentTab === 'subscription' && renderTabPanelSubscription()}
      {currentTab === 'notifications' && renderTabPanelNotifications()}
      {currentTab === 'security' && renderTabPanelSecurity()}
    </>
  );
};

export default Settings;
