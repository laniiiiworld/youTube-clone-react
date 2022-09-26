import React, { Component } from 'react';
import styles from './videoDetail.module.css';

const EMBED_URL = 'https://www.youtube.com/embed/';

class VideoDetail extends Component {
  render() {
    const video = this.props.video;
    return (
      <>
        <iframe //
          className={styles.videoPlayer}
          src={EMBED_URL + video.id.videoId}
          type='text/html'
          frameborder='0'
          allowFullScreen
        />
        <div className={styles.title}>{video.snippet.title}</div>
        <div className={styles.channelTitle}>{video.snippet.channelTitle}</div>
      </>
    );
  }
}

export default VideoDetail;
