import React, { PureComponent } from 'react';
import KeywordSearchArea from '../keywordSearchArea/keywordSearchArea';
import styles from './header.module.css';

class Header extends PureComponent {
  onLogoClick = (event) => {
    this.props.handleLogoClick();
  };

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.logo} onClick={this.onLogoClick}>
          <img className={styles.logoImg} src='/images/logo.png' alt='logo'></img>
          <span>YouTube</span>
        </div>
        <KeywordSearchArea handleSearch={this.props.handleSearch} />
        <div className={styles.icons}></div>
      </header>
    );
  }
}

export default Header;
