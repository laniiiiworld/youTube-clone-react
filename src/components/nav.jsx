import React, { Component } from 'react';
import KeywordSearchArea from './keywordSearchArea';
import styles from './nav.css';

class Nav extends Component {
  render() {
    return (
      <nav>
        <div className='logo' onClick={() => this.props.handleVideoClick('')}>
          <img src='/images/logo.png'></img>
          <span>YouTube</span>
        </div>
        <KeywordSearchArea handleSubmit={this.props.handleSubmit} />
      </nav>
    );
  }
}

export default Nav;
