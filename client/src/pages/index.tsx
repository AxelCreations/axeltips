import { useEffect, useState } from 'react';

import Aside from '@/components/Aside';
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
    <div className="flex flex-col md:flex-row gap-5">
      <Aside manageCurrentId={{currentId, setCurrentId}} />
      <Posts manageCurrentId={{currentId, setCurrentId}} />
    </div>
  )
}

export default Home;