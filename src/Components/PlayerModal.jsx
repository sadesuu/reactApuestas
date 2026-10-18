import React, { Component } from 'react'
import serviceJugadores from '../Services/serviceJugadores'

export default class PlayerModal extends Component {
    service = new serviceJugadores()

    state = {
        player: null,
        loading: true,
        error: null
    }

    getPlayerById = async () => {
        try {
            const player = await this.service.getPlayerById(this.props.id)
            this.setState({ player, loading: false, error: null })
        } catch {
            this.setState({
                loading: false,
                error: 'No se pudo cargar la información del jugador.'
            })
        }
    }

    componentDidMount = async () => {
        await this.getPlayerById()
    }

    componentDidUpdate = async (oldProps) => {
        if (oldProps.id !== this.props.id) {
            this.setState({ player: null, loading: true, error: null })
            await this.getPlayerById()
        }
    }

    render() {
        const { player, loading, error } = this.state

        return (
            <main className="min-vh-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center p-3 p-md-5">
                {loading && <p className="text-light fs-5">Cargando jugador...</p>}
                {error && <p className="text-danger fs-5">{error}</p>}
                {!loading && !error && player && (
                    <article className="card shadow-lg overflow-hidden w-100" style={{ maxWidth: '820px' }}>
                        <div className="row g-0">
                            <div className="col-12 col-md-5 bg-dark d-flex align-items-center justify-content-center">
                                <img
                                    src={player.imagen}
                                    alt={player.nombre}
                                    className="img-fluid h-100 object-fit-cover"
                                />
                            </div>
                            <div className="col-12 col-md-7">
                                <div className="card-body p-4 p-md-5">
                                    <p className="text-uppercase text-warning fw-bold small">
                                        Perfil del jugador
                                    </p>
                                    <h1 className="card-title display-5 fw-bold text-uppercase">
                                        {player.nombre}
                                    </h1>
                                    <p className="text-danger fw-bold text-uppercase">
                                        {player.posicion}
                                    </p>
                                    <dl className="border-top pt-4 mt-4">
                                        <div className="mb-3">
                                            <dt className="text-secondary text-uppercase small">
                                                País
                                            </dt>
                                            <dd className="mb-0">{player.pais}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-secondary text-uppercase small">
                                                Fecha de nacimiento
                                            </dt>
                                            <dd className="mb-0">{player.fechaNacimiento}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </article>
                )}
            </main>
        )
    }
}
