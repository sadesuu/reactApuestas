import React, { Component } from 'react'
import serviceApuestas from '../Services/serviceApuestas'
import { NavLink } from 'react-router-dom'
import DeleteBetModal from './DeleteBetModal'

export default class ApuestasComponent extends Component {
    service = new serviceApuestas()

    state = {
        apuestas: [],
        selectedBet: null,
        isDeleting: false,
        error: null
    }

    loadApuestas = async () => {
        const datos = await this.service.getAllApuestas()
        this.setState({ apuestas: datos })
    }

    openDeleteModal = (apuesta) => {
        this.setState({ selectedBet: apuesta, error: null })
    }

    closeDeleteModal = () => {
        if (!this.state.isDeleting) {
            this.setState({ selectedBet: null })
        }
    }

    deleteApuesta = async () => {
        this.setState({ isDeleting: true, error: null })

        try {
            await this.service.deleteApuesta(this.state.selectedBet.idApuesta)
            await this.loadApuestas()
            this.setState({ selectedBet: null, isDeleting: false })
        } catch {
            this.setState({
                error: 'No se pudo eliminar la apuesta. Inténtalo de nuevo.',
                isDeleting: false
            })
        }
    }

    componentDidMount = async () => {
        await this.loadApuestas()
    }

    render() {
        return (
            <main className="min-vh-100 bg-light py-5">
                <section className="container">
                    {this.state.error && (
                        <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                    )}
                    <header className="mb-5">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
                            <div>
                                <p className="text-uppercase text-warning fw-bold small mb-2">
                                    Gestión de apuestas
                                </p>
                                <h1 className="display-1 fw-bold text-uppercase mb-0">Mis apuestas</h1>
                            </div>
                            <NavLink to="/apuestas/crear" className="btn btn-danger text-uppercase fw-bold">
                                Nueva apuesta
                            </NavLink>
                        </div>
                    </header>
                    <div className="row g-4">
                        {this.state.apuestas.map((apuesta) => (
                            <div className="col-12 col-md-6 col-xl-4" key={apuesta.idApuesta}>
                                <article className="card h-100 border-danger border-top border-4 shadow-sm">
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <span className="text-secondary text-uppercase small">
                                                Apuesta #{apuesta.idApuesta}
                                            </span>
                                            <span className="badge text-bg-light text-uppercase">
                                                {apuesta.resultado}
                                            </span>
                                        </div>
                                        <h2 className="card-title h3 text-uppercase">
                                            {apuesta.usuario}
                                        </h2>
                                        <p className="card-text text-secondary small">
                                            Fecha: {apuesta.fecha}
                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger text-uppercase fw-bold mt-auto align-self-start"
                                            onClick={() => this.openDeleteModal(apuesta)}
                                        >
                                            Eliminar apuesta <span aria-hidden="true">X</span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </section>
                {this.state.selectedBet && (
                    <DeleteBetModal
                        apuesta={this.state.selectedBet}
                        isDeleting={this.state.isDeleting}
                        onCancel={this.closeDeleteModal}
                        onConfirm={this.deleteApuesta}
                    />
                )}
            </main>
        )
    }
}
