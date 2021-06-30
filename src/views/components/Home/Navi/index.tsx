import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { CHANGE_CURRENT_CONTENT_ACTION } from 'reducers/post';
import css from './Navi.module.scss';

function Navi() {
  const dispatch = useDispatch();
  const { currentContentState } = useSelector((store: RootState) => store.post);

  const contentHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(CHANGE_CURRENT_CONTENT_ACTION(e.currentTarget.name));
  };

  return (
    <section>
      <header className={css.NaviHeader}>
        <button
          name="a"
          type="button"
          className={currentContentState === 'a' ? css.activeButton : css.notActiveButton}
          onClick={contentHandler}
        >
          A Posts
        </button>
        <button
          name="b"
          type="button"
          className={currentContentState === 'b' ? css.activeButton : css.notActiveButton}
          onClick={contentHandler}
        >
          B Posts
        </button>
      </header>
    </section>
  );
}
export default Navi;
