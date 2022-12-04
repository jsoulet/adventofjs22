import Panel from './Panel'
import type { MenuItem, OrderItem } from '../../types/ecommerce'
import Dish from './Dish'
import styled from 'styled-components'

interface Props {
  menuItems: MenuItem[],
  order: OrderItem[],
  handleAddToCart: (id: number) => void
}

const PlateList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

const Menu = ({menuItems, order, handleAddToCart}: Props) => {
  return <Panel title="To Go Menu">
    <PlateList>
      {menuItems.map(menuItem => {
        const hasInCart = order.find((orderItem) => orderItem.id === menuItem.id)
        return <Dish
          key={menuItem.id}
          id={menuItem.id}
          name={menuItem.name}
          price={menuItem.price}
          image={menuItem.image}
          alt={menuItem.alt}
          hasInCart={Boolean(hasInCart)}
          onAddToCart={handleAddToCart}
        />
      })}
    </PlateList>
  </Panel>
}

export default Menu