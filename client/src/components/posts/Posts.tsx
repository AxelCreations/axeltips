import { useAppDispatch } from '@/hooks/ReduxHooks';
import { PostModelType } from '@/lib/models/PostModel';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const Posts = () => {
  useEffect(() => {
  });
  const posts = useSelector<{loading: boolean, posts: PostModelType[]}, PostModelType[]>(({posts}) => posts);
  
  
  return (
    <div className="border flex w-full">
      <h1>Post List</h1>
    </div>
  )
}

export default Posts;