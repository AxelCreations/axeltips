import { Dispatch, SetStateAction } from 'react';
import { PostModelType } from '@/lib/models/PostModel';
import Image from 'next/image';
import moment from 'moment';

type PostCardProps = {
  post: PostModelType;
  manageCurrentId: {
    currentId: string | undefined;
    setCurrentId: Dispatch<SetStateAction<string | undefined>>
  }
}

const PostCard = ({ post, manageCurrentId }: PostCardProps) => {
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
      <div className="card-footer px-8 py-5">
        <label htmlFor="">Like</label>
      </div>
    </div>
  )
}

export default PostCard;
