import React, { Component } from 'react';
import VideoDetail from '../videoDetail/videoDetail';
import VideoList from '../videoList/videoList';
import styles from './videoDetailPage.module.css';

class VideoDetailPage extends Component {
  state = { video: {}, channel: {} };

  // componentDidMount = async () => {
  //   console.log('componentDidMount');
  //   await this.getVideoItemData(this.props.videoId);
  // };

  getVideoItemData = async (videoId) => {
    const video = await this.props.youtube.videoDetail(videoId);
    video.snippet.description = setDescription(video.snippet.description);
    console.log('getVideoItemData() --->', video);
    const channelId = video.snippet.channelId;
    const channel = await this.props.youtube.videoChannel(channelId);
    channel.statistics = { ...channel.statistics, subscribers: setSubscribers(channel.statistics.subscriberCount) };

    this.setState({ video, channel });
  };

  render() {
    // console.log('render()--->', this.props.videoId, this.state);

    // if (this.state.video === {}) {
    //   return <></>;
    // }

    return (
      <main className={styles.videoDetailPage}>
        <div className={styles.content}>
          <VideoDetail //
            video={this.props.video}
            channel={this.props.channel}
          />
        </div>
        <div className={styles.list}>
          <VideoList //
            displayType={`list`}
            videos={this.props.videos}
            handleVideoClick={this.props.handleVideoClick}
          />
        </div>
      </main>
    );
    // return <h1>test</h1>;
  }
}

export default VideoDetailPage;

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
