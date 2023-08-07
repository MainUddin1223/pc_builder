import { Props } from "@/types/types";
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAppSelector } from '../../redux/hooks';
import styles from '../../styles/RootLayout.module.css';


const RootLayout = ({ children }: Props) => {
  const {count} = useAppSelector(state=>state.component)
  const [hideNav, setHideNav] = useState(true)
  const router = useRouter()
  const { data: session } = useSession();
    console.log("session", session);
  return (
    <div>
      <nav className={styles.nav_section}>
        <div className={styles.nav_container}>
          <div className={styles.logo_text} onClick={()=>router.push('/')}>PC Builder</div>
        <div>
          <ul className={`${styles.nav_list_container} ${hideNav?styles.hide_nav_bar:''}`}>
              <div className={styles.categories_container}>
                <li className={styles.nav_item}>Categories</li>
                <ul className={`${styles.category_list}`}>
                  <Link href='/component/processor'>
                    <li>Processor</li>
                    </Link>
                  <Link href='/component/ram'>
                    <li>RAM</li>
                    </Link>
                  <Link href='/component/motherboard'>
                    <li>MOTHERBOARD</li>
                    </Link>
                  <Link href='/component/powerSupply'>
                    <li>power supply</li>
                    </Link>
                  <Link href='/component/monitor'>
                    <li>Monitor</li>
                    </Link>
                  <Link href='/component/ssd'>
                    <li>Storage</li>
                    </Link>
                  <Link href='/component/others'>
                    <li>others</li>
                    </Link>
                </ul>
              </div>
               <Link href='/pc_builder'>
                <li>PC Builder {count>0 && <span className={styles.quantity} style={{color:"red",fontWeight:"bolder",marginTop:'-10px'}}>{ count}</span>}</li>
              </Link>
                      {session?.user ? (
                <li onClick={() => signOut()}>Logout</li> ):(
              <Link href='/login'>
                <li>Login</li>
              </Link>
        )}
            </ul>
        </div>
        </div>
        <GiHamburgerMenu className={styles.ham_menu} onClick={()=>setHideNav(!hideNav) } />
        </nav>
        <div style={{minHeight:"100vh"}}>{children}</div>
      <div className={styles.footer_section}>
        <h5>Pc bulder</h5>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, cumque.</p>
          </div>
    </div>
  );
};
export default RootLayout;
