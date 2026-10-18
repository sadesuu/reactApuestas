import React , {Component} from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import HomeComponent from './HomeComponent'
import MenuComponent from './MenuComponent'
import TeamsComponent from './TeamsComponent'
import PlayersComponent from './PlayersComponent'
import ApuestasComponent from './ApuestasComponent'

export default class Router extends Component {
  render() {
    function TeamsComponentElement(){
      const { id } = useParams()
      return <TeamsComponent id={id} />
    }
    function PlayersComponentElement(){
      const { id } = useParams()
      return <PlayersComponent id={id} />
    }
    return (
      <BrowserRouter>
        <MenuComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/apuestas" element={<ApuestasComponent/>} />
          <Route path="/team/:id" element={<TeamsComponentElement />} />
          <Route path="/team/:id/players" element={<PlayersComponentElement />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
