import LoginForm from '@components/auth/login-form';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default async function Page() {
  return (
    <>
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-12 sm:py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <LoginForm
            isPopup={false}
            className="border rounded-lg border-border-base"
            redirect={{link:"/", status:true}}
          />
        </div>
      </div>
      <Divider />
    </>
  );
}
