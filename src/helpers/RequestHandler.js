import { ErrorAlert } from "../components/Alerts.jsx";
import Axios from "../config/axios/axios";
import { API_GET_MOVIES_DATA, API_KEY } from "../constants/Constants";

export async function RequestMoviesData(searchKeyword, page) {
    let res
    let results
    try {
        res = await Axios.get(`${API_GET_MOVIES_DATA}apikey=${API_KEY}&s=${searchKeyword}&page=${page}`)
    } catch (error) {
        ErrorAlert(error)
    }
    results = res.data
    return results
}