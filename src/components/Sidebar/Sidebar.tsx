import { useGetCategoryQuery } from "@/redux/features/components/componentApi";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const { data } = useGetCategoryQuery(undefined);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const category = searchParams.get('category');
    router.push(`?category=${category}&search=${search}`)
    setSearch('')
  }
  return (
    <div>
      <div>
        <input value={search} type="text" placeholder="search" onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {
          data.data.map((category: string, index: number) => (
            <p key={index} onClick={() => router.push(`?category=${category}`)}>{category}</p>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar