import React from 'react';
import { css } from 'glamor'

import Footer from './footer';
import Header from './header';

export default function Layout({ children }) {
  return (
    <div>
      <Header/>
        <div { ...styles.routeContainer }>
          { children }
        </div>
      <Footer/>
    </div>
  );
}

const styles = {
  routeContainer: css({
    margin: '0 auto',
    width: '80%',
    paddingTop: '20px',
    paddingBottom: '20px',
  })
}
