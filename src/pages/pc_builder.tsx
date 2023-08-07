import RootLayout from "@/components/Layout/RootLayout"
import PcComponentCard from "@/components/pcCopmonent"
import { resetComponent } from "@/redux/features/pcBuilderSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import styles from '@/styles/PcBuilder.module.css'
import Head from "next/head"
import { useRouter } from "next/router"
import Swal from "sweetalert2"

const rootUrl = process.env.NEXTAUTH_URL

interface ICategories {
  categories: {
    [x: string]: any
    categories:string[]
  }
}
const PcBuilder = ({ categories }:ICategories) => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { component,count } = useAppSelector(state => state.component);
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
      <div>
        <div className={styles.categories_conatiner}>
          {
            categories.map((category: string) => (
              <div key={category} className={styles.category_container} >
                <p>{category}</p>
                <button className={styles.category_button} onClick={()=>router.push(`/component/${category}`)}>Select</button>
              </div>
            ))
          }
        </div>
        {
          count >= 1 ? <div className={styles.builder_card_container}>
            <div className={styles.builder_card}>
                 {
              component.map((card) => (
                <PcComponentCard component={card} key={card._id} />
              ))
            }
         </div>
            <button className={`${styles.complete_button} ${count < 5 && styles.complete_button_disabled}`} onClick={() => {
              Swal.fire('Congratulations!!',
              "Your PC has been successfully built")
              dispatch(resetComponent())
            }}>Complete build</button>
          </div> :
            <div className={styles.empty_builder}>
              <h1>Pc building yet to start</h1>
              <p>Select the components and make your dream pc</p>
          </div>
        }

        </div>
    </>
    )
}

PcBuilder.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default PcBuilder

export const getServerSideProps = async () => {
  const res = await fetch(`${rootUrl}/api/category`);
  const data = await res.json();
  return {
    props: {
      categories: data.data,
    },
  };
};