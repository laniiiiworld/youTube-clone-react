import React, { Component } from 'react';
import VideoDetail from '../videoDetail/videoDetail';
import VideoList from '../videoList/videoList';
import styles from './videoDetailPage.module.css';

class VideoDetailPage extends Component {
  render() {
    return (
      <main className={styles.videoDetailPage}>
        <div className={styles.content}>
          <VideoDetail //
            video={this.props.video}
          />
        </div>
        <div className={styles.list}>
          <VideoList //
            displayType={`list`}
            videos={this.props.videos}
            handleVideoClick={this.props.handleVideoClick}
          />
        </div>
      </main>
    );
  }
}

export default VideoDetailPage;
