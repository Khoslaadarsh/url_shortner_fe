import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

export default function PageLayout({ isLoggedIn, onLogout, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  )
}
