import { useAppSelector } from '@/redux/hooks';
import styles from '@/styles/RootLayout.module.css';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CgProfile } from 'react-icons/cg';
import { FaCartArrowDown, FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

interface IHeaderProps{
    isDropdown: boolean;
    setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isDropdown, setIsDropdown }: IHeaderProps) => {
    const { count } = useAppSelector(state => state.cartComponents)
    const router = useRouter()
    const { data: session } = useSession();
    return (
        <nav className={`${styles.nav_section} ${styles.navClassList}`}>
            {isDropdown && (
                <div
                    className={styles.dropdown_wrapper}
                    onClick={() => {
                        setIsDropdown(false);
                    }}
                ></div>
            )}
            <div className={styles.nav_container}>
                <div className={styles.logo_text} onClick={() => router.push('/')}>PC Builder</div>
                <div>
                    <ul className={`${styles.nav_list_container} ${isDropdown ? '' : styles.hide_nav_bar}`}>
                        <div className={styles.home_cross_icons}>
                            <FaHome onClick={async () => {
                                await router.push('/');
                                setIsDropdown(false)
                            }} />
                            <GrClose onClick={() => {
                                setIsDropdown(false);
                            }}
                            />
                        </div>
                        <div className={styles.categories_container}>
                            <li className={styles.nav_item}>Categories</li>
                            <ul className={`${styles.category_list}`} onClick={() => {
                                setIsDropdown(false);
                            }}>
                                <Link href='/component/processor'>
                                    <li className={styles.nav_item}>Processor</li>
                                </Link>
                                <Link href='/component/ram'>
                                    <li className={styles.nav_item}>RAM</li>
                                </Link>
                                <Link href='/component/motherboard'>
                                    <li className={styles.nav_item}> MOTHERBOARD</li>
                                </Link>
                                <Link href='/component/powerSupply'>
                                    <li className={styles.nav_item}>power supply</li>
                                </Link>
                                <Link href='/component/monitor'>
                                    <li className={styles.nav_item}>Monitor</li>
                                </Link>
                                <Link href='/component/ssd'>
                                    <li className={styles.nav_item}>Storage</li>
                                </Link>
                                <Link href='/component/others'>
                                    <li className={styles.nav_item}>others</li>
                                </Link>
                            </ul>
                        </div>
                        <Link href='/pc_builder' onClick={() => {
                            setIsDropdown(false);
                        }}>
                            <li className={styles.nav_item}>Build pc </li>
                        </Link>
                        <div className={styles.cart}>
                            <Link href='/pc_builder'>
                                <li><FaCartArrowDown /> {count > 0 && <span className={styles.quantity} style={{ fontWeight: "bolder", marginTop: '-10px' }}>{count}</span>}</li>
                            </Link>
                        </div>
                        {session?.user ? (
                            <li onClick={() => { signOut(),localStorage.clear(), setIsDropdown(false) }} >Logout</li>
                        //     <li>
                        //         {
                        //             session?.user?.image ?
                        //                 <>
                        //                     <img src={session?.user?.image} alt="profile" className={styles.profile_img} />
                        //                     <div className={styles.profile_list}>
                        //                         <li>profile</li>
                        //                         <li>history</li>
                        //                         <li>wishlist</li>
                        //                         <li>logout</li>
                        //                     </div>
                        //                 </> :
                        //                 <CgProfile />
                        //         }
                        //         {/* <Image src={session?.user?.image } height={300} width={300} layout='responsive'/> */}
                        // </li>
                        ) : (
                            <Link href='/login' onClick={() => {
                                setIsDropdown(false);
                            }}>
                                    <li><CgProfile/></li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
            <GiHamburgerMenu className={styles.ham_menu}
                onClick={() => setIsDropdown(!isDropdown)}
            />
            <div className={styles.responsive_cart}>
                <Link href='/pc_builder'>
                    <li><FaCartArrowDown /> {count > 0 && <span className={styles.quantity} style={{ fontWeight: "bolder", marginTop: '-10px' }}>{count}</span>}</li>
                </Link>
            </div>
        </nav>
    )
}
export default Header