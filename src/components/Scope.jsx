import { Router, useLocation, useRouter } from 'wouter'

function Scope({ base, children }) {
  const router = useRouter()
  const [parentLocation] = useLocation()

  const nestedBase = `${router.base}${base}`

  // don't render anything outside of the scope
  if (!parentLocation.startsWith(nestedBase)) return null

  // we need key to make sure the router will remount if the base changes
  return (
    <Router base={nestedBase} key={nestedBase}>
      {children}
    </Router>
  )
}

export default Scope
