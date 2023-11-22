import Brands from '@/components/Brands';
// import Featured from '@/components/Featured';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsDeviceSsdFill, BsMotherboardFill } from 'react-icons/bs';
import { CgSmartphoneRam } from 'react-icons/cg';
import { GiPowerGenerator, GiProcessor } from 'react-icons/gi';
import { MdMonitor } from 'react-icons/md';
import banner from '../assets/banner.jpg';
import drem_pc from '../assets/dream.jpg';
import RootLayout from '../components/Layout/RootLayout';
import styles from '../styles/Home.module.css';
import { Details, PcComponents } from '../types/types';
const Featured = dynamic(() => import('@/components/Featured'))

const inter = Inter({ subsets: ['latin'] });
const rootUrl = process.env.SERVER_URL
const Home = ({ components }: PcComponents) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>PC Builder</title>
        <meta name="description" content="PC builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Your page content goes here */}
      {/* <Hero /> */}
      {/* brands */}
      <Brands />
      {/* featured section */}

      <div className={styles.featured_heading_section}>
        <div style={{display:'flex',justifyContent:'space-between',cursor:'pointer'}}>
          <h5 className={styles.featured_heading}>Featured </h5>
          <h5 style={{marginRight:'5px'}}>Browse all products </h5>
        </div>
        <hr className={styles.featured_hr} />
      </div>
      <div className={styles.cards_container}>
        {components.map((component: Details) => (
          <Featured component={component} key={component._id} />
        ))}
      </div>
      <button className={styles.see_more_btn} onClick={() => router.push('/pc_builder')}>See more</button>
      <div style={{ margin: "10px 0" }} >
        <Image src={banner} alt="banner" layout="responsive" />
      </div>
      <div>
        <div className={styles.featured_heading_section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
            <h5 className={styles.featured_heading}>Categories </h5>
            <h5 style={{ marginRight: '5px' }}>Browse all categories </h5>
          </div>
          <hr className={styles.featured_hr} />
        </div>
        <div>
          <div className={styles.categories_container}>
            <div className={styles.icon_container}>
              <Link href='/component/ram'>
                <CgSmartphoneRam className={styles.icon} />
                <span className={styles.tooltip}>RAM</span>
              </Link>
            </div>
            <div className={styles.icon_container}>
              <Link href='/component/processor'>
                <GiProcessor className={styles.icon} />
                <span className={styles.tooltip}>PROCESSOR</span>
              </Link>
            </div>
            <div className={styles.icon_container}>
              <Link href='/component/motherboard'>
                <BsMotherboardFill className={styles.icon} />
                <span className={styles.tooltip}>MOTHER BOARD</span>
              </Link>
            </div>
            <div className={styles.icon_container}>
              <Link href='/component/powerSupply'>
                <GiPowerGenerator className={styles.icon} />
                <span className={styles.tooltip}>POWER SUPPLY</span>
              </Link>
            </div>
            <div className={styles.icon_container}>
              <Link href='/component/ssd'>
                <BsDeviceSsdFill className={styles.icon} />
                <span className={styles.tooltip}>SSD</span>
              </Link>
            </div>
            <div className={styles.icon_container}>
              <Link href='/component/monitor'>
                <MdMonitor className={styles.icon} />
                <span className={styles.tooltip}>MONITOR</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.dream_pc_container}>
        <div className={styles.dream_pc_description}>
          <h1>Build your dream pc</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat blanditiis labore fugiat dolorem nesciunt aliquid eum illo quidem debitis cupiditate.</p>
        </div>
        <div>
          <Image src={drem_pc} alt='dream pc' width={300} height={300} layout='responsive' />
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch(`${rootUrl}/components/featured`);
  const data = await res.json();
  return {
    props: {
      components: data.data,
    }
  };
};

export default Home;
