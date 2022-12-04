import { useMemo } from "react"
import styled from "styled-components"
import { MenuItem, OrderItem } from "../../types/ecommerce"
import formatPrice from './formatPrice'

interface Props {
  menu: MenuItem[],
  order: OrderItem[],
  taxRate: number,
}

const StyledTotals = styled.div`
  padding: 35px 30px;
`

const LineItem = styled.div`
  display: flex;
  align-items: flex-end;
  text-align: right;
  margin-bottom: 20px;
`

const Label = styled.div`
  font-size: 1rem;
  font-weight: bold;
  width: 60%;
`

const Amount = styled.div`
  font-size: 2rem;
  line-height: 1;
  font-weight: bold;
  width: 40%;
`

const Total = styled(Amount)`
  color: #6B00F5;
`
function getPriceForItem(id: number, menu: MenuItem[]) {
  const item = menu.find((menuItem) => menuItem.id === id)
  if(!item) {
    return 0
  }
  return item.price
}

const Totals = ({menu, order, taxRate}: Props) => {
  const subTotal = order.reduce((total, orderItem) => getPriceForItem(orderItem.id, menu) * orderItem.count + total, 0)
  const tax = subTotal * taxRate
  return <StyledTotals>
    <LineItem>
      <Label>Subtotal:</Label>
      <Amount>{formatPrice(subTotal)}</Amount>
    </LineItem>
    <LineItem>
      <Label>Tax:</Label>
      <Amount>{formatPrice(tax)}</Amount>
    </LineItem>
    <LineItem>
      <Label>Total:</Label>
      <Total>{formatPrice(subTotal + tax)}</Total>
    </LineItem>
  </StyledTotals>
}

export default Totals