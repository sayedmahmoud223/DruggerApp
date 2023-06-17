import { createContext, useEffect, useState } from "react";
import { axiosReq, baseUrl, sizeNum } from "../Utils/axios.js";
import axios from "axios";



export let MedicineStore = createContext([])
export function MedicineStoreProvider({ children }) {
    
    let [SpecifcMedicine, setSpecifcMedicine] = useState([])
    const [data, setData] = useState([]);
    let [dataCount, setDataCount] = useState([])


    let [page, setPage] = useState(1)

    let handlePageClick = (e) => {
        let currentPage = e.selected + 1
        getPage(currentPage)
        //console.log(currentPage);
    }

    function getPage(numPage) {
        setPage(numPage)
    }

    ///////////////////////////////////////////////////////////
    const [selectedFilters, setSelectedFilters] = useState([]);
    
    const handleFilterChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedFilters((prevFilters) => [...prevFilters, value]);
        } else {
            setSelectedFilters((prevFilters) =>
                prevFilters.filter((filter) => filter !== value)
            );
        }
    };


    async function GetSpecifcMedicine(medicineId) {
        let token = localStorage.getItem("token");
        if (token) {
            let data = await axiosReq({ method: "get", endPoint: `medicine/getSpecificMedicine/${medicineId}`, authorization: token })
            if (data.status == 200) {
                setSpecifcMedicine(data.data)
            }
        }
    }


   


    return <MedicineStore.Provider value={{ data,setData, dataCount, setDataCount, selectedFilters, setSelectedFilters, handleFilterChange, page, getPage, handlePageClick, GetSpecifcMedicine, SpecifcMedicine, setPage }}>
        {children}
    </MedicineStore.Provider>
}





// Medicines, GetAllMedicensWithoutPaginate, pages