import React, { Component } from 'react';
import VideoItem from './videoItem';
import VideoList from './videoList/videoList';
import './videoDetailPage.css';

class VideoDetailPage extends Component {
  render() {
    return (
      <main className='videoDetailPage'>
        <VideoItem video={this.props.video} />
        <VideoList videos={this.props.videos} handleVideoClick={this.props.handleVideoClick} />
      </main>
    );
  }
}

export default VideoDetailPage;
