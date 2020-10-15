import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '600px',
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
      }}
      alt='Loading'
    />
  </Fragment>
);
