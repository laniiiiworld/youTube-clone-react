import React, { Component } from 'react';
import styles from './selectedKeyword.module.css';

class SelectedKeyword extends Component {
  //최근검색어 목록에 마우스를 올린 경우
  handleMouseover = (event) => {
    const nextIndex = Number(event.target.closest('li').dataset.index);
    const $nowLi = document.querySelector('.keywordItemSelected');
    const $nextLi = document.querySelector(`li[data-index='${nextIndex}']`);
    $nowLi && $nowLi.classList.remove('keywordItemSelected');
    $nextLi && $nextLi.classList.add('keywordItemSelected');
  };

  render() {
    return (
      <div //
        id='keywordSearchArea'
        className={styles.selectedKeywordArea}
        onMouseOver={this.handleMouseover}
        onClick={this.props.handleKeywordListClick}
      >
        <ul className={styles.selectedKeywords}>
          {this.props.keywords.map((keyword, index) => (
            <li key={index} className={styles.selectedKeyword} data-index={index}>
              <span className={styles.keyword}>{keyword}</span>
              <span className={styles.deleteButton} data-delete-index={index}>
                삭제
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SelectedKeyword;
