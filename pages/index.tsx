import Link from 'next/link';
import { useEffect, useState } from 'react';

interface UserProps {
  id: string;
  name: string;
  email: string;
}


export default function Home() {
  const api = process.env.NEXT_PUBLIC_API_URL
  const cols = ['Name', 'Email', 'Bookings']
  const [allUsers, setAllUsers] = useState<Array<UserProps> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<Error | null>(null);

  useEffect(() => {
    setIsError(null)
    fetch(`${api}users`)
      .then((res) => res.json())
      .then(({ data }) => {
        setAllUsers(data)
      })
      .catch(err => setIsError(err.error || 'API request failed'))
      .finally(() => setIsLoading(false))
  }, [api])

  if (isLoading) return <p>Loading...</p>
  if (!allUsers) return <p>No profile data</p>
  if (isError) return <p>Something went wrong</p>

  return (
    <section className="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
      <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
          <h6>Users table</h6>
        </div>
        <div className="flex-auto px-0 pt-0 pb-2">
          <div className="p-0 overflow-x-auto">
            <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
              <thead className="align-bottom">
                <tr>
                  {cols.map((col, index) => (
                    <th key={index} className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      {col}
                    </th>))}

                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {allUsers.map(({ email, name, id }, index) => (
                  <tr key={index}>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      {name}</td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      {email}
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <div className="text-left font-medium text-green-500"><Link href={`/user/${id}`}>View all</Link></div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section >
  )
}
