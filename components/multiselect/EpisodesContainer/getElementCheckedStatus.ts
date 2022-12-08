export type Element = {
  id: number,
  checked: boolean,
}
const getElementCheckedStatus = (
  currentElement: Element,
  clickedElement: Element,
  lastClickedElement: Element | undefined,
  isPressingMaj: boolean,
) => {
  if(!isPressingMaj) {
    console.log('non pressing maj')
    if(currentElement.id === clickedElement.id) {
      console.log('same')
      return !currentElement.checked
    } else {
      console.log('different')
      return currentElement.checked
    }
  }
  if(currentElement.id === clickedElement.id) {
    return !currentElement.checked
  }
  if(!isPressingMaj || !lastClickedElement ) {
     return currentElement.checked
  }
  if(
    lastClickedElement.id >= clickedElement.id && currentElement.id <= lastClickedElement.id && currentElement.id > clickedElement.id
    ||
    lastClickedElement.id <= clickedElement.id && currentElement.id >= lastClickedElement.id && currentElement.id < clickedElement.id
  ) {
    return !lastClickedElement.checked
  }

  return currentElement.checked
}

export default getElementCheckedStatus