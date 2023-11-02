import { useEffect, useState } from 'react';

import Aside from '@/components/Aside';
import Header from '@/components/Header';
import Posts from '@/components/posts/Posts';
import { useAppDispatch } from '@/hooks/ReduxHooks';
import { getPostsAction } from '@/redux/actions/posts';

const Home = () => {
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-5 md:p-10 max-w-7xl mx-auto gap-5">
      <Header />
      <div className="flex flex-col md:flex-row gap-5">
        <Aside manageCurrentId={{currentId, setCurrentId}} />
        <Posts manageCurrentId={{currentId, setCurrentId}} />
      </div>
    </div>
  )
}

export default Home;