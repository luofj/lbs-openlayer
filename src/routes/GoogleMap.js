import React from 'react';
import { connect } from 'dva';
import GoogleMaps from '../components/GoogleMap';
import styles from './GoogleMap.css';

function GoogleMap() {
  return (
    <div className={styles.normal}>
      <GoogleMaps />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(GoogleMap);
