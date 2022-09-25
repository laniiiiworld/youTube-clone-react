import React, { Component } from 'react';
import KeywordSearch from '../keywordSearch/keywordSearch';
import styles from './keywordSearchArea.module.css';

class KeywordSearchArea extends Component {
  render() {
    return (
      <div className={styles.keywordSearchArea}>
        <KeywordSearch handleSubmit={this.props.handleSubmit} />
      </div>
    );
  }
}

export default KeywordSearchArea;
