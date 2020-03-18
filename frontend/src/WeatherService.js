import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class WeatherService{

    getWeatherGraph(graphType='temperature',
                    start=new Date(new Date().setDate(new Date().getDate()-7)),
                    end=new Date(),
                    show_past=false) {
        const url = `${API_URL}/points/${graphType}`;
        return axios.get(url, {params: {start: start, end: end, show_past: show_past}}).then(response => response.data);
    }
}