import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://bouquets.herokuapp.com/'
});

export default axios
