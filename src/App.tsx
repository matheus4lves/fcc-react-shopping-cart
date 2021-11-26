import {useQuery} from "react-query"
// Components
import Item from "./Item/Item"
import { Drawer, Grid, LinearProgress } from "@material-ui/core"
// Styles
import {Wrapper, StyledButton} from "./App.styles" // Object destructuring
import { useState } from "react"
import Badge from "@material-ui/core/Badge"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"

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

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  if(isLoading) return <LinearProgress />

  if(error) return <div>Something went wrong...</div>

  const addToCart = () => null;
  const getTotalItems = (items: CartItemType[]) => null;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here...
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
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
