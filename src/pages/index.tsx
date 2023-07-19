import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter();

  if(status === 'authenticated') {
    router.replace('/dashboard');
    return null;
  }


  return (
    <section className="grid h-screen place-items-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome To LogRocket</h2><br />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You currently not authenticated. Click the login button to get started!</p>
        <button
          type="button"
          onClick={() => signIn('google')}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Login
        </button>
      </div>
    </section>
  );
}