import React, { useEffect, useRef, useState } from 'react';

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ title, setTitle }: Props) {
  const searchInput = useRef<HTMLInputElement>(null);

  const onFocusInput = () => {
    if (searchInput.current !== null) searchInput.current.focus();
  };

  return (
    <article className="css-1mmfi3q">
      <figure className="group css-12ih1hh e19fr3m91" onClick={onFocusInput}>
        <i className="css-hbjzqk">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            className="svg-inline--fa fa-search fa-w-16 "
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
          ref={searchInput}
          placeholder="검색어를 입력하세요"
          type="search"
          className="css-1ki1932 e19fr3m90"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </figure>
    </article>
  );
}
export default React.memo(SearchBar);
