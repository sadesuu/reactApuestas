import React, { Component } from 'react'
import serviceJugadores from '../Services/serviceJugadores'
import { NavLink } from 'react-router-dom'

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
            <main className="min-vh-100 bg-light py-5">
                <section className="container bg-body-secondary p-4 p-md-5" aria-labelledby="players-title">
                    <p className="text-uppercase text-warning fw-bold small mb-2">
                        Plantilla del equipo
                    </p>
                    <h1 id="players-title" className="display-1 fw-bold text-uppercase mb-5">
                        Jugadores
                    </h1>

                    {loading && <p className="fs-5 text-secondary">Cargando jugadores...</p>}
                    {error && <p className="fs-5 text-danger">{error}</p>}
                    {!loading && !error && jugadores.length === 0 && (
                        <p className="fs-5 text-secondary">
                            Este equipo no tiene jugadores registrados.
                        </p>
                    )}

                    <div className="row g-4">
                        {jugadores.map((jugador) => (
                            <div className="col-12 col-md-6 col-xl-4" key={jugador.idJugador}>
                                <NavLink
                                    to={`/team/${this.props.id}/players/${jugador.idJugador}`}
                                    className="card h-100 shadow-sm text-decoration-none text-dark"
                                    aria-label={`Ver información de ${jugador.nombre}`}
                                >
                                    <div className="row g-0 h-100">
                                        <div className="col-4 bg-dark d-flex align-items-center justify-content-center">
                                            <img
                                                src={jugador.imagen}
                                                alt={jugador.nombre}
                                                className="img-fluid object-fit-cover h-100"
                                            />
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body">
                                                <h2 className="card-title h5 text-uppercase">
                                                    {jugador.nombre}
                                                </h2>
                                                <p className="card-text text-warning fw-bold text-uppercase small">
                                                    {jugador.posicion}
                                                </p>
                                                <p className="card-text text-secondary small mb-0">
                                                    {jugador.pais}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        )
    }
}
