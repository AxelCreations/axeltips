
import Posts from '@/components/posts/Posts';
import { useAppDispatch } from '@/hooks/ReduxHooks';

import { GetPosts, RemovePost } from '@/redux/PostSlicer';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetPosts());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-10">
      <h1 className="font-bold bg-base-100 bold border">Holis222</h1>
      <Posts />
    </div>
  )
}

export default Home;