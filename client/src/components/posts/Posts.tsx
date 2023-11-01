import { useAppSelector } from '@/hooks/ReduxHooks';
import { useEffect } from 'react';
import PostCard from './PostCard';


const Posts = () => {
  const posts = useAppSelector((state) => state.Reducers.posts);

  useEffect(() => {
    console.log({ posts });
  }, [posts]);

  return (
    <div className="flex flex-col w-full shadow shadow-black rounded-lg p-3">
      {!posts.length ? <span className="loading loading-bars loading-lg"></span>
        :
        <div className="flex flex-wrap gap-5 justify-center md:justify-between">
          {posts.map(post => (<PostCard key={post.id} post={post}></PostCard>))}
        </div>
      }
    </div>
  )
}

export default Posts;