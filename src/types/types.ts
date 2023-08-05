export interface Details {
  map(arg0: (component: Details) => import("react").JSX.Element): import("react").ReactNode;
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
}
export interface PcComponent{
    component:Details
}
export interface PcComponents {
  components: Details;
}
