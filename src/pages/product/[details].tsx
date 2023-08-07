import { GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import RootLayout from "../../components/Layout/RootLayout";
import { addToBuilder } from "../../redux/features/pcBuilderSlice";
import { useAppDispatch } from "../../redux/hooks";
import styles from '../../styles/ProductDetails.module.css';
import { Details, IDetailProps } from "../../types/types";
const rootUrl = process.env.NEXTAUTH_URL


const ProductDetails = ({ details }: IDetailProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
    return (
        <div className={styles.product_details_container}>
            <div className={styles.details_img_container}>
                <Image className={styles.details_img} src={details?.image} alt="product_img" width={300} height={300} layout="responsive"/>
            </div>
            <div>
                <p>{details?.productName}</p>
                <p>Category: { details?.category}</p>
                <p>Status: { details?.status}</p>
                <p>Price: { details?.price}</p>
                <p>Description: {details?.description}</p>
                <p>Key Featurs:
                {details?.keyFeatures && Object.entries(details?.keyFeatures)?.map(([key, value]) => (
                <p key={key}>
                <strong>{key}: </strong>
                {value}
                </p>
                 ))}
                </p>
                <p>Indiviudal Rating: { details?.individualRating}</p>
                <p>Average Rating: {details?.averageRating}</p>
                <p>Reviews : </p>
                {
                    details?.reviews && details?.reviews.map((review,index) => (
                        <p key={index}>{ review}</p>
                    ))
                }
          <button className={styles.add_to_build_button} onClick={() => {
            dispatch(addToBuilder(details))
            router.push('/pc_builder')
                }}>Add to builder</button>
            </div>

        </div>
    )
}
ProductDetails.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {

  const res = await fetch(`${rootUrl}/api/products`);
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const details = context.params?.details;
    const url = `${rootUrl}/api/product/${details}`
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