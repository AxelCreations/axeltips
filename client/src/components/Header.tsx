import { useAppDispatch } from '@/hooks/ReduxHooks';
import { GoogleInfoModelType } from '@/lib/models/GoogleInfoModel';
import { logoutAction } from '@/redux/actions/auth';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = () => {
  const [user, setUser] = useState<GoogleInfoModelType | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(logoutAction());

    setUser(null);

    router.push("/");
  }

  useEffect(() => {
    const localInfo = JSON.parse(localStorage.getItem('googleAuthProfile') as string);

    setUser(localInfo);
  }, [router.pathname]);

  return (
    <div className="h-20 px-5 flex justify-between items-center rounded-2xl shadow-lg border border-base-200">
      <Link href='/' className=''>
        <h1 className='font-bold text-xl md:text-2xl text-primary-content hover:text-primary-content-focus'>AxelTips</h1>
      </Link>
      {user ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-outline btn-primary m-1">{ user.name }</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
            <li><Link href='/'>Admin</Link></li>
            <li><a onClick={logout}>LogOut</a></li>
          </ul>
        </div>
      ) : (
        <Link href='/auth' className="text-lg md:text-xl text-content hover:text-content-focus">LogIn/SignUp</Link>
      )}
    </div>
  )
}

export default Header;
