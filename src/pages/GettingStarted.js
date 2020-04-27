import React from 'react';
// @material-ui/core components
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
// core components
import CodeHighlighter from '../components/CodeHighlighter';

// main component
const GettingStarted = () => {
  const preventDefault = (event) => event.preventDefault();

  return (
    <>
      <Typography variant="h5" component="h1">Getting started</Typography><br />
      <Typography variant="body1">Before proceeding you’ll need to have the laste stabe <Link href="https://nodejs.org/en/" onClick={preventDefault}>NodeJS</Link> and <Link href="https://www.npmjs.com/" onClick={preventDefault}>npm</Link> installed on your machine.</Typography><br />
      
      { /* CLONE */ }
      <br /><Typography variant="h5" component="h2">Clone the repository</Typography><br />
      <CodeHighlighter language="shell">{'git clone https://github.com/AlterClassIO/material-dashboard-react'}</CodeHighlighter><br />
      
      { /* INSTALL */ }
      <br /><Typography variant="h5" component="h2">Install dependencies</Typography><br />
      <Typography variant="body1" component="h2">Open the project folder and install it’s dependencies. You can use any package manager you want. We recommend <Link href="https://yarnpkg.com/" onClick={preventDefault}>Yarn</Link> or <Link href="https://www.npmjs.com/" onClick={preventDefault}>npm</Link>.</Typography><br />
      <CodeHighlighter language="shell">{`cd material-dashboard-react
npm install`}</CodeHighlighter><br />
      
      { /* RUN */ }
      <br /><Typography variant="h5" component="h2">Start development server</Typography><br />
      <Typography variant="body1" component="h2">Once the installation is done, you can now run your app.</Typography><br />
      <CodeHighlighter language="shell">{'npm start'}</CodeHighlighter><br />

      <Typography variant="body1" component="h2">You will see something similar to:</Typography><br />
      <CodeHighlighter language="shell">{`Compiled successfully!
You can now view material-dashboard-react in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.27:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
      `}</CodeHighlighter><br />

      <Typography variant="body1" component="h2">This runs the app in development mode. Open <Link href="http://localhost:3000/" onClick={preventDefault}>localhost:3000</Link> to view it in the browser.</Typography><br />
      <Typography variant="body1" component="h2">The page will automatically reload if you make changes to the code. You will see the build errors and lint warnings in the console. Since we use ESlint you will get detailed warnings.</Typography><br />

      { /* BUILD */ }
      <br /><Typography variant="h5" component="h2">Build production files</Typography><br />
      <Typography variant="body1" component="h2">Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.</Typography><br />
      <Typography variant="body1" component="h2">Your app is ready to be deployed.</Typography><br />
    </>
  );
};

export default GettingStarted;
