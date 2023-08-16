import RootLayout from "@/components/Layout/RootLayout";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";

const rootUrl = process.env.NEXTAUTH_URL

const LoginPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}>
        <div className={styles.social_icons}>
          <GoogleOutlined
            onClick={async() =>
              {await signIn("google", {
                callbackUrl:rootUrl,
              })
              router.push('/pc_builder')}
            }
          />
          <GithubOutlined
            onClick={async() =>
              {await signIn("github", {
                callbackUrl: rootUrl,
              })
              router.push('/')}
            }
          />
        </div>
        <hr />
        <form >
          <label htmlFor="" className={styles.form_label}>Your Email</label>
          <input  type="email" />
          <label htmlFor="">Your Password</label>
          <input type="password"/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default LoginPage;
