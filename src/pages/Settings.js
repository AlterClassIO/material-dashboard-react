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
const SubscriptionCard = styled(Card)`
  margin-bottom: 24px;
`;
const LeftGridItem = styled(Grid)`
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;
const RightGridItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Status = styled(Typography)`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
  text-transform: uppercase;
`;
const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 300;
  line-height: 1.5;
  margin-bottom: 24px;
`;
const Message = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
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
        <Grid container spacing={4}>
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
                  <Grid container spacing={3}>
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
  const renderTabPanelSubscription = () => {
    const items = [
      {
        status: 'Expired',
        title: 'The Easy Way to Learn React - MasterClass',
        startDate: 'February 15, 2020',
        brand: 'Visa', 
        last4: '4987'
      }
    ];
    return (
      <TabPanel>
        <Card>
          <CardHeader 
            disableTypography={true}
            title={<Typography variant="h6">Subscriptions</Typography>}
          />
          <Divider />
          <CardContent>
            {
              items.map(item => (
                <SubscriptionCard>
                  <CardContent>
                    <Grid container spacing={4} key={item.title}>
                      <LeftGridItem item xs={4}>
                        <Status variant="subtitle2">{item.status}</Status>
                        <Title variant="subtitle1">{item.title}</Title>
                        <Typography variant="body2"><strong>Enrolled on:</strong> {item.startDate}</Typography>
                        <Typography variant="body2"><strong>Payment method:</strong> {item.brand} {item.last4}</Typography>
                      </LeftGridItem>
                      <RightGridItem item xs={8}>
                        <Message>
                          <Typography variant="body1">Your subscription has expired. Renew it to keep on learning!</Typography>
                        </Message>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                        >
                          Renew
                        </Button>
                      </RightGridItem>
                    </Grid>
                  </CardContent>
                </SubscriptionCard>
              ))
            }
          </CardContent>
        </Card>
      </TabPanel>
    );
  };
  const renderTabPanelNotifications = () => {
    const items = [
      {
        title: "Marketing Communications",
        caption: "Learn about new courses and programs, scholarship opportunities and upcoming special events.",
        checkboxes: [
          { 
            name: 'email',
            label: 'Email alerts',
            checked: emailMarketing, 
            disabled: false, 
            onChange: (e) => setEmailMarketing(e.target.checked)
          },
          { 
            name: 'sms',
            label: <>SMS<FormHelperText>Phone number is missing and/or unverified.</FormHelperText></>,
            checked: false,
            disabled: true,
            onChange: null
          }
        ]
      },
      {
        title: "Community",
        caption: "Send me personalized messages from my Community Manager about events and news in the field.",
        checkboxes: [
          { 
            name: 'email',
            label: 'Email alerts',
            checked: emailCommunity,
            disabled: false,
            onChange: (e) => setEmailCommunity(e.target.checked)
          },
          { 
            name: 'sms',
            label: <>SMS<FormHelperText>Phone number is missing and/or unverified.</FormHelperText></>,
            checked: false,
            disabled: true,
            onChange: null 
          }
        ]
      },
      {
        title: "Career and Alumni Services",
        caption: "Keep me connected with career and alumni support included in my program.",
        checkboxes: [
          { 
            name: 'email',
            label: 'Email alerts',
            checked: emailServices,
            disabled: false,
            onChange: (e) => setEmailServices(e.target.checked)
          },
          { 
            name: 'sms',
            label: <>SMS<FormHelperText>Phone number is missing and/or unverified.</FormHelperText></>,
            checked: false,
            disabled: true,
            onChange: null
          }
        ]
      },
    ];
    return (
      <TabPanel>
        <Card>
          <CardHeader 
            disableTypography={true}
            title={<Typography variant="h6">Notifications</Typography>}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={4}>
              {
                items.map(item => (
                  <Grid item xs={12} md={4} key={item.title}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <Typography variant="caption">{item.caption}</Typography>
                    <CheckboxContainer>
                      <FormControl component="fieldset">
                        {
                          item.checkboxes.map(checkbox => (
                            <FormControlLabel
                              key={checkbox.label}
                              control={
                                <Checkbox
                                  checked={checkbox.checked}
                                  onChange={checkbox.onChange}
                                  name={checkbox.name}
                                  disabled={checkbox.disabled}
                                />
                              }
                              label={checkbox.label}
                            />
                          ))
                        }
                      </FormControl>
                    </CheckboxContainer>
                  </Grid>
                ))
              }
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
