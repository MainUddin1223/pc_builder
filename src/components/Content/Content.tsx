import { Details, PcComponents } from "@/types/types"
import Image from "next/image"
import { useRouter } from "next/router"
import banner from '../../assets/Banner.jpg'
import Brands from "../Brands"
import Featured from "../Featured"
import styles from './Content.module.css'


const Content = ({ components }: PcComponents) => {
    const router = useRouter()
    return (
        <>
            <div style={{ margin: "10px 0" }} >
                <Image src={banner} alt="banner" layout="responsive" />
            </div>
      <div className={styles.container}>
          {components.map((component: Details) => (
              <Featured component={component} key={component._id} />
          ))}
      </div>
       <button className={styles.see_more_btn} onClick={() => router.push('/pc_builder')}>See more</button>

            <Brands />
        </>
  )
}

export default Content