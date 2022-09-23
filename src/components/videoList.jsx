import React, { Component } from 'react';
import Video from './video';

class VideoList extends Component {
  render() {
    const videos = this.props.videos;
    return (
      <div className='videoList'>
        {videos.map((video) => (
          <Video key={video.etag} video={video} handleVideoClick={this.props.handleVideoClick} />
        ))}
      </div>
    );
  }
}

export default VideoList;
