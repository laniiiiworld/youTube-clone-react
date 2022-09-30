import React, { Component } from 'react';
import Video from '../video/video';
import styles from './videoList.module.css';

class VideoList extends Component {
  render() {
    const videos = this.props.videos;
    const displayType = this.props.displayType === 'list' ? styles.list : styles.grid;
    return (
      <ul className={`${styles.videoList} ${displayType}`}>
        {videos.map((video) => (
          <Video key={video.id.videoId ? video.id.videoId : video.id} video={video} displayType={this.props.displayType} handleVideoClick={this.props.handleVideoClick} />
        ))}
      </ul>
    );
  }
}

export default VideoList;
