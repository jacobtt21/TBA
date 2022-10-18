import Nav from '../nav'

export default function Layout({ user, setUser, children }) {
  return (
    <div>
      {user && (
        <Nav user={user} setUser={setUser} />
      )}
      {children}
      {!user && (
        <Nav user={user} setUser={setUser} />
      )}
    </div>
  )
}
