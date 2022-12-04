import Image from "next/image"
import styled from "styled-components"
import { MenuItem as MenuItem } from "../../types/ecommerce"
import Button from './Button'
import formatPrice from './formatPrice'

interface Props extends MenuItem {
  hasInCart: boolean,
  onAddToCart: (id: number) => void,
}

const DishRoot = styled.li`
  margin-left: 15px;
  display: flex;
  padding-right: 30px;
  position: relative;
  gap: 20px;
  margin-bottom: 45px;

  &:nth-child(4n + 1):before {
    --background: #e1f1fe
  }

  &:nth-child(4n + 2):before {
    --background: #ffe2f0
  }

  &:nth-child(4n + 3):before {
    --background: #f7f7fe
  }

  &:nth-child(4n + 4):before {
    --background: #defef0
  }

  &:before {
    background: var(--background);
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 30px;
    top: 0;
    z-index: 1;
  }
`

const Plate = styled(Image)`
  height: 148px;
  width: 148px;
  position: relative;
  z-index: 2;
  top: -15px;
`
const Content = styled.div`
  padding-top: 30px;
  position: relative;
  width: 100%;
  z-index: 3;
`
const Name = styled.p`
  font-size: 1.125rem;
  line-height: 20px;
  margin: 0 0 16px 0;
  padding: 0;
`
const Price = styled.p`
  font-size: 2rem;
  line-height: 1;
  font-weight: bold;
  margin: 0 0 20px 0;
  padding: 0;
`
const AddToCartButton = styled((props) => {
  return <Button {...props}>Add to cart</Button>
})`
  position: absolute;
`

const InCartButton = styled((props) => {
  return <Button {...props}>
      <Image src="/images/ecommerce/check.svg" alt="Check" width="22" height="17" />
      In Cart
  </Button>
})`
  position: absolute;
  background: black;
`

const Dish = ({name, price, image, alt, id, hasInCart, onAddToCart}: Props) => {
  return <DishRoot>
    <Plate src={`/images/ecommerce/${image}`} alt={alt} width={148} height={148} />
    <Content>
      <Name>{name}</Name>
      <Price>{formatPrice(price)}</Price>
      {hasInCart ? <InCartButton disabled/> : <AddToCartButton onClick={() => onAddToCart(id)} />}
    </Content>
  </DishRoot>
}

export default Dish