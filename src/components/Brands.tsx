import styles from '@/styles/Brands.module.css'
import { brandImg } from '@/utils/brandImg'
const Brands = () => {
    return (
        <div className={styles.slider}>
            <div className={styles.slide_track}>
                {
                    brandImg.map((img, index) => (
                        <div className={styles.slide} key={index}>
                            <img className={styles.brand_logo} src={img} alt='img'/>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
export default Brands