import React, { Component } from 'react'
import serviceApuestas from '../Services/serviceApuestas'

export default class ApuestasComponent extends Component {
    service = new serviceApuestas()

    state = {
        apuestas: []
    }

    loadApuestas = async () => {
        const datos = await this.service.getAllApuestas()
        this.setState({ apuestas: datos })
    }

    componentDidMount = async () => {
        await this.loadApuestas()
    }

    render() {
        return (
            <main className="min-vh-100 bg-light py-5">
                <section className="container">
                    <header className="mb-5">
                        <p className="text-uppercase text-warning fw-bold small mb-2">
                            Gestión de apuestas
                        </p>
                        <h1 className="display-1 fw-bold text-uppercase">Mis apuestas</h1>
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
                                        >
                                            Eliminar apuesta <span aria-hidden="true">X</span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        )
    }
}
