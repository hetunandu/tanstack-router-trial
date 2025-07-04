import { useNavigate } from "@tanstack/react-router"
import type { User } from "@/types/user"

export default function AuthenticatedUserInfo(props: { user: User, logout: () => void }) {
    const { user, logout } = props
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate({ to: '/' })
    }

    if (!user) {
        return null
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Welcome, {user.firstName} {user.lastName}</span>
        <button
            onClick={handleLogout}
            style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem'
            }}
        >
            Logout
        </button>
        </div>
    )
}