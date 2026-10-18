import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import serviceEquipos from '../Services/serviceEquipos'

export default class TeamsComponent extends Component {
    service = new serviceEquipos()

    state = {
        equipo: null,
        loading: true,
        error: null
    }

    getTeamById = async () => {
        try {
            const equipo = await this.service.getEquiposById(this.props.id)
            this.setState({ equipo, loading: false, error: null })
        } catch {
            this.setState({
                loading: false,
                error: 'No se pudo cargar la información del equipo.'
            })
        }
    }

    componentDidMount = async () => {
        await this.getTeamById()
    }

    componentDidUpdate = async (previousProps) => {
        if (previousProps.id !== this.props.id) {
            this.setState({ equipo: null, loading: true, error: null })
            await this.getTeamById()
        }
    }

    render() {
        const { equipo, loading, error } = this.state

        return (
            <main className="min-vh-100 bg-light py-5">
                {loading && <p className="container fs-5 text-secondary">Cargando equipo...</p>}
                {error && <p className="container fs-5 text-danger">{error}</p>}
                {!loading && !error && !equipo && (
                    <p className="container fs-5 text-secondary">No se encontró el equipo.</p>
                )}
                {!loading && !error && equipo && (
                    <article className="container card shadow overflow-hidden">
                        <div className="row g-0">
                            <div className="col-12 col-lg-5 bg-dark d-flex align-items-center justify-content-center p-5">
                                <img
                                    src={equipo.imagen}
                                    alt={`Escudo de ${equipo.nombre}`}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="col-12 col-lg-7">
                                <div className="card-body p-4 p-md-5">
                                    <p className="text-uppercase text-warning fw-bold small">
                                        Ficha del club
                                    </p>
                                    <h1 className="display-3 fw-bold text-uppercase">
                                        {equipo.nombre}
                                    </h1>
                                    <p className="lead text-secondary">{equipo.descripcion}</p>
                                    <div className="row border-top border-bottom py-4 my-4">
                                        <div className="col-6">
                                            <strong className="fs-2 d-block">{equipo.champions}</strong>
                                            <span className="text-secondary text-uppercase small">
                                                Champions
                                            </span>
                                        </div>
                                        <div className="col-6">
                                            <strong className="fs-2 d-block">{equipo.finalista}</strong>
                                            <span className="text-secondary text-uppercase small">
                                                Finales
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap gap-2">
                                        <a
                                            href={equipo.web}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-outline-dark"
                                        >
                                            Visitar sitio oficial
                                        </a>
                                        <NavLink
                                            to={`/team/${equipo.idEquipo}/players`}
                                            className="btn btn-dark"
                                        >
                                            Ver jugadores
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                )}
            </main>
        )
    }
}
