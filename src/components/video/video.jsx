import React, { Component } from 'react';
import styles from './video.module.css';

class Video extends Component {
  videoId = React.createRef();

  onVideoClick = (event) => {
    this.props.handleVideoClick(this.videoId);
  };

  render() {
    const video = this.props.video;
    this.videoId = video.id.videoId;
    return (
      <li ref={this.videoId} className={styles.video} onClick={this.onVideoClick}>
        <img className={styles.thumbnail} src={video.snippet.thumbnails.medium.url}></img>
        <div className={styles.info}>
          <p className={styles.title}>{video.snippet.title}</p>
          <p className={styles.channelTitle}>{video.snippet.channelTitle}</p>
        </div>
      </li>
    );
  }
}

export default Video;
