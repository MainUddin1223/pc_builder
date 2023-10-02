import Category from '@/components/category'
import styles from '@/styles/PcBuilder.module.css'
import { ICategories } from "@/types/types"
import Head from "next/head"
import { useState } from 'react'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import RootLayout from "../components/Layout/RootLayout"

const rootUrl = process.env.SERVER_URL


const PcBuilder = ({ categories }: ICategories) => {
  const [isCategoryDropdown, setIsCategorydropdown] = useState(false)
  const [category,setCategory] = useState('all components')
  return (
    <>
      <Head>
        <title>PC_BUILDER</title>
        <meta
          name="description"
          content="This is pc builder made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div >
        <div className={styles.category_section}>
            <li onClick={() => setIsCategorydropdown(!isCategoryDropdown)}>
              <span className={styles.category_choose_option}>
                <p>Choose category</p>
                {
                  isCategoryDropdown ? <SlArrowUp /> :
                    <SlArrowDown />
                }
              </span>
            </li>

          <div className={`${styles.categories_conatiner} ${isCategoryDropdown && styles.show_categories }`}>
            {
              categories.map((category: string) => (
                <div key={category} className={styles.category_container} onClick={() => {
                  setCategory(category)
                  setIsCategorydropdown(false)
                }} >
                  <p>{category}</p>
                </div>
              ))
            }
          </div>
       </div>
        <Category categoryType={category} />

      </div>
    </>
  )
}

PcBuilder.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default PcBuilder

export const getServerSideProps = async () => {
  //  if (typeof window === 'undefined') {
  //    return {
  //   props: {
  //     categories:[],
  //   },
  //   revalidate: 30,
  // };
  // }
  const res = await fetch(`${rootUrl}/components/category`);
  const data = await res.json();
  return {
    props: {
      categories: data.data,
    },
  };
};