import React, { Component } from 'react';
import KeywordSearch from '../keywordSearch/keywordSearch';
import SelectedKeyword from '../selectedKeyword/selectedKeyword';
import styles from './keywordSearchArea.module.css';
import { getSelectedKeywords, setSelectedKeywords, removeSelectedKeyword } from '../../service/storage';

class KeywordSearchArea extends Component {
  state = { keywordList: [] };

  componentDidMount() {
    //검색 영역 밖이 클릭된 경우, 최근 검색어 목록 display none
    window.addEventListener('click', (event) => {
      if (event.target.closest('#keywordSearchArea')) return;
      this.state.keywordList.length && this.setState({ ...this.state, keywordList: [] });
    });
    //Esc가 눌린 경우, 최근 검색어 목록 display none
    window.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.state.keywordList.length && this.setState({ ...this.state, keywordList: [] });
      }
    });
  }

  //최근검색어 검색
  searchKeyword = (keyword, keywords) => {
    this.props.handleSearch(keyword);
    this.setState({ ...this.state, keywordList: keywords });
  };

  //검색어 입력란 focus -> 최근 검색어 목록 display
  handleInputFocus = () => {
    this.setState({ ...this.state, keywordList: getSelectedKeywords('selectedKeywords', []) });
  };

  //최근검색어 목록 클릭시 이벤트 처리
  handleKeywordListClick = (event) => {
    event.stopPropagation();

    //삭제
    const deleteIndex = Number(event.target.dataset?.deleteIndex);
    if (deleteIndex >= 0) {
      const nextSelectedKeywords = removeSelectedKeyword('selectedKeywords', deleteIndex);
      setSelectedKeywords('selectedKeywords', nextSelectedKeywords);
      this.setState({ ...this.state, keywordList: nextSelectedKeywords });
      return;
    }
    //검색
    const selectIndex = Number(event.target.closest('li').dataset.index);
    const selectedKeywords = getSelectedKeywords('selectedKeywords', []);
    const keywordSearchInput = document.querySelector('#keywordSearchInput');
    keywordSearchInput.value = selectedKeywords[selectIndex];
    this.searchKeyword(selectedKeywords[selectIndex], []);
  };

  //검색 영역(검색어 입력란, 최근 검색어 목록) - 키보드 제어
  handleKeyup = (event) => {
    event.stopPropagation();

    const navigationKeys = ['Enter', 'ArrowUp', 'ArrowDown'];
    if (!navigationKeys.includes(event.key)) {
      return;
    }
    const keywordSearchInput = document.querySelector('#keywordSearchInput');

    if (event.key === 'Enter') {
      //검색
      this.searchKeyword(keywordSearchInput.value, getSelectedKeywords('selectedKeywords', []));
    } else {
      //최근검색어 목록 키보드로 위,아래 이동
      this.controlUpAndDown(event.key, keywordSearchInput);
    }
  };

  /** 최근검색어 목록 키보드로 위,아래 이동 */
  controlUpAndDown = (key, input) => {
    const selectedKeywords = getSelectedKeywords('selectedKeywords', []);
    if (!selectedKeywords.length) return;

    let $nowLi = document.querySelector('.keywordItemSelected');
    const lastIndex = selectedKeywords.length - 1;
    let selectedIndex;
    let nextIndex;

    if ($nowLi) {
      selectedIndex = Number($nowLi.dataset.index);
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      selectedIndex = key === 'ArrowUp' ? lastIndex + 1 : -1;
    }

    if (key === 'ArrowUp') {
      nextIndex = selectedIndex === 0 ? lastIndex : selectedIndex - 1;
    } else if (key === 'ArrowDown') {
      nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
    }

    input.value = selectedKeywords[nextIndex];

    const $nextLi = document.querySelector(`li[data-index='${nextIndex}']`);
    $nowLi && $nowLi.classList.remove('keywordItemSelected');
    $nextLi && $nextLi.classList.add('keywordItemSelected');
  };

  render() {
    return (
      <div id='keywordSearchArea' className={styles.keywordSearchArea} onKeyUp={this.handleKeyup}>
        <KeywordSearch searchKeyword={this.searchKeyword} handleInputFocus={this.handleInputFocus} />
        <SelectedKeyword //
          keywords={this.state.keywordList}
          handleKeywordListClick={this.handleKeywordListClick}
        />
      </div>
    );
  }
}

export default KeywordSearchArea;
