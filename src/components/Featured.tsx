import { addToBuilder } from "@/redux/features/pcBuilderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { PcComponent } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from '../styles/Featured.module.css';

const Featured = ({component}:PcComponent) => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    return (
        <div className={styles.featured_section}>
            <div className={styles.card_container}>
                <Image className={styles.featured_image} src={component?.image} width={100} height={100} alt={component?.image} layout="responsive" />
                <div className={styles.product_info}>
                    <div className={styles.product_details}>
                        <h3>{component?.productName}</h3>
                        <p><span style={{fontWeight:"bold"}}>Category :</span> {component?.category}</p>
                        <p><span style={{ fontWeight: "bold" }}>Price : </span>{component?.price}</p>
                        <p><span style={{ fontWeight: "bold" }}>Status : </span>{component?.status}</p>
                        <p><span style={{ fontWeight: "bold" }}>Rating :</span> {component?.averageRating}</p>
                    </div>
                </div>
            </div>
            <div className={styles.product_btn_group}>
                <button onClick={() => router.push(`/product/${component._id}`)}>Details</button>
                <button onClick={()=>dispatch(addToBuilder(component))}>Add to cart</button>
            </div>
    </div>
    )
}

export default Featured