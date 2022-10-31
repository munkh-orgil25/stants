import { Route } from 'wouter'
import First from './First'
import Second from './Second'

export default function Electricity() {
  return (
    <>
      <Route path="/">
        <First />
      </Route>
      <Route path="/1">
        <Second />
      </Route>
    </>
  )
}
