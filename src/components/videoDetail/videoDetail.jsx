import React, { Component } from 'react';
import styles from './videoDetail.module.css';

const EMBED_URL = 'https://www.youtube.com/embed/';

class VideoDetail extends Component {
  render() {
    const video = this.props.video.snippet;

    return (
      <>
        <iframe //
          className={styles.videoPlayer}
          src={EMBED_URL + this.props.video.id}
          type='text/html'
          frameBorder='0'
          allowFullScreen
        />
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
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: video.description }}></div>
          <button className={styles.moreBtn}>더보기</button>
          <button className={styles.shortBtn}>간략히</button>
        </div>
      </>
    );
  }
}

export default VideoDetail;
