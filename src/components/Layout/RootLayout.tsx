import { Props } from "@/types/types";
import { Suspense, useEffect, useState } from 'react';
import Loading from "../loading";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";


const RootLayout = ({ children }: Props) => {

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
