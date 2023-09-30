import { addToBuilder, removeFromCart } from "@/redux/features/pcBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Details, PcComponent } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaHeartCircleMinus, FaHeartCirclePlus } from 'react-icons/fa6';
import styles from '../styles/Featured.module.css';

const Featured = ({component}:PcComponent) => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { cartComponents } = useAppSelector(state => state.cartComponents);
    const [addedComponent, setAddedComponent] = useState<Details | undefined>(undefined);
    const [wishList, setWishlist] = useState<string[]>([])

    useEffect(() => {
        setAddedComponent(cartComponents?.find((card) => card?._id === component?._id))
    }, [cartComponents]);

    useEffect(() => {
        const storedData = localStorage.getItem('wishlist') as string
        const data = JSON.parse(storedData);
        setWishlist(data)
    },[])
    
    const addtoWishlist = (id: string) => {
        if (wishList) {
            const isIdExist = wishList.includes(id);
            if (!isIdExist) {
                setWishlist([...wishList,id])
                localStorage.setItem('wishlist', JSON.stringify([...wishList, id]));
            }
        }
        else {
            setWishlist([id])
            localStorage.setItem('wishlist', JSON.stringify([id]));
        }
    }

    const removeFromWishlist = (id:string) => {
        const removedItem = wishList.filter(productId => productId !== id)
        setWishlist(removedItem)
    }

    return (
        <div className={styles.featured_section}>
            {
                wishList?.includes(component._id) ? <FaHeartCircleMinus className={styles.addToWishList} onClick={() => removeFromWishlist(component._id)} style={{ color: 'red' }} /> : <FaHeartCirclePlus className={styles.addToWishList} onClick={() => addtoWishlist(component._id)}/>
            }
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