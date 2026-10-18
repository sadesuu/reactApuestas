import React, { Component } from 'react'
import serviceApuestas from '../Services/serviceApuestas'
import { Navigate, NavLink } from 'react-router-dom'

export default class CreateBet extends Component {

    service = new serviceApuestas()
    usuario = React.createRef()
    resultado = React.createRef()
    fecha = React.createRef()
    state = {
        status: false,
        error: null,
        isSubmitting: false
    }

    createBet = async (event) => {
      event.preventDefault()
      this.setState({ error: null, isSubmitting: true })

      try {
        await this.service.createApuesta({
          usuario: this.usuario.current.value,
          resultado: this.resultado.current.value,
          fecha: this.fecha.current.value
        })
        this.setState({ status: true, isSubmitting: false })
      } catch {
        this.setState({
          error: 'No se pudo crear la apuesta. Inténtalo de nuevo.',
          isSubmitting: false
        })
      }
    }

  render() {
    if(this.state.status){
      return <Navigate to="/apuestas" replace />
    }
    return (
      <main className="min-vh-100 bg-light py-5">
        <section className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 col-xl-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <header className="mb-4">
                    <p className="text-uppercase text-warning fw-bold small mb-2">
                      Gestión de apuestas
                    </p>
                    <h1 className="h2 fw-bold text-uppercase mb-2">
                      Crear apuesta
                    </h1>
                    <p className="text-secondary mb-0">
                      Completa los datos para registrar una nueva apuesta.
                    </p>
                  </header>

                  {this.state.error && (
                    <div className="alert alert-danger" role="alert">
                      {this.state.error}
                    </div>
                  )}

                  <form onSubmit={this.createBet}>
                    <div className="mb-3">
                      <label htmlFor="bet-user" className="form-label fw-semibold">
                        Usuario
                      </label>
                      <input
                        id="bet-user"
                        className="form-control"
                        type="text"
                        placeholder="Nombre de usuario"
                        ref={this.usuario}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="bet-result" className="form-label fw-semibold">
                        Resultado
                      </label>
                      <input
                        id="bet-result"
                        className="form-control"
                        type="text"
                        placeholder="Ej. Real Madrid gana"
                        ref={this.resultado}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="bet-date" className="form-label fw-semibold">
                        Fecha
                      </label>
                      <input
                        id="bet-date"
                        className="form-control"
                        type="date"
                        ref={this.fecha}
                        required
                      />
                    </div>

                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <NavLink to="/apuestas" className="btn btn-outline-secondary flex-fill">
                        Cancelar
                      </NavLink>
                      <button
                        type="submit"
                        className="btn btn-danger flex-fill"
                        disabled={this.state.isSubmitting}
                      >
                        {this.state.isSubmitting ? 'Guardando...' : 'Crear apuesta'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}
