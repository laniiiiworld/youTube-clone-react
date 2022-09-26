import React, { Component } from 'react';
import styles from './videoSearchPage.module.css';
import VideoList from '../videoList/videoList';

class VideoSearchPage extends Component {
  render() {
    return (
      <main className={styles.videoSearchPage}>
        <VideoList //
          displayType={`grid`}
          videos={this.props.videos}
          handleVideoClick={this.props.handleVideoClick}
        />
      </main>
    );
  }
}

export default VideoSearchPage;
