import React from 'react'
import { useNavigate } from 'react-router'
import '../style/home.scss'
import { useAuth } from '../../auth/hooks/useAuth'

const featureCards = [
    {
        title: 'Role-specific strategy',
        text: 'Get a tailored interview roadmap aligned to the exact job description, seniority level, and expected skill mix.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80'
    },
    {
        title: 'Resume-to-role alignment',
        text: 'Spot the gaps between your profile and the role, and learn what to emphasize in your story and examples.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
    },
    {
        title: 'Confidence-building prep',
        text: 'Practice with structured prep plans, focused exercises, and the strongest talking points for your interviews.',
        image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=900&q=80'
    }
]

const LandingPage = () => {
    const navigate = useNavigate()
    const { user, handleLogout } = useAuth()
    const isLoggedIn = Boolean(user)

    const handlePrimaryAction = () => {
        if (isLoggedIn) {
            navigate('/planner')
            return
        }

        navigate('/register')
    }

    const handleLogoutClick = async () => {
        await handleLogout()
        navigate('/')
    }

    return (
        <div className='resume-home'>
            <header className='topbar'>
                <div className='brand-block'>
                    <div className='brand-mark'>RM</div>
                    <span className='brand-name'>ResumeMint</span>
                </div>

                <div className='nav-actions'>
                    {isLoggedIn ? (
                        <>
                            <button type='button' className='nav-button nav-button--ghost' onClick={() => navigate('/planner')}>Planner</button>
                            <button type='button' className='nav-button nav-button--primary' onClick={handleLogoutClick}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button type='button' className='nav-button nav-button--ghost' onClick={() => navigate('/login')}>Login</button>
                            <button type='button' className='nav-button nav-button--primary' onClick={() => navigate('/register')}>Register</button>
                        </>
                    )}
                </div>
            </header>

            <main className='home-main'>
                <section className='hero-section'>
                    <div className='hero-copy'>
                        <span className='eyebrow'>Career strategy platform</span>
                        <h1>Build a confident interview plan for your next role.</h1>
                        <p>
                            ResumeMint helps you align your profile with the right opportunity and prepare with a structured, professional strategy built around your experience.
                        </p>
                        <div className='nav-actions'>
                            <button type='button' className='nav-button nav-button--primary' onClick={handlePrimaryAction}>
                                {isLoggedIn ? 'Open Planner' : 'Get Started'}
                            </button>
                        </div>
                    </div>
                </section>

                <section className='feature-strip'>
                    {featureCards.map(card => (
                        <article key={card.title} className='feature-card'>
                            <img src={card.image} alt={card.title} />
                            <div className='feature-content'>
                                <h3>{card.title}</h3>
                                <p>{card.text}</p>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    )
}

export default LandingPage
