import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

class Live extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
  }

  render() {
    return(
      <div { ...styles.routeContainer }>
        coming soon...
      </div>
    );
  }
}

const mapActionsToProps = {
};

const mapStateToProps = ({

}) => {

  return {

  };
}

const styles = {
  routeContainer: css({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '70%',
    textAlign: 'center',
  }),
  reviewSectionTitle: css({
    marginTop: '20px',
  }),
  completeMessage: css({
    marginTop: '100px',
  }),
  date: css({
    marginLeft: '10px',
  }),
  buttonContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  }),
}

export default connect(mapStateToProps, mapActionsToProps)(Live);
