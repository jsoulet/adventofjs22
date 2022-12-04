import styled from "styled-components";

const Button = styled.button`
  background: #6B00F5;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  border-radius: 20px;
  padding: 4px 18px;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 300ms ease;
  &:hover {
    background: black;
  }
`

export default Button