import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default ({ style }) => (
  <Fragment>
    <img
      src={spinner}
      style={
        style
          ? style
          : {
              width: '550px',
              margin: 'auto',
              display: 'block',
              maxWidth: '100%',
            }
      }
      alt='Loading'
    />
  </Fragment>
);
