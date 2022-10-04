import React, { Component } from 'react';
import './app.css';
import '@fortawesome/fontawesome-free/js/all.js';
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import { routeChange } from './service/router.js';

class App extends Component {
  state = { videoId: '', videos: [], video: {}, channel: {} };

  componentDidMount() {
    this.getVideosData();

    //브라우저에서 뒤로가기, 앞으로가기 등으로 URL이 변경된 경우 감지
    window.addEventListener('popstate', async () => {
      const { pathname } = window.location;
      if (pathname.indexOf('/detail') === 0) {
        await this.getVideoItemData(pathname.split('/')[2]);
      } else {
        this.setState({ ...this.state });
      }
    });
  }

  //로고 클릭 시 메인 페이지로 이동
  handleLogoClick = () => {
    routeChange(`/`);
    this.getVideosData();
  };

  //메인 페이지 - 비디오 목록 가져오기
  getVideosData = async () => {
    try {
      const videos = await this.props.youtube.videos();
      this.setState({ videos, videoId: '', video: {}, channel: {} });
    } catch (error) {
      console.log(error);
    }
  };

  //검색 페이지 - 조회 결과 가져오기
  handleSubmit = async (keyword) => {
    try {
      const videos = await this.props.youtube.search(keyword);
      routeChange(`/search`);
      this.setState({ videos, videoId: '', video: {}, channel: {} });
    } catch (error) {
      console.log(error);
    }
  };

  //비디오 클릭시
  handleVideoClick = async (videoId) => {
    routeChange(`/detail/${videoId}`);
    await this.getVideoItemData(videoId);
  };

  //상세 페이지 - 비디오와 채널 데이터 가져오기
  getVideoItemData = async (videoId) => {
    const video = await this.props.youtube.videoDetail(videoId);
    video.snippet.description = setDescription(video.snippet.description);

    const channelId = video.snippet.channelId;
    const channel = await this.props.youtube.videoChannel(channelId);
    channel.statistics = { ...channel.statistics, subscribers: setSubscribers(channel.statistics.subscriberCount) };

    this.setState({ ...this.state, videoId, video, channel });
  };

  render() {
    window.scrollTo(0, 0);
    const { pathname } = window.location;
    let page;
    if (pathname === '/') {
      page = (
        <MainPage //
          videos={this.state.videos}
          handleVideoClick={this.handleVideoClick}
        />
      );
    } else if (pathname.indexOf('/detail') === 0) {
      page = (
        <VideoDetailPage //
          youtube={this.props.youtube}
          videoId={this.state.videoId}
          video={this.state.video}
          channel={this.state.channel}
          videos={this.state.videos}
          handleVideoClick={this.handleVideoClick}
        />
      );
    } else if (pathname.indexOf('/search') === 0) {
      page = (
        <VideoSearchPage //
          videos={this.state.videos}
          handleVideoClick={this.handleVideoClick}
        />
      );
    }

    return (
      <>
        <Header handleLogoClick={this.handleLogoClick} handleSubmit={this.handleSubmit} />
        {page}
      </>
    );
  }
}

export default App;

//상세 페이지 - 비디오 설명에 있는 링크와 태그 형식 만들기
function setDescription(description) {
  //줄바꿈 변환
  let str = description.replaceAll('\n', '<br/>');
  //url link로 변경
  str = str.replace(/(?:https?:\/\/)[a-zA-Z0-9\.\/\-\_]+/g, (link) => `<a href='${link}' target='_blank'>${link}</a>`);
  //태그들 link로 변경
  str = str.replace(/#[a-zA-Z0-9ㄱ-ㅎ가-힣]+/g, (tag) => `<a href='#'>${tag}</a>`);
  return str;
}

//상세 페이지 - 채널 구독자 수
function setSubscribers(subscriberCount) {
  if (subscriberCount.length > 5) {
    return `${Math.floor(Number(subscriberCount) / 10000)}만명`;
  } else if (subscriberCount.length > 4) {
    return `${Math.floor(Number(subscriberCount) / 1000) / 10}만명`;
  }
  return subscriberCount;
}
