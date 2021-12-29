import {useQuery} from "react-query";
import axios from "axios";
import {API} from "./config";

export const useBookInLibraryStatus = (bookId, options= {}) => {
    return useQuery(
        'bookInLib',
        _ => axios.get(`${API.URL}library/is-exists?bookId=${bookId}`)
    )
}