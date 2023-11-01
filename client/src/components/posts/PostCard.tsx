import { PostModelType } from '@/lib/models/PostModel';
import Image from 'next/image';

type PostCardProps = {
  post: PostModelType;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="card w-full xl:max-w-[390px] bg-base-100 shadow-xl">
      <figure>
        <Image src={post.selectedFile} alt={post.title} width={200} height={200} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.message}</p>
      </div>
    </div>
  )
}

export default PostCard;