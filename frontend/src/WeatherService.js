import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class WeatherService{

    getWeatherGraph(graphType='temperature',
                    start=new Date(new Date().setDate(new Date().getDate()-7)),
                    end=new Date()) {
        const url = `${API_URL}/points/${graphType}`;
        return axios.get(url, {params: {start: start, end: end}}).then(response => response.data);
    }
}