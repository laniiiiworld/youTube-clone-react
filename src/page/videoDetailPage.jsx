import React, { Component } from 'react';
import VideoItem from '../components/videoItem';
import VideoList from '../components/videoList';
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
