import { search_Posts, load_A_Posts, load_B_Posts } from 'api/post';
import useThrottle from 'hooks/useThrottle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import React, { useEffect, useState } from 'react';
import {
  LOAD_FILTERED_POSTS_SCROLL_SUCCESS_ACTION,
  LOAD_POSTS_REQUEST_ACTION,
  LOAD_A_POSTS_SUCCESS_ACTION,
  LOAD_B_POSTS_SUCCESS_ACTION,
  LOAD_POSTS_FAILURE_ACTION,
} from 'reducers/post';
import { PostProps } from 'types/post';
import Header from 'views/components/Home/Header';
import Content from 'views/components/Home/Content';
import Navi from 'views/components/Home/Navi';
import SearchBar from 'views/components/Home/SearchBar';
import { AxiosResponse } from 'axios';

function Home() {
  const dispatch = useDispatch();

  const [currentPageNumber, setCurrentPageNumber] = useState({ a: 0, b: 0, filtered: 0 });

  const { posts, currentContentState, hasMorePosts, loadPostsLoading, searchInput } = useSelector(
    (store: RootState) => store.post,
  );

  const loadPostsOnScroll = async (
    reqAction: { (): { type: string } },
    successAction: {
      (data: PostProps[]): { type: string; data: PostProps[] };
    },
    failureAction: {
      (error: string | Error): { type: string; data: string | Error };
    },
    loadAPI: {
      (data: { currentPageNumber: number; currentContentState: string; searchInput: string }): Promise<
        AxiosResponse<any>
      >;
    },
    currentPgN: number,
  ) => {
    try {
      dispatch(reqAction());
      const res = await loadAPI({ currentPageNumber: currentPgN, currentContentState, searchInput });
      dispatch(successAction(res.data));
    } catch (error) {
      dispatch(failureAction(error));
    }
  };

  useEffect(() => {
    setCurrentPageNumber({
      a: Math.floor(posts.aPosts.length / 10),
      b: Math.floor(posts.bPosts.length / 10),
      filtered: Math.floor(posts.filteredPosts.length / 10),
    });
  }, [posts]);

  useEffect(() => {
    const onScroll = useThrottle(async () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!loadPostsLoading) {
          if (searchInput !== '' && hasMorePosts.filtered && currentPageNumber.filtered !== 0) {
            loadPostsOnScroll(
              LOAD_POSTS_REQUEST_ACTION,
              LOAD_FILTERED_POSTS_SCROLL_SUCCESS_ACTION,
              LOAD_POSTS_FAILURE_ACTION,
              search_Posts,
              currentPageNumber.filtered + 1,
            ).catch((error) => console.log(error));
          } else if (currentContentState === 'a' && hasMorePosts.a && currentPageNumber.a !== 0) {
            loadPostsOnScroll(
              LOAD_POSTS_REQUEST_ACTION,
              LOAD_A_POSTS_SUCCESS_ACTION,
              LOAD_POSTS_FAILURE_ACTION,
              load_A_Posts,
              currentPageNumber.a + 1,
            ).catch((error) => console.log(error));
          } else if (currentContentState === 'b' && hasMorePosts.b && currentPageNumber.b !== 0) {
            loadPostsOnScroll(
              LOAD_POSTS_REQUEST_ACTION,
              LOAD_B_POSTS_SUCCESS_ACTION,
              LOAD_POSTS_FAILURE_ACTION,
              load_B_Posts,
              currentPageNumber.b + 1,
            ).catch((error) => console.log(error));
          }
        }
      }
    }, 100);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, currentPageNumber]);

  return (
    <>
      <Header />
      <main>
        <SearchBar />
        <Navi />
        <Content />
      </main>
    </>
  );
}
export default Home;
