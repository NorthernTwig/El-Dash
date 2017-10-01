import * as React from 'react'
import { compose, mapProps } from 'recompose'
import { Container } from '../common/Container'
import { generateCharacters } from '../common/generateCharacters'

const getCommitText = ({ text, ...props }) => {
  const generatedCharacters = generateCharacters(text)
  return generatedCharacters(props)
}

const enhance = compose(
  mapProps(props =>
    Object.assign({}, props, {
      text: props.text.split(''),
      amount: props.text.length,
    }),
  ),
)

export const Text = enhance(props => (
  <Container small={ props.small } amount={ props.amount } animation={ props.animation }>
    {getCommitText(props)}
  </Container>
))
