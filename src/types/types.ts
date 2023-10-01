export interface Details {
  map(
    arg0: (component: Details) => import("react").JSX.Element
  ): import("react").ReactNode;
  _id: string;
  image: string;
  productName: string;
  category: string;
  status: string;
  price: number;
  description: string;
  keyFeatures: {
    brand: string;
    model: string;
    specification: string;
    port: string;
    type: string;
    resolution: string;
    voltage: string;
  };
  individualRating: number;
  averageRating: number;
  reviews: string[];
  quantity?:number
}
export interface PcComponent{
    component:Details
}
export interface ComponentCategory {
  categoryType:string
}
export interface PcComponents {
  components: Details;
}
export interface ICategories {
  categories: {
    [x: string]: any;
    categories: string[];
  };
}
export interface IDetailProps {
  details: Details;
}
export interface Props {
  children: React.ReactNode;
}
export interface IComponent {
  cartComponents: Details[];
  count: number;
  wishlist:string[]
}