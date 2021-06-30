import { load_A_Post, load_B_Post } from 'api/post';
import React, { useEffect, useState } from 'react';
import { PostProps } from 'types/post';
import { RouteComponentProps } from 'react-router-dom';
import css from './Detail.module.scss';

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

  if (Object.keys(post).length === 0) return <div />;

  return (
    <main>
      <section className={css.DetailMainSection}>
        <article className={css.sectionArticle}>
          <header>
            <h2 className={css.articleHeaderH2}>{post.title}</h2>
          </header>
          <div>
            <p>{post.content}</p>
          </div>
        </article>
        <footer>
          <button type="button" className={css.sectionFooterButton} onClick={() => history.goBack()}>
            뒤로가기
          </button>
        </footer>
      </section>
    </main>
  );
}
export default Detail;
