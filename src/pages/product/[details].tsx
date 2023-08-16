import { GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ImStarFull, ImStarHalf } from 'react-icons/im';
import RootLayout from "../../components/Layout/RootLayout";
import { addToBuilder } from "../../redux/features/pcBuilderSlice";
import { useAppDispatch } from "../../redux/hooks";
import styles from '../../styles/ProductDetails.module.css';
import { Details, IDetailProps } from "../../types/types";
const rootUrl = process.env.SERVER_URL


const ProductDetails = ({ details }: IDetailProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
const [overview,setOverview] = useState('overview')

  return (
    <div className={styles.product_details_container}>
      <div className={styles.details_img_container}>
        <Image className={styles.details_img} src={details?.image} alt="product_img" width={300} height={300} layout="responsive" />
      </div>
      <div className={styles.product_details}>
        <div>
          <h3 className={styles.product_header}>{details?.productName}</h3>
          <p className={styles.product_description}>{details?.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam velit blanditiis alias pariatur eveniet doloribus voluptate, suscipit ipsum impedit iusto!</p>
          <div className={styles.avarage_rating}>
            {Array(Math.ceil(details?.averageRating))
              .fill(null)
              .map((_, index) => (
                details?.averageRating > index + 1 ? (
                  <ImStarFull key={index} style={{ color:'rgb(13, 202, 231)'}} />
                ) : (
                    <ImStarHalf key={index} style={{ color: 'rgb(13, 202, 231)' }} />
                )
              ))}
          </div>
          <p style={{margin:"10px 0",fontWeight:"bold"}}>Price: {details?.price} $</p>
        </div>
        <p className={styles.status}>{details?.status}</p>
          <p style={{ margin: "10px 0", fontWeight: "bold" }}>Category: <span style={{ textTransform: "uppercase" }}>{details?.category}</span></p>
        <div>
          <div className={styles.overview_section}>
            <p className={`${overview === 'overview' && styles.overview_item}`} onClick={()=>setOverview('overview')}>Overview</p>
            <p className={`${overview === 'review' && styles.overview_item}`} onClick={() => setOverview('review')}>Reviews</p>
          </div>
          <hr style={{margin:'10px 0'}}/>
          <div className={styles.accordian_section}>
            {
              overview === 'overview' ? (
                details?.keyFeatures ? (
                  Object.entries(details?.keyFeatures)?.map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}: </strong>
                      {value}
                    </p>
                  ))
                ) : (
                  <p>Coming soon</p>
                )
              ) : (
                details?.reviews && details?.reviews.map((review, index) => (
                  <p key={index}>* {review}</p>
                ))
              )
            }
</div>
        </div>
        <button className={styles.add_to_build_button} onClick={() => {
          dispatch(addToBuilder(details))
          router.push('/pc_builder')
        }}>Add to Cart</button>
      </div>

    </div>
  )
}

ProductDetails.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch(`${rootUrl}/components`);
  const data = await res.json();
  const products = data.data;
  const paths = products?.map((product: Details) => ({
    params: { details: product._id },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.details;
  const url = `${rootUrl}/components/${id}`
  const res = await fetch(url);
  const data = await res.json();
  return {
    props: {
      details: data.data,
    },
    revalidate: 30,
  };
};

export default ProductDetails