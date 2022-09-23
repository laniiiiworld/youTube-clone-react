import React, { Component } from 'react';
import Video from '../video/video';
import styles from './videoList.module.css';

class VideoList extends Component {
  render() {
    const videos = this.props.videos;
    return (
      <ul className={styles.videoList}>
        {videos.map((video) => (
          <Video key={video.id.videoId} video={video} handleVideoClick={this.props.handleVideoClick} />
        ))}
      </ul>
    );
  }
}

export default VideoList;
