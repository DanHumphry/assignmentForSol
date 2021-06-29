import { load_A_Posts, load_B_Posts, search_Posts } from 'api/post';
import { PostProps } from 'types/post';
import React, { useEffect, useState } from 'react';
import Header from 'views/components/Home/Header';
import Main from 'views/components/Home/Main';
import 'styles/Home.css';
import Navi from 'views/components/Home/Navi';
import SearchBar from 'views/components/Home/SearchBar';

function Home() {
  const [aPosts, setAPosts] = useState<PostProps[]>([]);
  const [bPosts, setBPosts] = useState<PostProps[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>([]);

  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [prevent, setPrevent] = useState(true);

  const [currentContentState, setCurrentContentState] = useState('a');
  const [currentPageNumber, setCurrentPageNumber] = useState({ a: 0, b: 0, filtered: 0 });

  const [title, setTitle] = useState('');

  useEffect(() => {
    search_Posts({ currentContentState, title, currentPageNumber: 0 })
      .then((res) => setFilteredPosts(res.data))
      .catch((error) => console.log(error));
  }, [title]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        if (currentContentState === 'a' && aPosts.length === 0) {
          const res = await load_A_Posts({ currentPageNumber: currentPageNumber.a });
          setAPosts(res.data);
        } else if (currentContentState === 'b' && bPosts.length === 0) {
          const res = await load_B_Posts({ currentPageNumber: currentPageNumber.b });
          setBPosts(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadPosts().catch((error) => console.log(error));
  }, [currentContentState]);

  useEffect(() => {
    const onScroll = async () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        setPrevent(false);
        if (hasMorePosts && prevent) {
          if (title !== '') {
            const nextPage = currentPageNumber.filtered + 1;
            const res = await search_Posts({ currentContentState, title, currentPageNumber: nextPage });
            setFilteredPosts((prev) => prev.concat(res.data));
            if (res.data.length !== 10) setHasMorePosts(false);
            setCurrentPageNumber({ ...currentPageNumber, filtered: nextPage });
          } else if (currentContentState === 'a') {
            const nextPage = currentPageNumber.a + 1;
            const res = await load_A_Posts({ currentPageNumber: nextPage });
            setAPosts((prev) => prev.concat(res.data));
            if (res.data.length !== 10) setHasMorePosts(false);
            setCurrentPageNumber({ ...currentPageNumber, a: nextPage });
          } else if (currentContentState === 'b') {
            const nextPage = currentPageNumber.b + 1;
            const res = await load_B_Posts({ currentPageNumber: nextPage });
            setBPosts((prev) => prev.concat(res.data));
            if (res.data.length !== 10) setHasMorePosts(false);
            setCurrentPageNumber({ ...currentPageNumber, b: nextPage });
          }
          setPrevent(true);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, prevent]);

  return (
    <main className="css-0 ebjj3580">
      <section className="css-rsw54y e12x4cjl1">
        <Header />
        <SearchBar title={title} setTitle={setTitle} />
        <main className="css-etxhws">
          <Navi setCurrentContentState={setCurrentContentState} />
          <ul className="css-zgarh3">
            {/* eslint-disable-next-line no-nested-ternary */}
            {title !== ''
              ? filteredPosts.map((post: PostProps) => <Main key={post.id} post={post} />)
              : currentContentState === 'a'
              ? aPosts.map((post: PostProps) => <Main key={post.id} post={post} />)
              : bPosts.map((post: PostProps) => <Main key={post.id} post={post} />)}
          </ul>
        </main>
      </section>
    </main>
  );
}
export default Home;
