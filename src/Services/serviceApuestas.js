import axios from "axios";
import Global from "../Global"

export default class serviceApuestas {
    getAllApuestas = async () => {
        let url = Global.apiGeneral;
        let req = "api/Apuestas"
        let res = await axios.get(url + req)

        return res.data
    }

    createApuesta = async (apuesta) => {
        let url = Global.apiGeneral;
        let req = "api/Apuestas"
        let res = await axios.post(url + req, apuesta)

        return res.data

    }

    deleteApuesta = async (id) => {
        let url = Global.apiGeneral;
        let req = "api/Apuestas/" + id
        let res = await axios.delete(url + req)

        return res.data
    }
}
