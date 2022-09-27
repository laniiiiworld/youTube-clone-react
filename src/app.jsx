import React, { Component } from 'react';
import './app.css';
import Header from './components/header/header';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import '@fortawesome/fontawesome-free/js/all.js';

class App extends Component {
  state = { videoId: '', videos: [], video: {} };

  handleSubmit = async (keyword) => {
    try {
      const videoList = await this.props.youtube.search(keyword);
      this.setState({ videos: videoList.items, videoId: '', video: {} });
    } catch (error) {
      console.log(error);
    }
  };

  handleVideoClick = (videoId) => {
    this.getVideoItemData(videoId);
  };

  getVideoItemData = (videoId) => {
    if (videoId) {
      const video = this.state.videos.find((video) => video.id.videoId === videoId);
      this.setState({ ...this.state, videoId, video });
    } else {
      this.setState({ videos: [], videoId, video: {} });
    }
  };

  router = (videoId) => {
    window.scrollTo(0, 0);

    let page;
    if (videoId) {
      page = <VideoDetailPage video={this.state.video} videos={this.state.videos} handleVideoClick={this.handleVideoClick} />;
    } else {
      page = <VideoSearchPage videos={this.state.videos} handleVideoClick={this.handleVideoClick} />;
    }

    return (
      <>
        <Header handleSubmit={this.handleSubmit} handleVideoClick={this.handleVideoClick} />
        {page}
      </>
    );
  };

  render() {
    return this.router(this.state.videoId);
  }
}

export default App;
