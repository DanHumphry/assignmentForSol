import React from 'react';
import { Link } from 'react-router-dom';
import { PostProps } from 'types/post';
import css from './Main.module.scss';

interface Props {
  post: PostProps;
}

function Main({ post }: Props) {
  return (
    <Link to={`/${post.type}?id=${post.id}`}>
      <li className={css.mainLi}>
        <h3>
          <span className={css.liSpan}>{post.id}.</span> {post.title}
        </h3>
        <p className={css.liP}>{post.content}</p>
      </li>
    </Link>
  );
}
export default Main;
