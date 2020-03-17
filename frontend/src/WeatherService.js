import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class WeatherService{

    getWeatherGraph() {

        const url = `${API_URL}/api/points/`;
        return axios.get(url).then(response => response.data);
    }
}