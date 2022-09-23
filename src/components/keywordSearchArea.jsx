import React, { Component } from 'react';
import KeywordSearch from './keywordSearch';

class KeywordSearchArea extends Component {
  render() {
    return (
      <div className='keywordSearchArea'>
        <KeywordSearch handleSubmit={this.props.handleSubmit} />
      </div>
    );
  }
}

export default KeywordSearchArea;
