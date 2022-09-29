import React, { Component } from 'react';
import KeywordSearchArea from '../keywordSearchArea/keywordSearchArea';
import styles from './header.module.css';

class Header extends Component {
  render() {
    return (
      <header className={styles.nav}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src='/images/logo.png' alt='logo'></img>
          <span>YouTube</span>
        </div>
        <KeywordSearchArea handleSubmit={this.props.handleSubmit} />
        <div className={styles.icons}></div>
      </header>
    );
  }
}

export default Header;
