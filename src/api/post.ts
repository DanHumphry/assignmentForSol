import axios from 'axios';

axios.defaults.baseURL = 'https://recruit-api.yonple.com/recruit/535224';

export const load_A_Posts = (data: { currentPageNumber: number }) => {
  return axios.get(`a-posts?page=${data.currentPageNumber}`);
};
export const load_A_Post = (data: { postId: string }) => {
  return axios.get(`a-posts/${data.postId}`);
};
export const load_B_Posts = (data: { currentPageNumber: number }) => {
  return axios.get(`b-posts?page=${data.currentPageNumber}`);
};
export const load_B_Post = (data: { postId: string }) => {
  return axios.get(`b-posts/${data.postId}`);
};
export const search_Posts = (data: { currentPageNumber: number; currentContentState: string; searchInput: string }) => {
  return axios.get(`${data.currentContentState}-posts?page=${data.currentPageNumber}&search=${data.searchInput}`);
};
