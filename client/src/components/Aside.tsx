import SearchForm from "./forms/SearchForm";


const Aside = () => {
  return (
    <div className="flex flex-col gap-10 w-full md:w-96">
      <details className="collapse collapse-plus bg-base-100 shadow-xl" open>
        <summary className="collapse-title text-md font-normal">Search control</summary>
        <div className="collapse-content">
          <SearchForm />
        </div>
      </details>

    </div>
  )
}

export default Aside;