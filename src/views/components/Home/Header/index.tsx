import React from 'react';
import css from './Header.module.scss';

function Header() {
  return (
    <header className={css.HomeHeader}>
      <p className={css.headerTitle}>게시물을 검색해보세요</p>
    </header>
  );
}
export default React.memo(Header);
