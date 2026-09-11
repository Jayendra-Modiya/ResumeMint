import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const result = await handleLogin({ email, password })

        if (result.success) {
            navigate('/planner')
        } else {
            setError(`* ${result.message}`)
        }
    }

    if(loading){
        return (
            <main className='loading-screen' style={{
                background: 'radial-gradient(circle at top, rgba(255,61,129,0.18), transparent 30%), linear-gradient(180deg,#0a1220 0%,#0e1728 100%)',
                color: '#f8fafc',
                fontFamily: 'system-ui, sans-serif'
            }}>
                <h2 style={{fontWeight:700, letterSpacing:'-0.04em'}}>Loading...</h2>
            </main>
        )
    }


    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            required type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            required type="password" id="password" name='password' placeholder='Enter password' />
                    </div>
                    {error && <p className='form-error' role='alert'>{error}</p>}
                    <button className='button primary-button' >Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login
