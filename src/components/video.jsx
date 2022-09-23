import React, { Component } from 'react';

class Video extends Component {
  videoId = React.createRef();

  onVideoClick = (event) => {
    this.props.handleVideoClick(this.videoId);
  };

  render() {
    const video = this.props.video;
    this.videoId = video.id.videoId;
    return (
      <div ref={this.videoId} className='video' onClick={this.onVideoClick}>
        <img className='thumbnail' src={video.snippet.thumbnails.high.url}></img>
        <div className='info'>
          <div className='title'>{video.snippet.title}</div>
          <div className='channelTitle'>{video.snippet.channelTitle}</div>
        </div>
      </div>
    );
  }
}

export default Video;
