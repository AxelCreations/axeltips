import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { PostModelType } from '@/lib/models/PostModel';
import Image from 'next/image';
import moment from 'moment';
import Button from '@/components/buttons/Button';
import { deletePostAction, likePost } from '@/redux/actions/posts';
import { useAppDispatch } from '@/hooks/ReduxHooks';

type PostCardProps = {
  post: PostModelType;
  manageCurrentId: {
    currentId: string | undefined;
    setCurrentId: Dispatch<SetStateAction<string | undefined>>
  }
}

const PostCard = ({ post, manageCurrentId }: PostCardProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleLikeButton = async (id: string) => {
    setEditing(true);
    await dispatch(likePost(post._id as string));
    setEditing(false);
  }

  const handleDeleteButton = async (id: string, event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.disabled = true;
    await dispatch(deletePostAction(id));
    setDeleting(false);
  }

  return (
    <div className={`card w-full xl:max-w-[390px] bg-base-100 shadow-xl relative${(manageCurrentId.currentId === post._id) ? ' z-20' : ''}`}>
      <figure className='h-52 relative'>
        <div className="absolute w-full h-full bg-base-100 opacity-80"></div>
        <Image
          src={post.selectedFile}
          alt={post.title}
          width={200}
          height={200}
          className='h-full w-full min-h-full min-w-full object-cover' />
        <div className="absolute top-0 left-0 p-5 flex justify-between w-full">
          <h2 className="card-title max-w-[250px] flex-col items-start gap-0">
            <span className='text-2xl font-bold'>{post.title}</span>
            <span className='text-sm'>{moment(post.createdAt).fromNow()}</span>
          </h2>
          {(manageCurrentId.currentId !== post._id) && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-neutral mb-1">
                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                <li><button onClick={() => { manageCurrentId.setCurrentId(post._id) }}>Edit</button></li>
              </ul>
            </div>
          )}
        </div>
      </figure>
      <div className="card-body pb-1">
        <div className="flex gap-2 flex-wrap mb-5">
          {post.tags.map(tag => (<span key={tag} className='badge badge-accent py-3 px-4 uppercase'>{tag}</span>))}
        </div>
        <p className=''>{post.message}</p>
      </div>
      <div className="card-footer flex justify-between px-8 py-5">
        <Button className='btn-secondary' onClick={() => { handleLikeButton(post._id as string) }} disabled={editing}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
            <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
          </svg>
          {post.likeCount}
        </Button>
        <div className="flex relative">
          <Button className={`btn-error${deleting ? '' : ' w-0 hidden'}`} onClick={e => { handleDeleteButton(post._id as string, e) }}>
            <span>You Sure?</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill='currentColor'>
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </Button>
          <Button className={`btn-error${deleting ? ' hidden' : ''}`} onClick={() => { setDeleting(true) }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill='currentColor'>
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostCard;
