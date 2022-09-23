import React, { Component } from 'react';

class KeywordSearch extends Component {
  inputRef = React.createRef();

  onSubmit = (event) => {
    event.preventDefault();
    const keyword = this.inputRef.current.value;
    keyword && this.props.handleSubmit(keyword);
  };

  render() {
    return (
      <form className='keywordSearch' onSubmit={this.onSubmit}>
        <input ref={this.inputRef} type='text' placeholder='검색' />
        <button>
          <i className='fa-solid fa-magnifying-glass'></i>
        </button>
      </form>
    );
  }
}

export default KeywordSearch;
