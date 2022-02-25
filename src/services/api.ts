import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL:'https://tudu2-0.herokuapp.com',
    // baseURL: 'http://192.168.0.103:3333',
})

api.interceptors.request.use(async (config: any) => {
    const token = await AsyncStorage.getItem('@JDV:token')
    config.headers.authorization = `Bearer ${token}`;
    return config
});

export default api;