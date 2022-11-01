import React from 'react'
import { Route } from 'wouter'
import First from './First'

export default function XRElectricity({ setLocation }) {
  return (
    <>
      <Route path="/">
        <First setLocation={setLocation} />
      </Route>
      <Route path="/1">
        <First setLocation={setLocation} />
      </Route>
    </>
  )
}
