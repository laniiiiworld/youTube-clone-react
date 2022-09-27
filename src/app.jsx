import React, { Component } from 'react';
import './app.css';
import Header from './components/header/header';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import '@fortawesome/fontawesome-free/js/all.js';

class App extends Component {
  state = { videoId: '', videos: [], video: {}, channel: {} };

  handleSubmit = async (keyword) => {
    try {
      const videoList = await this.props.youtube.search(keyword);
      this.setState({ videos: videoList.items, videoId: '', video: {}, channel: {} });
    } catch (error) {
      console.log(error);
    }
  };

  handleVideoClick = (videoId) => {
    this.getVideoItemData(videoId);
  };

  getVideoItemData = async (videoId) => {
    if (videoId) {
      const video = await this.props.youtube.videoDetail(videoId);
      video.snippet.description = setDescription(video.snippet.description);

      const channelId = video.snippet.channelId;
      const channel = await this.props.youtube.videoChannel(channelId);
      channel.statistics = { ...channel.statistics, subscribers: setSubscribers(channel.statistics.subscriberCount) };

      this.setState({ ...this.state, videoId, video, channel });
    } else {
      this.setState({ videos: [], videoId, video: {}, channel: {} });
    }
  };

  router = (videoId) => {
    window.scrollTo(0, 0);

    let page;
    if (videoId) {
      page = <VideoDetailPage video={this.state.video} videos={this.state.videos} channel={this.state.channel} handleVideoClick={this.handleVideoClick} />;
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

function setDescription(description) {
  //줄바꿈 변환
  let str = description.replaceAll('\n', '<br/>');
  //url link로 변경
  str = str.replace(/(?:https?:\/\/)[a-zA-Z0-9\.\/\-\_]+/g, (link) => `<a href='${link}' target='_blank'>${link}</a>`);
  //태그들 link로 변경
  str = str.replace(/#[a-zA-Z0-9ㄱ-ㅎ가-힣]+/g, (tag) => `<a href='#'>${tag}</a>`);
  return str;
}

function setSubscribers(subscriberCount) {
  if (subscriberCount.length > 5) {
    return `${Math.floor(Number(subscriberCount) / 10000)}만명`;
  } else if (subscriberCount.length > 4) {
    return `${Math.floor(Number(subscriberCount) / 1000) / 10}만명`;
  }
  return subscriberCount;
}
