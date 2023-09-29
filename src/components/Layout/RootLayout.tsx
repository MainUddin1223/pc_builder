import Loading from "@/components/loading";
import { Props } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import Footer from "./Footer";
import Header from "./Header";


const RootLayout = ({ children }: Props) => {

  const { count } = useAppSelector(state => state.cartComponents)
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
      document.body.style.overflowY = "scroll";
    };
  }, [isDropdown]);

  return (
    <div>
      <Header isDropdown={isDropdown} setIsDropdown={setIsDropdown} />
      <div style={{ minHeight: "100vh" }}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <Footer />
    </div>
  );
};
export default RootLayout;
