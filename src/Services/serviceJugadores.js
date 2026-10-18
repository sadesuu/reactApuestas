import axios from 'axios'
import Global from '../Global'

export default class serviceJugadores {

    getJugadoresByEquipo = async (idEquipo) => {
        let url = Global.apiGeneral
        let req = "api/Jugadores/JugadoresEquipos/" + idEquipo
        let res = await axios.get(url + req)
        return res.data
    }
    getPlayerById = async (idPlayer) => {
        let url = Global.apiGeneral
        let req = "api/Jugadores/"+idPlayer
        let res = await axios.get(url + req)
        return res.data
    }
}
