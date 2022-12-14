import React, { Component } from 'react';
import styles from './videoDetail.module.css';

const EMBED_URL = 'https://www.youtube.com/embed/';

class VideoDetail extends Component {
  state = {
    isMore: false,
  };

  //더보기, 간략히 버튼
  handleIsMoreToggle = () => {
    const { isMore } = this.state;
    this.setState({ isMore: !isMore });
  };

  render() {
    const video = this.props.video.snippet;
    const { isMore } = this.state;
    return (
      <>
        <section className={styles.videoPlayer}>
          <iframe src={EMBED_URL + this.props.video.id} frameBorder='0' allowFullScreen></iframe>
        </section>
        <div className={styles.title}>{video.title}</div>
        <ul className={styles.icons}>
          <li>
            <button>
              <i className={`${styles.icon} ${'fa-regular fa-thumbs-up active'}`}></i>
              <span>0</span>
            </button>
          </li>
          <li>
            <button>
              <i className={`${styles.icon} ${'fa-regular fa-thumbs-down'}`}></i>
              <span>0</span>
            </button>
          </li>
          <li>
            <button>
              <i className={`${styles.icon} ${'fas fa-share active'}`}></i>
              <span>공유</span>
            </button>
          </li>
          <li>
            <button>
              <i className={`${styles.icon} ${'fa-solid fa-download active'}`}></i>
              <span>오프라인 저장</span>
            </button>
          </li>
          <li>
            <button>
              <i className={`${styles.icon} ${'fas fa-plus active'}`}></i>
              <span>저장</span>
            </button>
          </li>
        </ul>
        <hr />
        <div className={styles.channelArea}>
          <div className={styles.channelInfo}>
            <img alt='' className={styles.user} src={this.props.channel.snippet.thumbnails.default.url} />
            <div className={styles.channel}>
              <span className={styles.channelTitle}>{video.channelTitle}</span>
              <span className={styles.subscribers}>{this.props.channel.statistics.subscribers}</span>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn__subscription}>구독</button>
            <i className='fa-solid fa-bell'></i>
          </div>
        </div>
        <div className={styles.descriptionArea}>
          <div className={`${styles.description} ${isMore ? '' : styles.clamp}`} dangerouslySetInnerHTML={{ __html: video.description }}></div>
          <button className={`${styles.moreBtn} ${isMore ? styles.displayNone : ''}`} onClick={this.handleIsMoreToggle}>
            더보기
          </button>
          <button className={`${styles.shortBtn} ${isMore ? '' : styles.displayNone}`} onClick={this.handleIsMoreToggle}>
            간략히
          </button>
        </div>
      </>
    );
  }
}

export default VideoDetail;
