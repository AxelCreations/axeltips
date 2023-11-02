import { Dispatch, SetStateAction, useEffect } from 'react';
import PostForm from '@/components/forms/PostForm';
import SearchForm from '@/components/forms/SearchForm';
import { useAppSelector } from '@/hooks/ReduxHooks';

type AsideProps = {
  manageCurrentId: {
    currentId: string | undefined;
    setCurrentId: Dispatch<SetStateAction<string | undefined>>
  }
}

const Aside = ({ manageCurrentId }: AsideProps) => {
  const currentPost = useAppSelector((state) => (manageCurrentId.currentId
      ? state.Reducers.posts.find((post) => post._id === manageCurrentId.currentId)
      : null
  ));

  return (
    <div className="flex flex-col gap-5 w-full md:w-[350px] md:min-w-[350px] md:max-w-[350px]">
      <details className="collapse collapse-plus bg-base-100 shadow-xl border border-base-200" open>
        <summary className="collapse-title text-md font-normal bg-base-400">Search control</summary>
        <div className="collapse-content">
          <SearchForm />
        </div>
      </details>
      <details className="collapse collapse-plus bg-base-100 shadow-xl border border-base-200" open>
        <summary className="collapse-title text-md font-normal bg-base-400">
          {!manageCurrentId.currentId ? 'Create new post' : 'Edit post'}
        </summary>
        <div className="collapse-content">
          <PostForm post={currentPost} setCurrentId={manageCurrentId.setCurrentId} />
        </div>
      </details>

    </div>
  )
}

export default Aside;