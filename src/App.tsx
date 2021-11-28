import {useQuery} from "react-query"
// Components
import Item from "./Item/Item"
import { Drawer, Grid, LinearProgress } from "@material-ui/core"
import Badge from "@material-ui/core/Badge"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import Cart from "./Cart/Cart"
// Styles
import {Wrapper, StyledButton} from "./App.styles" // Object destructuring
import { useState } from "react"

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

  const addToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if(isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item
        ))
      }

      // 2. First time item is added
      return [...prev, {...clickedItem, amount: 1}]
    })
  }
  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0); // The initial value of the accumulator is set to 0
  const removeFromCart = () => null

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart}/>
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
