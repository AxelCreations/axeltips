import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthForms from '@/components/forms/AuthForms';

const AuthPage = () => {
  return (
    <div className="flex justify-center items-center pt-5 lg:pt-14">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <AuthForms />
      </GoogleOAuthProvider>
    </div>
  )
}

export default AuthPage;