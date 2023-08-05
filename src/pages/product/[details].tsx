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
    const features = Object.entries(details.keyFeatures);
    return (
        <div className={styles.product_details_container}>
            <div>
                <Image src={details?.image} alt="product_img" width={300} height={300} layout="responsive"/>
            </div>
            <div>
                <p>{details?.productName}</p>
                <p>Category: { details.category}</p>
                <p>Status: { details.status}</p>
                <p>Price: { details.price}</p>
                <p>Description: {details.description}</p>
                <p>Key Featurs:
                {features.map(([key, value]) => (
                <p key={key}>
                <strong>{key}: </strong>
                {value}
                </p>
                 ))}
                </p>
                <p>Indiviudal Rating: { details.individualRating}</p>
                <p>Average Rating: {details.averageRating}</p>
                <p>Reviews : </p>
                {
                    details.reviews.map((review,index) => (
                        <p key={index}>{ review}</p>
                    ))
                }
                <button>Add to builder</button>
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