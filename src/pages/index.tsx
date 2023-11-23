// import Featured from '@/components/Featured';
import Content from '@/components/Content/Content';
import Sidebar from '@/components/Sidebar/Sidebar';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import drem_pc from '../assets/dream.jpg';
import RootLayout from '../components/Layout/RootLayout';
import styles from '../styles/Home.module.css';
import { PcComponents } from '../types/types';
const rootUrl = process.env.SERVER_URL
const Home = ({ components }: PcComponents) => {

  return (
    <>
      <Head>
        <title>PC Builder</title>
        <meta name="description" content="PC builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.home_layout}>
        {/* sider */}
        <div className={`custom-scrollbar-hide ${styles.sidebar}`}>
          <Sidebar/>
        </div>
        {/* content */}
        <div className={`custom-scrollbar-hide ${styles.content}`}>
          <Content components={components} />
          <div className={styles.dream_pc_container}>
            <div className={styles.dream_pc_description}>
              <h1>Build your dream pc</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat blanditiis labore fugiat dolorem nesciunt aliquid eum illo quidem debitis cupiditate.</p>
            </div>
            <div>
              <Image src={drem_pc} alt='dream pc' width={300} height={300} layout='responsive' />
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

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
  const category = context.query.category || 'all components'
  const res = await fetch(`${rootUrl}/components/category/${category}`)
  const data = await res.json();
  return {
    props: {
      components: data.data,
    }
  };
};

export default Home;
