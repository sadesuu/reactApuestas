import React, { Component } from 'react'
import serviceEquipos from '../Services/serviceEquipos'
import { NavLink } from 'react-router-dom'

export default class TeamsComponent extends Component {

    service = new serviceEquipos();

    state = {
        equipo: null,
        loading: true,
        error: null
    }

    getTeamById = async () =>{
        try {
            const datos = await this.service.getEquiposById(this.props.id)
            this.setState({
                equipo: datos,
                loading: false,
                error: null
            })
        } catch {
            this.setState({
                loading: false,
                error: 'No se pudo cargar la información del equipo.'
            })
        }
    }

    componentDidMount = async () =>{
        await this.getTeamById()
    }

    componentDidUpdate = async (previousProps) => {
        if (previousProps.id !== this.props.id) {
            this.setState({
                equipo: null,
                loading: true,
                error: null
            })
            await this.getTeamById()
        }
    }

    render() {
        const { equipo, loading, error } = this.state

        if (loading) {
            return (
                <main style={styles.page}>
                    <p style={styles.status}>Cargando equipo...</p>
                </main>
            )
        }

        if (error) {
            return (
                <main style={styles.page}>
                    <p style={styles.statusError}>{error}</p>
                </main>
            )
        }

        if (!equipo) {
            return (
                <main style={styles.page}>
                    <p style={styles.status}>No se encontró el equipo.</p>
                </main>
            )
        }

        return (
            <main style={styles.page}>
                <article className="team-profile" style={styles.profile}>
                    <div style={styles.imagePanel}>
                        <img
                            src={equipo.imagen}
                            alt={`Escudo de ${equipo.nombre}`}
                            style={styles.image}
                        />
                        <span style={styles.idLabel}>
                            EQUIPO {String(equipo.idEquipo).padStart(2, '0')}
                        </span>
                    </div>

                    <div style={styles.content}>
                        <p style={styles.eyebrow}>Ficha del club</p>
                        <h1 style={styles.title}>{equipo.nombre}</h1>
                        <p style={styles.description}>{equipo.descripcion}</p>

                        <div style={styles.stats} aria-label={`Datos de ${equipo.nombre}`}>
                            <div style={styles.stat}>
                                <strong style={styles.statValue}>{equipo.champions}</strong>
                                <span style={styles.statLabel}>Champions</span>
                            </div>
                            <div style={styles.stat}>
                                <strong style={styles.statValue}>{equipo.finalista}</strong>
                                <span style={styles.statLabel}>Finales</span>
                            </div>
                        </div>

                        <a
                            href={equipo.web}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.website}
                        >
                            Visitar sitio oficial <span aria-hidden="true">↗</span>
                        </a>

                        <NavLink to={`/team/${equipo.idEquipo}/players`} style={styles.playersButton}>
                            Ver jugadores <span aria-hidden="true">→</span>
                        </NavLink>
                    </div>
                </article>
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
    profile: {
        backgroundColor: '#ffffff',
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 0.9fr) minmax(0, 1.1fr)',
        maxWidth: '1180px',
        minHeight: '560px',
        margin: '0 auto',
        boxShadow: '0 24px 60px rgba(23, 23, 23, 0.12)',
        overflow: 'hidden'
    },
    imagePanel: {
        backgroundColor: '#1d2935',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '320px',
        padding: 'clamp(2rem, 8vw, 6rem)',
        position: 'relative'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '330px',
        objectFit: 'contain',
        filter: 'drop-shadow(0 18px 18px rgba(0, 0, 0, 0.28))'
    },
    idLabel: {
        bottom: '1.5rem',
        color: '#d7b56d',
        fontSize: '0.72rem',
        fontWeight: 700,
        left: '1.5rem',
        letterSpacing: '0.16em',
        position: 'absolute',
        textTransform: 'uppercase'
    },
    content: {
        alignSelf: 'center',
        padding: 'clamp(2rem, 6vw, 5.5rem)'
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
        fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
        letterSpacing: '-0.055em',
        lineHeight: 0.92,
        margin: '0 0 1.75rem',
        textTransform: 'uppercase'
    },
    description: {
        color: '#4f514e',
        fontSize: '1.05rem',
        lineHeight: 1.7,
        margin: '0',
        maxWidth: '42rem'
    },
    stats: {
        borderBottom: '1px solid #dedbd4',
        borderTop: '1px solid #dedbd4',
        display: 'flex',
        gap: 'clamp(2rem, 8vw, 6rem)',
        margin: '2.5rem 0 2rem',
        padding: '1.35rem 0'
    },
    stat: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem'
    },
    statValue: {
        fontSize: '2rem',
        letterSpacing: '-0.04em'
    },
    statLabel: {
        color: '#73736e',
        fontSize: '0.72rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase'
    },
    website: {
        color: '#171717',
        display: 'inline-flex',
        fontSize: '0.85rem',
        fontWeight: 700,
        gap: '0.6rem',
        letterSpacing: '0.08em',
        textDecoration: 'none',
        textTransform: 'uppercase'
    },
    playersButton: {
        alignItems: 'center',
        backgroundColor: '#171717',
        border: '1px solid #171717',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        fontSize: '0.8rem',
        fontWeight: 700,
        gap: '1rem',
        justifyContent: 'space-between',
        letterSpacing: '0.08em',
        marginTop: '2rem',
        padding: '0.9rem 1.1rem',
        textTransform: 'uppercase',
        width: '100%'
    },
    playersSection: {
        backgroundColor: '#e7e2d9',
        margin: '2rem auto 0',
        maxWidth: '1180px',
        padding: 'clamp(2rem, 5vw, 4rem)'
    },
    playersHeading: {
        marginBottom: '2rem'
    },
    playersTitle: {
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        letterSpacing: '-0.05em',
        lineHeight: 0.95,
        margin: 0,
        textTransform: 'uppercase'
    },
    playersGrid: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
    },
    player: {
        backgroundColor: '#ffffff',
        display: 'flex',
        minHeight: '130px',
        overflow: 'hidden'
    },
    playerImage: {
        backgroundColor: '#1d2935',
        height: '130px',
        objectFit: 'cover',
        width: '105px'
    },
    playerInfo: {
        padding: '1rem'
    },
    playerName: {
        fontSize: '1.15rem',
        lineHeight: 1,
        margin: '0 0 0.55rem',
        textTransform: 'uppercase'
    },
    playerPosition: {
        color: '#9b6b27',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        margin: '0 0 0.45rem',
        textTransform: 'uppercase'
    },
    playerCountry: {
        color: '#73736e',
        fontSize: '0.8rem',
        margin: 0
    },
    status: {
        color: '#4f514e',
        fontSize: '1.1rem',
        margin: 0,
        textAlign: 'center'
    },
    statusError: {
        color: '#9a342d',
        fontSize: '1.1rem',
        margin: 0,
        textAlign: 'center'
    }
}
