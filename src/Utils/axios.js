import axios from "axios";
export let baseUrl = "https://depv4-new.vercel.app"   //"https://drugger.vercel.app"   
export let sizeNum = 20
export async function axiosReq({ method = "get", endPoint = "", size, page = "1", body = null, authorization = null, type } = {}) {
    if (!size) {
        let data = await axios[method](`${baseUrl}/${endPoint}`,
            {
                headers: { authorization }
            })
        return data
    } else if (type) {
        let data = await axios[method](`${baseUrl}/${endPoint}?size=${size}&page=${page}&medicineType[in]=${type}`, { body }, {
            headers: { authorization }
        })
        return data
    } else {
        let data = await axios[method](`${baseUrl}/${endPoint}?size=${size}&page=${page}`, { body }, {
            headers: { authorization }
        })
        return data
    }
}
