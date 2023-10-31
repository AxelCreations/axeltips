
import Aside from '@/components/Aside';
import Header from '@/components/Header';
import Posts from '@/components/posts/Posts';
import { useAppDispatch } from '@/hooks/ReduxHooks';

import { GetPosts, RemovePost } from '@/redux/PostSlicer';
import { useEffect, useState } from 'react';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetPosts());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-5 md:p-10 max-w-7xl mx-auto gap-5">
      <Header />
      <div className="flex flex-col md:flex-row gap-5">
        <Aside />
        <Posts />
      </div>
    </div>
  )
}

export default Home;