import {useQuery} from "react-query"

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

// fecth data
const getProducts = async (): Promise<CartItemType[]> => await (await fetch("https://fakestoreapi.com/products")).json()

function App() {
  const {data, isLoading, error} = useQuery<CartItemType[]>("products", getProducts)
  console.log(data)
  return (
    <div className="App">
      Start
    </div>
  );
}

export default App;
