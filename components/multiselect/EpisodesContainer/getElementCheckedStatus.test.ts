import getElementCheckedStatus from './getElementCheckedStatus'

describe('getElementCheckedStatus', () => {
  let isPressingMaj: boolean
  describe('maj is not pressed', () => {
    beforeEach(() => {
      isPressingMaj = false
    })
    describe('current element is clicked element', () => {
      it('should toggle', () => {
        const resultFalse = getElementCheckedStatus(
          {id: 1, checked: true},
          {id: 1, checked: true},
          undefined,
          isPressingMaj
        )
        const resultTrue = getElementCheckedStatus(
          {id: 1, checked: false},
          {id: 1, checked: false},
          undefined,
          isPressingMaj
        )
        expect(resultFalse).toBe(false)
        expect(resultTrue).toBe(true)
      })
    })

    describe('current element is not clicked element', () => {
      it('should not toggle', () => {
        const resultFalse = getElementCheckedStatus(
          {id: 2, checked: false},
          {id: 1, checked: false},
          undefined,
          isPressingMaj
        )
        const resultTrue = getElementCheckedStatus(
          {id: 2, checked: true},
          {id: 1, checked: true},
          undefined,
          isPressingMaj
        )
        expect(resultFalse).toBe(false)
        expect(resultTrue).toBe(true)
      })
    })
  })

  describe('maj is pressed', () => {
    beforeEach(() => {
      isPressingMaj = true
    })
    describe('current element is clicked element', () => {
      it('should toggle', () => {
        const resultFalse = getElementCheckedStatus(
          {id: 1, checked: true},
          {id: 1, checked: true},
          undefined,
          isPressingMaj
        )
        const resultTrue = getElementCheckedStatus(
          {id: 1, checked: false},
          {id: 1, checked: false},
          undefined,
          isPressingMaj
        )
        expect(resultFalse).toBe(false)
        expect(resultTrue).toBe(true)
      })
    })
    describe('current element is not clicked element', () => {
      describe('current element is within clicked element and last clicked element', () => {
        it('should return toggled last clicked value', () => {
          expect(
            getElementCheckedStatus(
              {id: 2, checked: true},
              {id: 3, checked: true},
              {id: 1, checked: true},
              isPressingMaj
            ))
          .toBe(false)
          expect(
            getElementCheckedStatus(
              {id: 2, checked: false},
              {id: 3, checked: false},
              {id: 1, checked: true},
              isPressingMaj
            ))
          .toBe(true)
          expect(
            getElementCheckedStatus(
              {id: 2, checked: false},
              {id: 3, checked: true},
              {id: 1, checked: false},
              isPressingMaj
            ))
          .toBe(true)
          expect(
            getElementCheckedStatus(
              {id: 2, checked: true},
              {id: 3, checked: false},
              {id: 1, checked: true},
              isPressingMaj
            ))
          .toBe(true)
        })
      })
      describe('current element is not within clicked element and last clicked element', () => {
        it('should not toggle', () => {
          const resultTrue = getElementCheckedStatus(
            {id: 5, checked: true},
            {id: 3, checked: true},
            {id: 1, checked: true},
            isPressingMaj
          )
          const resultFalse = getElementCheckedStatus(
            {id: 5, checked: false},
            {id: 3, checked: false},
            {id: 1, checked: false},
            isPressingMaj
          )
          expect(resultFalse).toBe(false)
          expect(resultTrue).toBe(true)
        })
      })  
    })
  })
})
