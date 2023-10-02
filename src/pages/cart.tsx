import RootLayout from "@/components/Layout/RootLayout";
import { addToBuilder, dropFromCart, removeFromCart } from "@/redux/features/pcBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import styles from '@/styles/cart.module.css';
import { Details } from "@/types/types";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Cart = () => {
    const { count, cartComponents } = useAppSelector(state => state.cartComponents);
    const dispatch = useAppDispatch();
    const router = useRouter()

    const haandleDropFromCart = (component: Details) => {
        dispatch(dropFromCart(component))
        if (count == 1) {
            router.push('/pc_builder')
        }
    }
    return (
        <>
            <Head>
                <title>cart-pc-builder</title>
                <meta
                    name="description"
                    content="This is pc builder made by next-js"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h2 className={styles.cart_header}>{`Your Cart (${count} items)`}</h2>
                <hr className={ styles.heading_hr} />
                <div className={styles.cart_container}>
                    <div className={styles.item_container}>
                        <ul className={styles.product_list}>
                            <li className={styles.product_details_header}>
                                <p className={styles.product_detail_header}>Product</p>
                                <p>Price</p>
                                <p>Quantity</p>
                                <p>Total</p>
                            </li>
                            {
                                cartComponents.map((compo)=> (
                                    <li key={compo._id} className={styles.product_detail_container}>
                                        <Image src={compo.image} width={50} height={50} alt={compo.productName} className={ styles.product_img} />
                                        <div className={styles.product_details}>
                                            <h3 className={styles.product_detail_header}>
   
                                                    {
                                                        compo.productName.length > 15 ?
                                                        compo.productName.slice(0, 15)  + ' ...'
                                                        : compo.productName
                                                    }
                                            
                                            </h3>
                                            <p>$ {compo.price}</p>
                                            <div className={styles.product_quantity}>
                                                <button onClick={() => {
                                                    dispatch(removeFromCart(compo))
                                                    if (count == 1) {
                                                        router.push('/pc_builder')
                                                    }
                                                }}>-</button>
                                                <input value={compo?.quantity} />
                                                <button onClick={() => dispatch(addToBuilder(compo))}>+</button>
                                            </div>
                                            <p>$ {(compo.price * compo?.quantity!).toFixed(2)}</p>
                                        </div>
                                        <AiOutlineCloseCircle className={styles.remove_icon} onClick={() => haandleDropFromCart(compo) } />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={styles.summary_section}>
                        <h3>Summary</h3>
                        <hr style={{margin:'20px'}}/>
                        <div className={styles.summary_container}>
                            <div className={styles.summary_titles}>
                                <p>Items</p>
                                <p>Sub-total</p>
                                <p>Coupon</p>
                                <p>Discount</p>
                                <p>Shipping</p>
                                <p>Total</p>
                            </div>
                            <div className={styles.summary_titles}>
                                <p>{count }</p>
                                <p>$ { `5000`}</p>
                                <input type="text" style={{width:"100px"}}/>
                                <p>$ 50</p>
                                <p>$ 50</p>
                                <p>$ 10000</p>
                            </div>
                        </div>
                        <hr style={{ margin: '20px' }} />
                        <div className={styles.summary_container}>
                            <div className={styles.summary_titles}>
                                <p>Total</p>
                            </div>
                            <div className={styles.summary_titles}>
                                <p style={{ width: "100px" }}>$ 10000</p>
                            </div>
                        </div>
                        <div className={styles.summary_btn_group}>
                            <button onClick={()=>router.push('/pc_builder')}>Shop more</button>
                            <button>Checkout</button>
                       </div>
                    </div>
               </div>
            </div>
        </>
    )
}
Cart.getLayout = function getLayout(page: React.ReactNode) {
    return <RootLayout>{page}</RootLayout>;
};
export default Cart