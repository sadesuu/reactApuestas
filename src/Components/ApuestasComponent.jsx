import React, { Component } from 'react'
import serviceApuestas from '../Services/serviceApuestas'

export default class ApuestasComponent extends Component {

  service = new serviceApuestas()
  state = {
    apuestas: []
  }

  loadApuestas = async () => {
    let datos = await this.service.getAllApuestas();
    this.setState({
      apuestas: datos
    })
  }

  componentDidMount = async () => {
    await this.loadApuestas();
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#f4f1ea',
          color: '#171717',
          minHeight: 'calc(100vh - 56px)',
          padding: 'clamp(2rem, 6vw, 6rem) clamp(1rem, 6vw, 7rem)'
        }}
      >
        <section
          style={{
            margin: '0 auto',
            maxWidth: '1180px'
          }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <p
              style={{
                color: '#9b6b27',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                margin: '0 0 1rem',
                textTransform: 'uppercase'
              }}
            >
              Gestión de apuestas
            </p>
            <h1
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                letterSpacing: '-0.06em',
                lineHeight: 0.88,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              Mis apuestas
            </h1>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
            }}
          >
            {
            this.state.apuestas.map((apuesta) => (
              <article
                key={apuesta.idApuesta}
                style={{
                  backgroundColor: '#ffffff',
                  borderTop: '4px solid #e94238',
                  boxShadow: '0 18px 40px rgba(23, 23, 23, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '250px',
                  padding: '1.5rem'
                }}
              >
                <div>
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '2rem'
                    }}
                  >
                    <span
                      style={{
                        color: '#73736e',
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase'
                      }}
                    >
                      Apuesta #{apuesta.idApuesta}
                    </span>
                    <span
                      style={{
                        backgroundColor: '#f4f1ea',
                        color: '#171717',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.45rem 0.65rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      {apuesta.resultado}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      margin: '0 0 1rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    {apuesta.usuario}
                  </h2>
                  <p
                    style={{
                      color: '#73736e',
                      fontSize: '0.85rem',
                      margin: 0
                    }}
                  >
                    Fecha: {apuesta.fecha}
                  </p>
                </div>

                <button
                  type="button"
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = '#b33a32'
                    event.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = 'transparent'
                    event.currentTarget.style.color = '#b33a32'
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    backgroundColor: 'transparent',
                    border: '1px solid #b33a32',
                    color: '#b33a32',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    gap: '0.75rem',
                    letterSpacing: '0.08em',
                    marginTop: '2rem',
                    padding: '0.75rem 1rem',
                    textTransform: 'uppercase'
                  }}
                >
                  Eliminar apuesta <span aria-hidden="true">×</span>
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    )
  }
}
