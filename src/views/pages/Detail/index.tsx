import { load_A_Post, load_B_Post } from 'api/post';
import React, { useEffect, useState } from 'react';
import { PostProps } from 'types/post';
import 'styles/Detail.css';
import { RouteComponentProps } from 'react-router-dom';

function Detail({ history, location }: RouteComponentProps) {
  const [post, setPost] = useState({} as PostProps);

  const pathname = location.pathname.split('/')[1];
  const postId = location.search.split('=')[1];

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (pathname === 'a') {
          const res = await load_A_Post({ postId });
          setPost(res.data);
        } else if (pathname === 'b') {
          const res = await load_B_Post({ postId });
          setPost(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadPost().catch((error) => console.log(error));
  }, [pathname, postId]);

  return (
    <main className="css-0 ebjj3580">
      <div className="css-18111oz ebjj3581" />
      <section className="css-1divg4c e1c3s1g31">
        <article className="css-h0x6p6">
          <header>
            <h2 className="css-9ljxn4">{post.title}</h2>
          </header>
          <div>
            <p>{post.content}</p>
          </div>
        </article>
        <footer>
          <button type="button" className="css-203ycs e1c3s1g30" onClick={() => history.goBack()}>
            뒤로가기
          </button>
        </footer>
      </section>
    </main>
  );
}
export default Detail;
