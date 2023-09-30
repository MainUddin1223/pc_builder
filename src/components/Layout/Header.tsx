import { useAppSelector } from '@/redux/hooks';
import styles from '@/styles/RootLayout.module.css';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsFillBox2HeartFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaCartArrowDown, FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { LuLogOut } from 'react-icons/lu';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

interface IHeaderProps {
    isDropdown: boolean;
    setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isDropdown, setIsDropdown }: IHeaderProps) => {
    const { count } = useAppSelector(state => state.cartComponents);
    const [isProfileDropdpwn, setIsProfileDropdown] = useState(false);
    const [isCategoryDropdown, setIsCategorydropdown] = useState(false)
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
            {isProfileDropdpwn && (
                <div
                    className={styles.profile_dropdown_wrapper}
                    onClick={() => {
                        setIsProfileDropdown(false);
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
                            }}
                            style={{fontSize:"25px"}}
                            />
                            <GrClose onClick={() => {
                                setIsDropdown(false);
                            }}
                            />
                        </div>
                        <div className={styles.mobile_profile}>
                            {
                                session?.user?.image ?
                                    <>
                                        <span>
                                            <img src={session?.user?.image} alt="img" className={styles.profile_img_mobile} />
                                            <p style={{ padding: "10px" }}>{session?.user?.name}</p>
                                            <hr style={{margin:'10px'}}/>
                                        </span>
                                    </> :
                                    <div className={styles.mobile_login_section}>
                                        <CgProfile style={{ fontSize: "45px" }} />
                                        <button onClick={() => {
                                            router.push('/login'),
                                                setIsDropdown(false)
                                        }}>Login</button>
                                    </div>
                            }
                        </div>
                        <div className={styles.categories_container}>
                            <li className={`${styles.nav_item} ${styles.category_wrapper}`} onClick={() => setIsCategorydropdown(!isCategoryDropdown)}>
                                <span>
                                    Components
                                </span>
                                <span className={styles.expand_arrow}>
                                    {
                                        isCategoryDropdown ? <SlArrowUp /> :
                                            <SlArrowDown />
                                    }
                                </span>
                            </li>
                            <ul className={`${styles.category_list} ${isCategoryDropdown && styles.category_list_mobile}`} onClick={() => {
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
                        <li>Orders</li>
                        <li>History</li>
                        <div className={styles.cart}>
                            <Link href='/pc_builder'>
                                <li><BsFillBox2HeartFill /> {count > 0 && <span className={styles.quantity} style={{ fontWeight: "bolder", marginTop: '-10px' }}>{count}</span>}</li>
                            </Link>
                        </div>
                        <div className={styles.cart}>
                            <Link href='/pc_builder'>
                                <li><FaCartArrowDown /> {count > 0 && <span className={styles.quantity} style={{ fontWeight: "bolder", marginTop: '-10px' }}>{count}</span>}</li>
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
                                                        <span className={styles.category_wrapper} onClick={() => setIsProfileDropdown(!isProfileDropdpwn)}>
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
                                    <li><CgProfile /></li>
                                </Link>
                            )}
                        </div>
                        {
                            session?.user && <LuLogOut className={styles.logout} onClick={()=>signOut() } />
                        }
                    </ul>
                </div>
            </div>
            <GiHamburgerMenu className={styles.ham_menu}
                onClick={() => setIsDropdown(!isDropdown)}
            />
            <div className={styles.responsive_cart}>
                <span style={{display:"flex",gap:'10px'}}>
                    {session?.user && <Link href='/pc_builder'>
                        <li><BsFillBox2HeartFill /> {count > 0 && <span className={styles.quantity} style={{ fontWeight: "bolder", marginTop: '-10px' }}>{count}</span>}</li>
                    </Link>}
                    <Link href='/pc_builder'>
                        <li><FaCartArrowDown /> {count > 0 && <span className={styles.quantity} style={{ fontWeight: "bolder", marginTop: '-10px' }}>{count}</span>}</li>
                    </Link>
            </span>
            </div>
        </nav>
    )
}
export default Header