import styles from '@/styles/PcComponent.module.css';
import { PcComponent } from "@/types/types";
import Image from "next/image";

const PcComponentCard = ({ component }: PcComponent) => {
    return (
        <div className={styles.card_container}>
            <Image src={component?.image} width={300} height={300} alt={component?.image} style={{display:"block",margin:"0 auto",padding:"10px"}} layout="responsive"/>
            <div className={styles.product_details}>
                <h3>{component?.productName}</h3>
                <p>Category: { component?.category}</p>
                <p>Price: { component?.price}</p>
                <p>Status: { component?.status}</p>
                <p>Rating: { component?.averageRating}</p>
                <p>Quantity: { component?.quantity}</p>
       </div>
        </div>
    )
}
export default PcComponentCard