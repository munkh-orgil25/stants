import React from 'react'
import { Route } from 'wouter'
import First from './First'

export default function XRElectricity() {
  return (
    <>
      <Route path="/">
        <First />
      </Route>
      <Route path="/1">
        <First />
      </Route>
    </>
  )
}
