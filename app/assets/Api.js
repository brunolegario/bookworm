import axios from 'axios';

class Api {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://www.googleapis.com/books/v1/volumes',
            timeout: 60000,
            headers: {'Content-Type': 'application/json'},
        });

        this.api.interceptors.response.use(
            response => {
                return {
                    status: true,
                    code: response.status,
                    data: response.data.items,
                };
            },
            error => {
                let status = error.response.status;

                return {
                    status: false,
                    code: status,
                    data: error.response.data,
                };
            },
        );
    }

    searchBooks(term, key) {
        let text = encodeURI(term);
        let query = `${text}&key=${key}`;

        return this.api.get(`?q=${query}`);
    }
}

export default new Api();
