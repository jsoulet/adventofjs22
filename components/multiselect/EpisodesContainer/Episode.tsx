import styled from "styled-components";

const StyledEpisode = styled.li`
  margin-bottom: 24px;
  font-size: 1rem;
  & label {
    cursor: pointer;
  }
  input[type="checkbox"] {
    display: none;
    & + span {
      background: url('/images/multiselect/checkbox--unchecked.svg') left top no-repeat;
      background-size: 20px 20px;
      min-height: 20px;
      padding-left: 30px;
    }

    &:checked + span {
      background-image: url('/images/multiselect/checkbox--checked.svg');
      text-decoration: line-through;
      color: #C9CDD1;
    }
  }
`

interface Props {
  name: string,
  id: number,
  checked: boolean,
  onClick: (id: number, currentValue: boolean) => void
}
const Episode = ({
  name,
  id,
  checked,
  onClick,
}: Props) => {
  return <StyledEpisode>
    <label htmlFor={`episode-${id}`}>
        <input type="checkbox" name={`episode-${id}`} id={`episode-${id}`} checked={checked} onChange={() => onClick(id, checked)}/>
        <span>{id} || {name}</span>
    </label>
  </StyledEpisode>
}

export default Episode