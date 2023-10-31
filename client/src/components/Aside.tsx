import PostForm from '@/components/forms/PostForm';
import SearchForm from '@/components/forms/SearchForm';


const Aside = () => {
  return (
    <div className="flex flex-col gap-5 w-full md:w-[350px] md:min-w-[350px] md:max-w-[350px]">
      <details className="collapse collapse-plus bg-base-100 shadow-xl border border-base-200" open>
        <summary className="collapse-title text-md font-normal bg-base-400">Search control</summary>
        <div className="collapse-content">
          <SearchForm />
        </div>
      </details>
      <details className="collapse collapse-plus bg-base-100 shadow-xl border border-base-200" open>
        <summary className="collapse-title text-md font-normal bg-base-400">Create new post</summary>
        <div className="collapse-content">
          <PostForm />
        </div>
      </details>

    </div>
  )
}

export default Aside;