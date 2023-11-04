import Link from "next/link"

const Header = () => {
  return (
    <div className="h-20 px-5 flex justify-between items-center rounded-2xl shadow-lg border border-base-200">
      <Link href='/' className=''>
        <h1 className='font-bold text-xl md:text-2xl text-primary-content hover:text-primary-content-focus'>AxelTips</h1>
      </Link>
      {false ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-primary m-1">Login/SignUp</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      ) : (
        <Link href='/auth' className="text-lg md:text-xl text-content hover:text-content-focus">LogIn/SignUp</Link>
      )}
    </div>
  )
}

export default Header;
