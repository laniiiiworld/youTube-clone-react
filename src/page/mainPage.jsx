import React, { Component } from 'react';
import VideoList from '../components/videoList';
import './mainPage.css';

class MainPage extends Component {
  render() {
    return (
      <main className='mainPage'>
        <VideoList videos={this.props.videos} handleVideoClick={this.props.handleVideoClick} />
      </main>
    );
  }
}

export default MainPage;
