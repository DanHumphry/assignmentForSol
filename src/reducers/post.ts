import { PostProps } from 'types/post';

export const initialState = {
  posts: {
    aPosts: [],
    bPosts: [],
    filteredPosts: [],
  },
  currentContentState: 'a',
  hasMorePosts: {
    a: true,
    b: true,
    filtered: true,
  },
  searchInput: '',

  loadPostsLoading: false, // 포스트들 가져오는중
  loadPostsDone: false,
  loadPostsError: null,
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_A_POSTS_SUCCESS = 'LOAD_A_POSTS_SUCCESS';
export const LOAD_B_POSTS_SUCCESS = 'LOAD_B_POSTS_SUCCESS';
export const LOAD_FILTERED_POSTS_SUCCESS = 'LOAD_FILTERED_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const CHANGE_CURRENT_CONTENT = 'CHANGE_CURRENT_CONTENT';
export const CHANGE_SEARCH_INPUT = 'CHANGE_SEARCH_INPUT';

export const LOAD_POSTS_REQUEST_ACTION = () => ({ type: LOAD_POSTS_REQUEST });
export const LOAD_A_POSTS_SUCCESS_ACTION = (data: PostProps[]) => ({ type: LOAD_A_POSTS_SUCCESS, data });
export const LOAD_B_POSTS_SUCCESS_ACTION = (data: PostProps[]) => ({ type: LOAD_B_POSTS_SUCCESS, data });
export const LOAD_FILTERED_POSTS_SUCCESS_ACTION = (data: PostProps[]) => ({
  type: LOAD_FILTERED_POSTS_SUCCESS,
  data,
});
export const LOAD_POSTS_FAILURE_ACTION = (error: Error | string) => ({ type: LOAD_POSTS_FAILURE, data: error });

export const CHANGE_CURRENT_CONTENT_ACTION = (data: string) => ({ type: CHANGE_CURRENT_CONTENT, data });
export const CHANGE_SEARCH_INPUT_ACTION = (data: string) => ({ type: CHANGE_SEARCH_INPUT, data });

const Post = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      return { ...state, loadPostsLoading: true, loadPostsDone: false, loadPostsError: null };
    case LOAD_A_POSTS_SUCCESS: {
      const prevPosts = [...state.posts.aPosts];
      const nextPosts = prevPosts.concat(action.data);
      const isHasMore = action.data.length === 10;
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        loadPostsError: null,
        hasMorePosts: { ...state.hasMorePosts, a: isHasMore },
        posts: { ...state.posts, aPosts: nextPosts },
      };
    }
    case LOAD_B_POSTS_SUCCESS: {
      const prevPosts = [...state.posts.bPosts];
      const nextPosts = prevPosts.concat(action.data);
      const isHasMore = action.data.length === 10;
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        loadPostsError: null,
        hasMorePosts: { ...state.hasMorePosts, b: isHasMore },
        posts: { ...state.posts, bPosts: nextPosts },
      };
    }
    case LOAD_FILTERED_POSTS_SUCCESS: {
      // const prevPosts = [...state.posts.filteredPosts];
      // const nextPosts = prevPosts.concat(action.data);
      const isHasMore = action.data.length === 10;
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        loadPostsError: null,
        posts: { ...state.posts, filteredPosts: action.data },
        hasMorePosts: { ...state.hasMorePosts, filtered: isHasMore },
        // posts: { ...state.posts, filteredPosts: nextPosts },
      };
    }
    case LOAD_POSTS_FAILURE:
      return { ...state, loadPostsLoading: false, loadPostsDone: true, loadPostsError: action.data };

    case CHANGE_CURRENT_CONTENT:
      return { ...state, currentContentState: action.data };
    case CHANGE_SEARCH_INPUT:
      return { ...state, searchInput: action.data };

    default:
      return state;
  }
};

export default Post;
