import styled from 'styled-components'
import { MenuItem, OrderItem } from '../../types/ecommerce'
import CartItem from './CartItem'
import Panel from './Panel'
import Totals from './Totals'

interface Props {
  menuItems: MenuItem[],
  order: OrderItem[],
  handleIncrease: (id: number) => void,
  handleDecrease: (id: number) => void,
}

const CartSummary = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-bottom: 5px solid #D7D7F9;
  margin: 0 30px 0 25px;
`

const Empty = styled.div`
  padding-left: 40px;
`

const Cart = ({order, menuItems, handleIncrease, handleDecrease}: Props) => {
  return <Panel title="Your Cart">
    <>
      {order.length === 0 && <Empty>Your cart is empty</Empty>}
      {order.length > 0 && <>
        <CartSummary>
          {order.map(orderItem => {
            const menuItem = menuItems.find(menuItem => menuItem.id === orderItem.id)
            if(!menuItem) {
              return
            }
            return <CartItem
              key={orderItem.id}
              name={menuItem.name}
              price={menuItem.price}
              img={menuItem.image}
              alt={menuItem.alt}
              count={orderItem.count}
              onIncrease={() => handleIncrease(menuItem.id)}
              onDecrease={() => handleDecrease(menuItem.id)}
            ></CartItem>
          })}
        </CartSummary>
        <Totals order={order} menu={menuItems} taxRate={0.0975}/>
      </>}
    </>
  </Panel>
}

export default Cart