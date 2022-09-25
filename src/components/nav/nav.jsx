import React, { Component } from 'react';
import KeywordSearchArea from '../keywordSearchArea/keywordSearchArea';
import styles from './nav.module.css';

class Nav extends Component {
  render() {
    return (
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => this.props.handleVideoClick('')}>
          <img className={styles.logoImg} src='/images/logo.png' alt='logo'></img>
          <span>YouTube</span>
        </div>
        <KeywordSearchArea handleSubmit={this.props.handleSubmit} />
        <div className={styles.icons}></div>
      </nav>
    );
  }
}

export default Nav;
