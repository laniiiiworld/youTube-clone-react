import React, { Component } from 'react';
import styles from './keywordSearch.module.css';

class KeywordSearch extends Component {
  inputRef = React.createRef();

  onSubmit = (event) => {
    event.preventDefault();
    const keyword = this.inputRef.current.value;
    keyword && this.props.searchKeyword(keyword, []);
  };

  render() {
    return (
      <form className={styles.keywordSearch} onSubmit={this.onSubmit}>
        <input //
          id='keywordSearchInput'
          className={styles.input}
          ref={this.inputRef}
          type='text'
          placeholder='검색'
          autoComplete='off'
          onFocus={this.props.handleInputFocus}
        />
        <button className={styles.button}>
          <i className='fa-solid fa-magnifying-glass'></i>
        </button>
      </form>
    );
  }
}

export default KeywordSearch;
