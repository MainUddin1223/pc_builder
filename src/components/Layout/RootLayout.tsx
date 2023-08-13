import Loading from "@/pages/loading";
import { Props } from "@/types/types";
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import { FaCartArrowDown, FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { useAppSelector } from '../../redux/hooks';
import styles from '../../styles/RootLayout.module.css';


const RootLayout = ({ children }: Props) => {

  const { count } = useAppSelector(state => state.component)
  const router = useRouter()
  const { data: session } = useSession();
  const [isDropdown, setIsDropdown] = useState(false);


  useEffect(() => {
    if (isDropdown) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.body.style.overflowY = "scroll"; // Reset overflowY when the component unmounts
    };
  }, [isDropdown]);

  return (
    <div>
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
                <li>Build pc </li>
              </Link>
              <div className={styles.cart}>
                <Link href='/pc_builder'>
                  <li><FaCartArrowDown /> {count > 0 && <span className={styles.quantity} style={{ fontWeight: "bolder", marginTop: '-10px' }}>{count}</span>}</li>
                </Link>
              </div>
              {session?.user ? (
                <li onClick={() => signOut()}>Logout</li>) : (
                <Link href='/login'>
                  <li>Login</li>
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
      <div style={{ minHeight: "100vh" }}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>

      <div className={styles.footer_section}>
        <h5>Pc bulder</h5>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, cumque.</p>
      </div>
    </div>
  );
};
export default RootLayout;
