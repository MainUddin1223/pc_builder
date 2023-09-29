import RootLayout from "@/components/Layout/RootLayout";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Login.module.css";

const rootUrl: string = 'http://localhost:8080/api/v1'


const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        getAuthData()
      }
    }
},[])
  //get token and verify user from server
  const getAuthData = () => {
    if (status === 'authenticated') {
      const option = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: session?.user?.email, name: session?.user?.name })
      };
      fetch(`${rootUrl}/auth`, option)
        .then(data => data.json())
        .then(res => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token',res.data.token)
          }
        })
        .then(() => {
          router.push('/')
      })
  }
  }

  return (
    <div>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}>
        <div className={styles.social_icons}>
          <GoogleOutlined
            onClick={async() =>{
              await signIn("google");
            }
            }
          />
          <GithubOutlined
            onClick={async() =>
              {await signIn("github", {
                callbackUrl: 'http://localhost:3000',
              })
            }
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
