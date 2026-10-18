import axios from "axios"
import Global from "../Global"

export default class serviceEquipos {
    getEquipos = async () => {
        let url = Global.apiGeneral
        let req = "api/Equipos"
        let res = await axios.get(url + req)

        return res.data
    }

    getEquiposById = async (id) => {
        let url = Global.apiGeneral
        let req = "api/Equipos/" + id
        let res = await axios.get(url + req)
        return res.data
    }
}
