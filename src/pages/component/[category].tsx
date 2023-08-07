import { GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import banner from '../../assets/banner.jpg';
import HomeFeatured from '../../components/HomeFeatured';
import RootLayout from "../../components/Layout/RootLayout";
import styles from '../../styles/Category.module.css';
import { Details, PcComponents } from "../../types/types";

const rootUrl = process.env.NEXTAUTH_URL

const Product = ({ components}:PcComponents) => {
    const router = useRouter()
    const { category } = router.query;
    return (
        <div className={styles.category_container}>
                 <div style={{margin:"10px 0"}} >
        <Image src={banner} alt="banner" layout="responsive"/>
      </div>
            <div className={styles.category_header_container}>
            <p >{ `Category > ${category}`}</p>
            </div>
            <div className={styles.component_container}>
                {
                   components?.map((component: Details) => (
        <HomeFeatured component={component} key={component._id} />
      ))
                }
            </div>
        </div>
    )
}

Product.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  //  if (typeof window === 'undefined') {
  //      return {
  //     paths: [],
  //     fallback: true
  //   };
  // }
  const res = await fetch(`${rootUrl}/api/category`);
  const data = await res.json();
  const categories = data.data;

  const paths = categories?.map((category:string) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  //  if (typeof window === 'undefined') {
  //    return {
  //   props: {
  //     components:[],
  //   },
  //   revalidate: 30,
  // };
  // }
    const category = context.params?.category;
  const res = await fetch(`${rootUrl}/api/category/${category}`);
  const data = await res.json();
  return {
    props: {
      components: data.data,
    },
    revalidate: 10,
  };
};

export default Product