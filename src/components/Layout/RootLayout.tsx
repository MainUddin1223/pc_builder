import styles from '@/styles/RootLayout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
interface Props{
    children:React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  const [hideNav, setHideNav] = useState(true)
  const router = useRouter()
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
            <li>Build pc</li>
              <li>Login</li>
            </ul>
        </div>
        </div>
        <GiHamburgerMenu className={styles.ham_menu} onClick={()=>setHideNav(!hideNav) } />
        </nav>
        <div style={{minHeight:"100vh"}}>{children}</div>
        <div>Footer</div>
    </div>
  );
};
export default RootLayout;
