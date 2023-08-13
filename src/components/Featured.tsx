import { PcComponent } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from '../styles/HomeFeatured.module.css';

const Featured = ({component}:PcComponent) => {
    const router = useRouter()
    return (
        <div className={styles.card_container} onClick={() => router.push(`/product/${component._id}`)}>
            <Image src={component?.image} width={300} height={300} alt={component?.image} style={{ display: "block", margin: "0 auto", padding: "10px" }} layout="responsive" />
            <div className={styles.product_details}>
                <h3>{component?.productName}</h3>
                <p>Category: {component?.category}</p>
                <p>Price: {component?.price}</p>
                <p>Status: {component?.status}</p>
                <p>Rating: {component?.averageRating}</p>
            </div>
        </div>
    )
}

export default Featured