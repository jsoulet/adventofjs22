import styled from 'styled-components'
import Button from './Button'
import formatPrice from './formatPrice'

const Increase = styled((props) => <Button {...props}>
    <img src="/images/ecommerce/chevron.svg" alt="Increase"/>
  </Button>)`
    padding: 0;
  height: 32px;
  width: 32px;
  display: block;
  & img {
  transform: rotate(180deg);
  position: relative;
  top: 1px;
  left: 2px;
}
`

const Decrease = styled((props) => <Button {...props}>
    <img src="/images/ecommerce/chevron.svg" alt="Decrease"/>
  </Button>)`
    padding: 0;
  height: 32px;
  width: 32px;
  display: block;
  & img {
    top: 1px;
    position: relative;
    left: -1px;
  }
`

const Quantity = styled.div`
  background: black;
  color: white;
  font-size: 1rem;
  grid-area: quantity;
  font-weight: bold;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const QuantityWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const QuantityLabel = styled(Quantity)`
  background: none;
  color: black;
`
const ListItem = styled.li`
  display: grid;
  grid-template-areas: "plate content content"
    "plate quantity price";
  border-bottom: 1px solid #D7D7F9;
  margin-bottom: 45px;
  padding-bottom: 45px;
  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`

const Name = styled.p`
  font-size: 1.125rem;
  line-height: 20px;
  margin: 0 0 5px;
  padding: 0;
`

const Price = styled.div`
  margin: 0 0 16px 0;
  font-size: 1rem;
  line-height: 1;
  font-weight: bold;
`

const SubTotal = styled.div`
  font-size: 2rem;
  line-height: 1;
  font-weight: bold;
  text-align: right;
`

const Content = styled.div`
  grid-area: content;
`

const Plate = styled.div`
  position: relative;
  height: 64px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: plate;
  & img {
    height: 64px;
    width: 64px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
`

interface Props {
  name: string;
  price: number;
  img: string;
  alt: string;
  count: number;
  onIncrease: () => void,
  onDecrease: () => void,
}

const CartItem = ({
  name,
  price,
  img,
  alt,
  count,
  onIncrease,
  onDecrease,
} : Props) => {
  return <ListItem>
      <Plate>
        <img src={`/images/ecommerce/${img}`} alt={alt} />
        <Quantity>{count}</Quantity>
      </Plate>
      <Content>
        <Name>{name}</Name>
        <Price>{formatPrice(price)}</Price>
      </Content>
      <QuantityWrapper>
        <Decrease onClick={onDecrease}/>
        <QuantityLabel>{count}</QuantityLabel>
        <Increase  onClick={onIncrease}/>
      </QuantityWrapper>
      <SubTotal>
        {formatPrice(price * count)}
      </SubTotal>
    </ListItem>
}

export default CartItem