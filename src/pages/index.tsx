import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { BsDeviceSsdFill, BsMotherboardFill } from 'react-icons/bs';
import { CgSmartphoneRam } from 'react-icons/cg';
import { GiPowerGenerator, GiProcessor } from 'react-icons/gi';
import { MdDevicesOther, MdMonitor } from 'react-icons/md';
import banner from '../assets/banner.jpg';
import Hero from '../components/Hero';
import HomeFeatured from '../components/HomeFeatured';
import RootLayout from '../components/Layout/RootLayout';
import styles from '../styles/Home.module.css';
import { Details, PcComponents } from '../types/types';

const inter = Inter({ subsets: ['latin'] });

const rootUrl = process.env.NEXTAUTH_URL
const Home = ({ components }: PcComponents) => {
  return (
    <>
      <Head>
        <title>PC Builder</title>
        <meta name="description" content="PC builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Your page content goes here */}
      <Hero />
        <h1 style={{textAlign:"center",padding:"10px"}}>Featured Product</h1>
      <div className={styles.cards_container}>
            {components.map((component: Details) => (
        <HomeFeatured component={component} key={component._id} />
      ))}
      </div>
      <div style={{margin:"10px 0"}} >
        <Image src={banner} alt="banner" layout="responsive"/>
      </div>
      <div>
        <h1 style={{textAlign:"center",padding:"10px"}}>Featured Categories</h1>
        <div>
          <div className={styles.categories_container}>
            <div className={styles.icon_container}>
                 <Link href='/component/ram'>
              <CgSmartphoneRam className={styles.icon }/>
                <span className={styles.tooltip}>RAM</span>
                </Link>
            </div>
            <div className={styles.icon_container}>
                 <Link href='/component/processor'>
              <GiProcessor className={styles.icon } />
                <span className={styles.tooltip}>PROCESSOR</span>
                </Link>
            </div>
            <div className={styles.icon_container}>
                 <Link href='/component/motherboard'>
              <BsMotherboardFill className={styles.icon } />
                <span className={styles.tooltip}>MOTHER BOARD</span>
                </Link>
            </div>
            <div className={styles.icon_container}>
              <Link href='/component/powerSupply'>
              <GiPowerGenerator className={styles.icon } />
                <span className={styles.tooltip}>POWER SUPPLY</span>
                </Link>
            </div>
            <div className={styles.icon_container}>
              <Link href='/component/ssd'>
              <BsDeviceSsdFill className={styles.icon } />
                <span className={styles.tooltip}>SSD</span>
                </Link>
            </div>
            <div className={styles.icon_container}>
              <Link href='/component/monitor'>
              <MdMonitor className={styles.icon } />
                <span className={styles.tooltip}>Monitor</span>
                </Link>
            </div>
            <div className={styles.icon_container}>
              <Link href='/component/others'>
              <MdDevicesOther className={styles.icon } />
                <span className={styles.tooltip}>OTHER</span>
                </Link>
            </div>
          </div>
      </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch(`${rootUrl}/api/components`);
  const data = await res.json();
  return {
    props: {
      components: data.data,
    },
    revalidate: 30,
  };
};

export default Home;
