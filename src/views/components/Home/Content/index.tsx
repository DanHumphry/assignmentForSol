import { load_A_Posts, load_B_Posts } from 'api/post';
import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'reducers';
import {
  LOAD_A_POSTS_SUCCESS_ACTION,
  LOAD_B_POSTS_SUCCESS_ACTION,
  LOAD_POSTS_FAILURE_ACTION,
  LOAD_POSTS_REQUEST_ACTION,
} from 'reducers/post';
import { PostProps } from 'types/post';
import css from './Content.module.scss';

function Content() {
  const dispatch = useDispatch();
  const { posts, currentContentState, searchInput } = useSelector((store: RootState) => store.post);

  const loadPosts = async (
    loadAPI: {
      (data: { currentPageNumber: number }): Promise<AxiosResponse<any>>;
    },
    successAction: { (data: PostProps[]): { type: string; data: PostProps[] } },
    PgN: number,
  ) => {
    try {
      dispatch(LOAD_POSTS_REQUEST_ACTION());
      const res = await loadAPI({ currentPageNumber: PgN });
      dispatch(successAction(res.data));
    } catch (error) {
      dispatch(LOAD_POSTS_FAILURE_ACTION(error));
    }
  };

  useEffect(() => {
    if (currentContentState === 'a' && posts.aPosts.length === 0) {
      loadPosts(load_A_Posts, LOAD_A_POSTS_SUCCESS_ACTION, 0).catch((error) => console.log(error));
    } else if (currentContentState === 'b' && posts.bPosts.length === 0) {
      loadPosts(load_B_Posts, LOAD_B_POSTS_SUCCESS_ACTION, 0).catch((error) => console.log(error));
    }
  }, [currentContentState]);

  const iterableContent = (post: PostProps) => {
    return (
      <Link to={`/${post.type}?id=${post.id}`} key={post.id}>
        <li className={css.ulLi}>
          <h3>
            <span className={css.liSpan}>{post.id}.</span> {post.title}
          </h3>
          <p className={css.liP}>{post.content}</p>
        </li>
      </Link>
    );
  };

  return (
    <ul className={css.MainUl}>
      {searchInput !== ''
        ? posts.filteredPosts.map((post: PostProps) => iterableContent(post))
        : currentContentState === 'a'
        ? posts.aPosts.map((post: PostProps) => iterableContent(post))
        : posts.bPosts.map((post: PostProps) => iterableContent(post))}
    </ul>
  );
}
export default Content;
