import React from 'react';
import { Link } from 'react-router-dom';
import { PostProps } from 'types/post';

interface Props {
  post: PostProps;
}

function Main({ post }: Props) {
  return (
    <Link to={`/${post.type}?id=${post.id}`}>
      <li className="css-10w6wn7 e1wfvrfd2">
        <h3 className="css-0 e1wfvrfd1">
          <span className="css-8yzqw8">{post.id}.</span> {post.title}
        </h3>
        <p className="css-8ftd31 e1wfvrfd0">{post.content}</p>
      </li>
    </Link>
  );
}
export default Main;
