import React, { Component } from 'react';
import styles from './video.module.css';

class Video extends Component {
  onVideoClick = (event) => {
    const video = this.props.video;
    this.props.handleVideoClick(video.id.videoId ? video.id.videoId : video.id);
  };

  render() {
    const video = this.props.video;
    return (
      <li className={styles.video} onClick={this.onVideoClick}>
        <div className={styles.thumbnail}>
          <img className={styles.thumbnailImg} src={video.snippet.thumbnails.medium.url}></img>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{video.snippet.title}</p>
          <p className={styles.channelTitle}>{video.snippet.channelTitle}</p>
        </div>
      </li>
    );
  }
}

export default Video;
