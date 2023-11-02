import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@/hooks/ReduxHooks';
import PostCard from './PostCard';

type PostsProps = {
  manageCurrentId: {
    currentId: string | undefined;
    setCurrentId: Dispatch<SetStateAction<string | undefined>>
  }
}

const Posts = ({ manageCurrentId }: PostsProps) => {
  const posts = useAppSelector((state) => state.Reducers.posts);

  return (
    <div className="flex flex-col w-full shadow rounded-lg p-3">
      {!posts.length ? <span className="loading loading-bars loading-lg"></span>
        :
        <div className="flex flex-wrap gap-5 justify-center md:justify-between">
          {posts.map(post => (
            <PostCard key={post._id as string} post={post} manageCurrentId={manageCurrentId} />
          ))}
        </div>
      }
      {!!manageCurrentId.currentId && (
        <div className="absolute w-full h-full backdrop-blur-sm opacity-90 z-10"></div>
      )}
    </div>
  )
}

export default Posts;