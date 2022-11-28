import React, { Component } from 'react';
import './app.css';
import '@fortawesome/fontawesome-free/js/all.js';
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';
import VideoSearchPage from './components/videoSearchPage/videoSearchPage';
import VideoDetailPage from './components/videoDetailPage/videoDetailPage';
import Loading from './components/loading/loading';
import { routeChange } from './service/router.js';
import { setSelectedKeyword } from './service/storage';

class App extends Component {
  state = { videoId: '', videos: [], video: {}, channel: {}, isLoading: false };

  componentDidMount() {
    this.getVideosData();

    //브라우저에서 뒤로가기, 앞으로가기 등으로 URL이 변경된 경우 감지
    window.addEventListener('popstate', async () => {
      const { pathname } = window.location;
      if (pathname.indexOf('/detail') === 0) {
        await this.getVideoDetailData(pathname.split('/')[2]);
      } else {
        this.setState({ ...this.state });
      }
    });
  }

  /** 로고 클릭 시 메인 페이지로 이동 */
  handleLogoClick = () => {
    routeChange(`/`);
    this.getVideosData();
  };

  /** 메인 페이지 - 비디오 목록 가져오기 */
  getVideosData = async () => {
    this.setState({ ...this.state, isLoading: true });
    try {
      const videos = await this.props.youtube.videos();
      this.setState({ videos, videoId: '', video: {}, channel: {}, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  /** 검색 페이지 - API에서 검색 결과 가져오기 */
  getSearchResultVideos = async (keyword) => {
    this.setState({ ...this.state, isLoading: true });
    try {
      const videos = await this.props.youtube.search(keyword);
      this.setState({ videos, videoId: '', video: {}, channel: {}, isLoading: false });
      return videos;
    } catch (error) {
      this.setState({ videos: [], videoId: '', video: {}, channel: {}, isLoading: false });
      return [];
    }
  };

  /** 검색 페이지로 이동 */
  handleSearch = async (keyword) => {
    if (!keyword) return;
    setSelectedKeyword('selectedKeywords', keyword);

    try {
      const data = await this.getSearchResultVideos(keyword);
      //error가 발생하지 않은 경우에만 이동
      if (data.length) {
        routeChange(`/search`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** 비디오 클릭시 */
  handleVideoClick = async (videoId) => {
    routeChange(`/detail/${videoId}`);
    await this.getVideoDetailData(videoId);
  };

  /** 상세 페이지 - 비디오와 채널 데이터 가져오기 */
  getVideoDetailData = async (videoId) => {
    this.setState({ ...this.state, isLoading: true });

    const video = await this.props.youtube.videoDetail(videoId);
    video.snippet.description = setDescription(video.snippet.description);

    const channelId = video.snippet.channelId;
    const channel = await this.props.youtube.videoChannel(channelId);
    channel.statistics = { ...channel.statistics, subscribers: setSubscribers(channel.statistics.subscriberCount) };

    this.setState({ ...this.state, videoId, video, channel, isLoading: false });
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
        <Header handleLogoClick={this.handleLogoClick} handleSearch={this.handleSearch} />
        {this.state.isLoading ? <Loading /> : page}
      </>
    );
  }
}

export default App;

/** 상세 페이지 - 비디오 설명에 있는 링크와 태그 형식 만들기 */
function setDescription(description) {
  //줄바꿈 변환
  let str = description.replaceAll('\n', '<br/>');
  //url link로 변경
  str = str.replace(/(?:https?:\/\/)[a-zA-Z0-9\.\/\-\_]+/g, (link) => `<a href='${link}' target='_blank'>${link}</a>`);
  //태그들 link로 변경
  str = str.replace(/#[a-zA-Z0-9ㄱ-ㅎ가-힣]+/g, (tag) => `<a href='#'>${tag}</a>`);
  return str;
}

/** 상세 페이지 - 채널 구독자 수 */
function setSubscribers(subscriberCount) {
  const formatter = Intl.NumberFormat(navigator.language, {
    notation: 'compact',
    compactDisplay: 'short',
  });
  return String(formatter.format(Number(subscriberCount)));
}
