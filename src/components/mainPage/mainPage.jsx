import React, { Component } from 'react';
import styles from './mainPage.module.css';
import VideoList from '../videoList/videoList';

class MainPage extends Component {
  render() {
    return (
      <main className={styles.mainPage}>
        <VideoList //
          displayType={`grid`}
          videos={this.props.videos}
          handleVideoClick={this.props.handleVideoClick}
        />
      </main>
    );
  }
}

export default MainPage;
