import React from 'react';
import { css } from 'glamor'

import Footer from './footer';
import Header from './header';
import Sidebar from './sidebar';

export default function Layout({ children }) {
  return (
    <div >
      <Header/>
      <div { ...styles.routeContainer }>
        <div { ...styles.mainContainer }>
          { children }
        </div>
      </div>
      <Footer/>
    </div>
  );
}

const styles = {
  routeContainer: css({
    display: 'flex',
    flexDirection: 'row',
  }),
  mainContainer: css({
    width: '80%',
    paddingTop: '20px',
    paddingBottom: '40px',
    marginLeft: '10%',
  }),
}
