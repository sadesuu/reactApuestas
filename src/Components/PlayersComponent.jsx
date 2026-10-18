import React, { Component } from 'react'
import serviceJugadores from '../Services/serviceJugadores'

export default class PlayersComponent extends Component {
    service = new serviceJugadores()

    state = {
        jugadores: [],
        loading: true,
        error: null
    }

    getJugadores = async () => {
        try {
            const jugadores = await this.service.getJugadoresByEquipo(this.props.id)
            this.setState({
                jugadores,
                loading: false,
                error: null
            })
        } catch {
            this.setState({
                loading: false,
                error: 'No se pudieron cargar los jugadores.'
            })
        }
    }

    componentDidMount = async () => {
        await this.getJugadores()
    }

    componentDidUpdate = async (previousProps) => {
        if (previousProps.id !== this.props.id) {
            this.setState({
                jugadores: [],
                loading: true,
                error: null
            })
            await this.getJugadores()
        }
    }

    render() {
        const { jugadores, loading, error } = this.state

        return (
            <main style={styles.page}>
                <section style={styles.section} aria-labelledby="players-title">
                    <p style={styles.eyebrow}>Plantilla del equipo</p>
                    <h1 id="players-title" style={styles.title}>Jugadores</h1>

                    {loading && <p style={styles.status}>Cargando jugadores...</p>}
                    {error && <p style={styles.statusError}>{error}</p>}
                    {!loading && !error && jugadores.length === 0 && (
                        <p style={styles.status}>Este equipo no tiene jugadores registrados.</p>
                    )}

                    <div style={styles.grid}>
                        {jugadores.map((jugador) => (
                            <article key={jugador.idJugador} style={styles.player}>
                                <img
                                    src={jugador.imagen}
                                    alt={jugador.nombre}
                                    style={styles.image}
                                />
                                <div style={styles.info}>
                                    <h2 style={styles.name}>{jugador.nombre}</h2>
                                    <p style={styles.position}>{jugador.posicion}</p>
                                    <p style={styles.country}>{jugador.pais}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        )
    }
}

const styles = {
    page: {
        backgroundColor: '#f4f1ea',
        minHeight: 'calc(100vh - 56px)',
        padding: 'clamp(2rem, 6vw, 6rem) clamp(1rem, 6vw, 7rem)',
        color: '#171717'
    },
    section: {
        backgroundColor: '#e7e2d9',
        margin: '0 auto',
        maxWidth: '1180px',
        padding: 'clamp(2rem, 5vw, 4rem)'
    },
    eyebrow: {
        color: '#9b6b27',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.18em',
        margin: '0 0 1rem',
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 'clamp(3rem, 7vw, 6rem)',
        letterSpacing: '-0.06em',
        lineHeight: 0.9,
        margin: '0 0 3rem',
        textTransform: 'uppercase'
    },
    grid: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))'
    },
    player: {
        backgroundColor: '#ffffff',
        display: 'flex',
        minHeight: '140px',
        overflow: 'hidden'
    },
    image: {
        backgroundColor: '#1d2935',
        height: '140px',
        objectFit: 'cover',
        width: '110px'
    },
    info: {
        padding: '1.1rem'
    },
    name: {
        fontSize: '1.2rem',
        lineHeight: 1,
        margin: '0 0 0.6rem',
        textTransform: 'uppercase'
    },
    position: {
        color: '#9b6b27',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        margin: '0 0 0.45rem',
        textTransform: 'uppercase'
    },
    country: {
        color: '#73736e',
        fontSize: '0.8rem',
        margin: 0
    },
    status: {
        color: '#4f514e',
        fontSize: '1.1rem',
        margin: 0
    },
    statusError: {
        color: '#9a342d',
        fontSize: '1.1rem',
        margin: 0
    }
}
