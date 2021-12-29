import {useQuery} from "react-query";
import axios from "axios";

export const useBookQuery = (bookId, options = {}) => {
    const API_URL = 'https://litdev:LMarzm6t@api.dev.litnet.com/v2/';

    return useQuery(
        '',
        _ => axios.get(API_URL + `library/is-exists?bookId=${bookId}`),
        {
            retry: false,
            cacheTime: 0, //10000,
            retryDelay: 2000,
            refetchOnWindowFocus: false,
            retryOnMount: false,
            ...options
        }
    )
}

const LibraryRepository = {
    async fetchLib(bookId) {
        const API_URL = 'https://litdev:LMarzm6t@api.dev.litnet.com/v2/';
        const {data} = await axios.get(API_URL + `library/is-exists?bookId=${bookId}`);

        return data;
    },

    async isExists(bookId) {
        return await fetch(`https://api.dev.litnet.com/v2/library/is-exists?bookId=${bookId}`)
            .then((response) => {
                return response.json();
            });
    }

    /*isExists(bookId, options = {}) {
        const API_URL = 'https://litdev:LMarzm6t@api.dev.litnet.com/v2/';

        return useQuery(
            '',
            _ => Axios.get(API_URL + `library/is-exists?bookId=${bookId}`),
            {
                retry: false,
                cacheTime: 0, //10000,
                retryDelay: 2000,
                refetchOnWindowFocus: false,
                retryOnMount: false,
                ...options
            }
        )
    }*/
}

export default LibraryRepository;