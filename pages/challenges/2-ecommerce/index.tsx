import styled from 'styled-components'
import Page from '../../../components/Page'
import { Menu, Cart } from '../../../components/ecommerce'
import { useState } from "react";
import { OrderItem } from "../../../types/ecommerce";

const StyledPage = styled(Page)`
  background: url('/images/ecommerce/bg__left.svg') left 10% no-repeat,
    url('/images/ecommerce/bg__top-right.svg') right top no-repeat,
    #EFF0F6 url('/images/ecommerce/bg__btm-right.svg') right bottom no-repeat;
  font-family: 'Poppins', sans-serif;
  background-color: #EFF0F6;
  color: #212121;
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100vw;
  gap: 50px;
  height: 100vh;
`
const menuItems = [
  {
      id: 1,
      name: 'French Fries with Ketchup',
      price: 223,
      image: 'plate__french-fries.png',
      alt: 'French Fries',
  },
  {
      id: 2,
      name: 'Salmon and Vegetables',
      price: 512,
      image: 'plate__salmon-vegetables.png',
      alt: 'Salmon and Vegetables',
  },
  {
      id: 3,
      name: 'Spaghetti Meat Sauce',
      price: 782,
      image: 'plate__spaghetti-meat-sauce.png',
      alt: 'Spaghetti with Meat Sauce',
  },
  {
      id: 4,
      name: 'Bacon, Eggs, and Toast',
      price: 599,
      image: 'plate__bacon-eggs.png',
      alt: 'Bacon, Eggs, and Toast',
  },
  {
      id: 5,
      name: 'Chicken Salad with Parmesan',
      price: 698,
      image: 'plate__chicken-salad.png',
      alt: 'Chicken Salad with Parmesan',
  },
  {
      id: 6,
      name: 'Fish Sticks and Fries',
      price: 634,
      image: 'plate__fish-sticks-fries.png',
      alt: 'Fish Sticks and Fries',
  }
]

const isElementInCart = (id: number, order: OrderItem[]) => {
  return Boolean(order.find(orderItem => orderItem.id === id))
}

const EcommercePage = () => {
  const [order, setOrder] = useState<OrderItem[]>([
    {
      id: 6,
      count: 1
    },
    {
      id: 2,
      count: 2
    },
  ])
  const handleAddToCart = (id: number) => {
    const isInCart = isElementInCart(id, order)
    if(isInCart) {
      return
    }
    setOrder((order) => [...order, {
      id,
      count: 1
    }])
  }

  const handleIncrease = (id: number) => {
    const isInCart = isElementInCart(id, order)
    if(!isInCart) {
      return
    }
    setOrder((order) => order.map(orderItem => {
      if(orderItem.id === id) {
        return {
          ...orderItem,
          count: orderItem.count + 1
        }
      }
      return orderItem
    }))
  }

  const handleDecrease = (id: number) => {
    const isInCart = isElementInCart(id, order)
    if(!isInCart) {
      return
    }
    setOrder((order) => order
      .map(orderItem => {
        if(orderItem.id === id) {
          return {
            ...orderItem,
            count: orderItem.count - 1
          }
        }
        return orderItem
      })
      .filter(orderItem => orderItem.count > 0)
    )
  }
  return <StyledPage title="E-commerce component">
    <Menu menuItems={menuItems} order={order} handleAddToCart={handleAddToCart}/>
    <Cart menuItems={menuItems} order={order} handleIncrease={handleIncrease} handleDecrease={handleDecrease}/>
  </StyledPage>
}

export default EcommercePage