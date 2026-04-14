import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export default function PageLayout({ isLoggedIn, onLogout, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="flex-1 min-h-[calc(100vh-80px)] flex flex-col">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
