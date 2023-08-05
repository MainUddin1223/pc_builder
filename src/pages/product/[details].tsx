import RootLayout from "@/components/Layout/RootLayout";
import styles from '@/styles/ProductDetails.module.css';
import { Details } from "@/types/types";
import { GetStaticPropsContext } from "next";
import Image from "next/image";
interface IDetailProps{
    details:Details
}

const ProductDetails = ({ details }: IDetailProps) => {
    console.log(details)
    return (
        <div className={styles.product_details_container}>
            <div>
                <Image src={details?.image} alt="product_img" width={300} height={300} layout="responsive"/>
            </div>
            <div>
                <p>{details?.productName }</p>
            </div>

        </div>
    )
}
ProductDetails.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  const products = data.data;

  const paths = products?.map((product:Details) => ({
    params: { details:product._id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context:GetStaticPropsContext) => {
    const details = context.params?.details;
    const url = `http://localhost:3000/api/product/${details}`
    const res = await fetch(url);
  const data = await res.json();
  return {
    props: {
      details: data.data,
    },
    revalidate: 10,
  };
};

export default ProductDetails