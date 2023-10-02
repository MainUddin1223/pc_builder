import { addToBuilder, addToWishlist, removeFromCart, removeFromWishlist } from "@/redux/features/pcBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Details, PcComponent } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaHeartCircleMinus, FaHeartCirclePlus } from 'react-icons/fa6';
import { ImStarFull, ImStarHalf } from 'react-icons/im';
import styles from '../styles/Featured.module.css';

const Featured = ({component}:PcComponent) => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { cartComponents } = useAppSelector(state => state.cartComponents);
    const [addedComponent, setAddedComponent] = useState<Details | undefined>(undefined);


    const {wishlist} = useAppSelector(state=>state.cartComponents)

    useEffect(() => {
        setAddedComponent(cartComponents?.find((card) => card?._id === component?._id))
    }, [cartComponents])

    return (
        <div className={styles.featured_section}>
            {
                wishlist?.includes(component._id) ? <FaHeartCircleMinus className={styles.addToWishList} onClick={() => dispatch(removeFromWishlist(component._id))} style={{ color: 'red' }} /> : <FaHeartCirclePlus className={styles.addToWishList} onClick={() => dispatch(addToWishlist(component._id))} />
            }
            <div className={styles.card_container}>
                <Image className={styles.featured_image} src={component?.image} width={100} height={100} alt={component?.image} layout="responsive" />
                <hr  style={{margin:"10px",color:"gray"}}/>
                <div className={styles.product_info}>
                    <div className={styles.product_details}>
                        <p>{component?.productName}</p>
                        <p >Price : $ {component?.price}</p>
                        <p>{component?.status}</p>
                        <div className={styles.avarage_rating}>
                            {Array(Math.ceil(component?.averageRating))
                                .fill(null)
                                .map((_, index) => (
                                    component?.averageRating > index + 1 ? (
                                        <ImStarFull key={index} style={{ color: 'rgb(13, 202, 231)' }} />
                                    ) : (
                                        <ImStarHalf key={index} style={{ color: 'rgb(13, 202, 231)' }} />
                                    )
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.product_btn_group}>
                <button onClick={() => router.push(`/product/${component._id}`)}>Details</button>
                {
                    addedComponent ?
                        <div className={styles.product_quantity}>
                            <button onClick={() => dispatch(removeFromCart(component))}>-</button>
                            <input  value={addedComponent?.quantity}/>
                            <button onClick={() => dispatch(addToBuilder(component))}>+</button>
                    </div>
                    : <button onClick={() => dispatch(addToBuilder(component))}>Add to cart</button>
                }
                
            </div>
    </div>
    )
}

export default Featured