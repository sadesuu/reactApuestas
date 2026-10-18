import React, { Component } from 'react'
import serviceEquipos from '../Services/serviceEquipos';
import { NavLink } from 'react-router-dom';
export default class MenuComponent extends Component {

  service = new serviceEquipos();

  state = {
    equipos: [],
    equipoHovered: null
  }

  loadEquipos = async () => {
    let datos = await this.service.getEquipos()
    this.setState({
      equipos: datos
    })
  }


  componentDidMount = async () => {
    await this.loadEquipos();
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/apuestas">Apuestas</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Equipos
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    {
                      this.state.equipos.map((e) => {
                        return (
                          <li
                            key={e.idEquipo}
                            onMouseEnter={() => this.setState({ equipoHovered: e.idEquipo })}
                            onMouseLeave={() => this.setState({ equipoHovered: null })}
                            style={{
                              backgroundColor: this.state.equipoHovered === e.idEquipo ? '#7d7d7e' : 'transparent',
                              transition: 'background-color 160ms ease-out',
                              cursor: 'pointer'
                            }}
                          >
                            <NavLink style={{textDecoration: "none", color:"black"}} to={`/team/${e.idEquipo}`}>
                              {e.nombre}
                            </NavLink>
                          </li>
                        )
                      })

                    }
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
