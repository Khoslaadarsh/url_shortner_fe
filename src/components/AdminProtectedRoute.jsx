import { Navigate } from 'react-router-dom'

export default function AdminProtectedRoute({ isAdminLoggedIn, children }) {
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}
