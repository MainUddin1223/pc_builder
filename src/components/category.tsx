import { useGetComponentsQuery } from "@/redux/features/components/componentApi";
import styles from '@/styles/Category.module.css';
import { ComponentCategory, Details } from "@/types/types";
import { useRouter } from "next/router";
import Featured from "./Featured";


const Category = ({ categoryType }: ComponentCategory) => {
    const router = useRouter()
    const { data } = useGetComponentsQuery(categoryType);
    return (
        <div className={styles.category_container}>
            <div className={styles.category_header_container}>
                <p >{`Category > ${categoryType}`}</p>
            </div>
            <hr className={styles.category_hr} />
            <div className={styles.component_container}>
                {
                    data?.data.map((component: Details) => (
                        <Featured component={component} key={component._id} />
                    ))
                }
            </div>
        </div>
    )
}
export default Category