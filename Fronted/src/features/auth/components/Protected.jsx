import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (
            <main style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at top, rgba(255,61,129,0.18), transparent 30%), linear-gradient(180deg,#0a1220 0%,#0e1728 100%)',
                color: '#f8fafc',
                fontFamily: 'system-ui, sans-serif'
            }}>
                <h2 style={{fontWeight:700, letterSpacing:'-0.04em'}}>Loading...</h2>
            </main>
        )
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected