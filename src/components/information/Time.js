import * as React from 'react'
import styled from 'styled-components'
import { compose, withState, lifecycle, defaultProps } from 'recompose'
import { Number } from '../common/PixelSymbol'
import * as display from '../../utils/numbers'
import { Container } from '../common/Container'

const extractValue = ({ index }) => ({ date }) => ({ number: date.slice(-2)[index] })
const addZero = ({ date }) => ({ date: `0${ date }` })
const setDateString = ({ date }) => ({ date: date.toString() })
const getDate = ({ index }) =>
  compose(display.getNumberAsText, extractValue({ index }), addZero, setDateString)

const getHours = ({ index }) => {
  const date = new Date().getHours()
  return getDate({ index })({ date })
}

const getMinutes = ({ index }) => {
  const date = new Date().getSeconds()
  return getDate({ index })({ date })
}

const enhance = compose(
  withState('firstHour', 'setFirstHour', () => getHours({ index: 0 })),
  withState('secondHour', 'setSecondHour', () => getHours({ index: 1 })),
  withState('firstMinute', 'setFirstMinute', () => getMinutes({ index: 0 })),
  withState('secondMinute', 'setSecondMinute', () => getMinutes({ index: 1 })),
  defaultProps({ amount: 5 }),
  lifecycle({
    componentDidMount() {
      setInterval(() => {
        this.props.setFirstHour(getHours({ index: 0 }))
        this.props.setSecondHour(getHours({ index: 1 }))
        this.props.setFirstMinute(getMinutes({ index: 0 }))
        this.props.setSecondMinute(getMinutes({ index: 1 }))
      }, 5000)
    },
  }),
)

const getTime = (time, small, animation) => {
  const timeArray = [...Object.values(time)]
  return new Array(5)
    .fill(<div />)
    .map((tag, index) => (
      <Number small={ small } key={ index } display={ display[timeArray[index]] } animation={ animation } />
    ))
}

export const Time = enhance(
  ({ firstHour, secondHour, firstMinute, secondMinute, small, amount, animation }) => (
    <Container small={ small } amount={ amount }>
      {getTime(
        { firstHour, secondHour, colon: 'colon', firstMinute, secondMinute },
        small,
        animation,
      )}
    </Container>
  ),
)