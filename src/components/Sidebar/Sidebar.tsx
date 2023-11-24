import { useGetCategoryQuery } from "@/redux/features/components/componentApi";
import { Button, Input, Slider } from "antd";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { data } = useGetCategoryQuery(undefined);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();

  const handleSearch = () => {
    if (search) {    
      const category = searchParams.get('category');
      router.push(`?category=${category}&search=${search}`)
    }
  }
  const handlePriceRange = (value: number[]) => {
    const category = searchParams.get('category');
      search && category ? router.push(`?category=${category}&search=${search}&minPrice=${value[0]}&maxPrice=${value[1]}`) :
        search ? router.push(`?search=${search}&minPrice=${value[0]}&maxPrice=${value[1]}`) :
          category ? router.push(`?category=${category}&minPrice=${value[0]}&maxPrice=${value[1]}`):
      router.push(`?minPrice=${value[0]}&maxPrice=${value[1]}`)
  };

  const handleReset = () => {
    setSearch('');
    router.push('/')
  }
  
  return (
    <div>
        <Input value={search} type="text" placeholder="search" onChange={(e) => setSearch(e.target.value)}/>
      <div className={styles.search_section}>
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <Slider onAfterChange={handlePriceRange} step={10000} range defaultValue={[20000, 50000]} reverse={ false} min={0} max={100000}/>
      <div>
        {
          data?.data.map((category: string, index: number) => (
            <p key={index} onClick={() => router.push(`?category=${category}`)}>{category}</p>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar