import React, { Component } from 'react';
import './app.css';
import { getSearchData, getVideoData } from './api.js';
import Nav from './components/nav';
import MainPage from './components/mainPage';
import VideoDetailPage from './components/videoDetailPage';
import '@fortawesome/fontawesome-free/js/all.js';

class App extends Component {
  state = { videoId: '', videos: [], video: {} };
  handleSubmit = async (keyword) => {
    try {
      const videoList = await getSearchData(keyword);
      this.setState({ ...this.state, videos: videoList.items });
    } catch (error) {
      console.log(error);
    }
  };

  handleVideoClick = (videoId) => {
    this.getVideoItemData(videoId);
  };

  getVideoItemData = async (videoId) => {
    try {
      if (videoId) {
        const video = await getVideoData(videoId);
        this.setState({ ...this.state, videoId, video: video.items[0] });
      } else {
        this.setState({ videos: [], videoId, video: {} });
      }
    } catch (error) {
      console.log(error);
    }
  };

  router = (videoId) => {
    window.scrollTo(0, 0);
    if (videoId) {
      return (
        <>
          <Nav handleSubmit={this.handleSubmit} handleVideoClick={this.handleVideoClick} />
          <VideoDetailPage video={this.state.video} videos={this.state.videos} handleVideoClick={this.handleVideoClick} />
        </>
      );
    }
    return (
      <>
        <Nav handleSubmit={this.handleSubmit} handleVideoClick={this.handleVideoClick} />
        <MainPage videos={this.state.videos} handleVideoClick={this.handleVideoClick} />
      </>
    );
  };
  render() {
    return this.router(this.state.videoId);
  }
}

export default App;
