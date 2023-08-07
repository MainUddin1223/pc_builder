import styles from "@/styles/Login.module.css";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";
import Head from "next/head";

const rootUrl = process.env.NEXTAUTH_URL

const LoginPage = () => {

  return (
    <div>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}>
        <h3>LOGIN</h3>
        <div className={styles.social_icons}>
          <GoogleOutlined
            onClick={() =>
              signIn("google", {
                callbackUrl:rootUrl,
              })
            }
          />
          <GithubOutlined
            onClick={() =>
              signIn("github", {
                callbackUrl: rootUrl,
              })
            }
          />
        </div>
        <hr />
        <form >
          <label htmlFor="">Your Email</label>
          <input  type="email" />
          <label htmlFor="">Your Password</label>
          <input type="password"/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
