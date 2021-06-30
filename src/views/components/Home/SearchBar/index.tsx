import { search_Posts } from 'api/post';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import {
  CHANGE_SEARCH_INPUT_ACTION,
  LOAD_FILTERED_POSTS_SUCCESS_ACTION,
  LOAD_POSTS_FAILURE_ACTION,
  LOAD_POSTS_REQUEST_ACTION,
} from 'reducers/post';
import css from './SearchBar.module.scss';

function SearchBar() {
  const dispatch = useDispatch();
  const { currentContentState, searchInput } = useSelector((store: RootState) => store.post);

  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState(searchInput);
  const debouncedSearchInput = useDebounce(input, 150);

  useEffect(() => {
    if (debouncedSearchInput) {
      dispatch(CHANGE_SEARCH_INPUT_ACTION(debouncedSearchInput));
    } else {
      dispatch(CHANGE_SEARCH_INPUT_ACTION(''));
    }
  }, [debouncedSearchInput]);

  const filteredPosts = async () => {
    try {
      dispatch(LOAD_POSTS_REQUEST_ACTION());
      const res = await search_Posts({ currentContentState, searchInput, currentPageNumber: 0 });
      dispatch(LOAD_FILTERED_POSTS_SUCCESS_ACTION(res.data));
    } catch (error) {
      dispatch(LOAD_POSTS_FAILURE_ACTION(error));
    }
  };

  useEffect(() => {
    if (searchInput !== '') filteredPosts().catch((error) => console.log(error));
  }, [searchInput, currentContentState]);

  return (
    <article className={css.SearchArticle}>
      <figure
        className={css.articleFigure}
        onClick={() => {
          if (inputRef.current !== null) inputRef.current.focus();
        }}
      >
        <i className={css.figureI}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            className={css.iSvg}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            />
          </svg>
        </i>
        <input
          ref={inputRef}
          placeholder="검색어를 입력하세요"
          type="text"
          className={css.figureInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </figure>
    </article>
  );
}
export default SearchBar;
