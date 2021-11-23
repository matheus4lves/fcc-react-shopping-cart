import {useQuery} from "react-query"
// Components
import Item from "./Item/Item"
import { Grid, LinearProgress } from "@material-ui/core"
// Styles
import {Wrapper} from "./App.styles"

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

  if(isLoading) return <LinearProgress />

  if(error) return <div>Something went wrong...</div>

  const addToCart = () => null;

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
