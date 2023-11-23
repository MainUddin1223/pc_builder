import { useAppSelector } from '@/redux/hooks';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsFillBox2HeartFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaCartArrowDown } from 'react-icons/fa';
import styles from './Header.module.css';


interface IHeaderProps {
    isDropdown: boolean;
    setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}


const Header = ({ isDropdown, setIsDropdown }: IHeaderProps) => {
    const { count,wishlist } = useAppSelector(state => state.cartComponents);
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const router = useRouter()
    const { data: session } = useSession();

    return (
        <nav className={`${styles.nav_section} ${styles.navClassList}`}>
            <div className={ `global_padding_y ${styles.nav_container}`}>
                <h1 className={styles.logo_text} onClick={() => router.push('/')}>Sun-tech</h1>
                <div className={styles.nav_icon_container}>
                    <div className={styles.cart_icon}>
                        <Link href='/pc_builder'>
                            <li><BsFillBox2HeartFill /><sup> {wishlist.length > 0 && <span className={styles.cart_count}>{wishlist.length}</span>}</sup></li>
                        </Link>
                    </div>
                    <div className={styles.cart_icon}>
                        <Link href='/cart'>
                            <li><FaCartArrowDown /> <sup>{count > 0 && <span className={styles.cart_count}>{count}</span>}</sup></li>
                        </Link>
                    </div>
                    <div className={styles.profile_mobile}>
                        {session?.user ? (
                            <li>
                                <span>
                                    {
                                        session?.user?.image ?
                                            <>
                                                <span>
                                                    <span className={styles.category_wrapper} onClick={() => setIsProfileDropdown(!isProfileDropdown)}>
                                                        <img src={session?.user?.image} alt="img" className={styles.profile_img} />
                                                    </span>
                                                </span>
                                            </> :
                                            <CgProfile />
                                    }
                                </span>
                                {/* <Image src={session?.user?.image } height={300} width={300} layout='responsive'/> */}
                            </li>
                        ) : (
                            <Link href='/login' onClick={() => {
                                setIsDropdown(false);
                            }}>
                                <button className={styles.login_button}>Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Header