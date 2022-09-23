import React, { Component } from 'react';
const EMBED_URL = 'https://www.youtube.com/embed/';

class VideoItem extends Component {
  render() {
    const video = this.props.video;
    return (
      <div className='videoItem'>
        <iframe className='videoPlayer' src={EMBED_URL + video.id} />
        <div className='title'>{video.snippet.title}</div>
        <div className='channelTitle'>{video.snippet.channelTitle}</div>
      </div>
    );
  }
}

export default VideoItem;
