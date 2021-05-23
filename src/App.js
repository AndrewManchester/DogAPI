import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';

import Dogs from './dogs';

const App = () => (
  <Fragment>
   <Container textAlign='center'>
     <Dogs/>
   </Container>
  </Fragment>
);

export default App;
