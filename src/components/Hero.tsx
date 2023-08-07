import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner_2 from '../assets/Banner-2.jpg';
import banner_1 from '../assets/Banner-6.jpg';
import banner_3 from '../assets/Workstation_PC_Banner.jpg';
import styles from '../styles/Hero.module.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Autoplay } from 'swiper/modules';

const Hero = () => {
    return (
        <div className={styles.hero_container}>
             <Swiper autoplay={{ delay: 5000,disableOnInteraction: false,}}  modules={[Autoplay]} className="mySwiper">
                    <SwiperSlide>
                        <Image src={banner_1} alt='banner_1' className={styles.banner_container_image} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={banner_2} alt='banner_2' className={styles.banner_container_image} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={banner_3} alt='banner_3' className={styles.banner_container_image} />
                    </SwiperSlide>
      </Swiper>
        </div>
    )
}
export default Hero