// import React from 'react'
// import { Link, NavLink } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { MedicineStore } from '../../Context/MedicineContext.jsx'
import { baseUrl, sizeNum } from '../../Utils/axios.js';
import axios from 'axios';
import MedicineTypeDisplay from '../MedicineTypeDisplay/MedicineTypeDisplay.jsx';
import  SidebarSlider from "../SidebarSlider/SidebarSlider.jsx"

// export default function Sidebar() {

let medicineType = [
  { name: "All" , icon: "fa-solid fa-capsules" },
  { name: "Capsules", icon: "fa-solid fa-capsules" },
  { name: "Injections", icon: "fa-solid fa-syringe" },
  { name: "Syrups", icon: "fa-solid fa-wine-bottle" },
  { name: "Inhalers", icon: "fa-solid fa-wine-bottle" },
  { name: "Drops", icon: "fa-solid fa-droplet" },
  { name: "Sprays", icon: "fa-solid fa-spray-can" },
  { name: "Solutions", icon: "fa-solid fa-bottle-droplet" },
  { name: "Topical preparations", icon: "fa-solid fa-capsules" },
  { name: "Powders", icon: "fa-solid fa-capsules" },
]
export default function Sidebar() {
  let { data, setData, selectedFilters, page, dataCount, setDataCount, setSelectedFilters, handleFilterChange } = useContext(MedicineStore)
  let { type } = useParams()


  const [activeElement, setActiveElement] = useState("All");

  const handleElementClick = (name) => {
    setActiveElement(name);
  };

  const [searchValue, setSearchValue] = useState(null);

  const handleInputChange = async(event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the searchValue, such as passing it to a search function or an API request
    console.log(searchValue);
  };

  const fetchData = async () => {
    try {
      const filters = selectedFilters.join(',');
    
      if ((type == "All" || !type) && filters == "") {
        const jsonData = await axios.get(`${baseUrl}/medicine?size=${sizeNum}&page=${page}`);
        setData(jsonData);
      }
      else if (filters == "" && type) {
        const jsonData = await axios.get(`${baseUrl}/medicine?size=${sizeNum}&page=${page}&medicineType=${type}`);
        setData(jsonData);
      } else if (filters && (type == "All" || !type)) {
        const jsonData = await axios.get(`${baseUrl}/medicine?size=${sizeNum}&page=${page}&sort=${filters}`);
        setData(jsonData);
      }
      else {
        const jsonData = await axios.get(`${baseUrl}/medicine?size=${sizeNum}&page=${page}&sort=${filters}&medicineType=${type}`);
        setData(jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataCount = async () => {
    try {
      const filters = selectedFilters.join(',');

      if ((type == "All" || !type) && filters == "") {
        const jsonData = await axios.get(`${baseUrl}/medicine`);
        setDataCount(jsonData.data.medicineCount);
      }
      else if (filters == "" && type) {
        const jsonData = await axios.get(`${baseUrl}/medicine?medicineType=${type}`);
        setDataCount(jsonData.data.medicineCount);
      } else if (filters && (type == "All" || !type)) {
        const jsonData = await axios.get(`${baseUrl}/medicine?sort=${filters}`);
        setDataCount(jsonData.data.medicineCount);
      }
      else {
        const jsonData = await axios.get(`${baseUrl}/medicine?sort=${filters}&medicineType=${type}`);
        setDataCount(jsonData.data.medicineCount);
      }
      //console.log({dataCount});
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataCount()
  }, [selectedFilters, type, page]);

  return (
    <div  className="h-100 p-3 verticleHr">
      <h5 className='text-main my-3'>Search</h5>
      <form onSubmit={handleSubmit} >
        <div className='searchBox my-3'>
          <input
            type="text"
            className='form-control rounded-pill'
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search..."
          />
          <div className='m-auto'>
            <button onChange={async () => {
              if (!searchValue) {
                let jsonData = await axios.get(`${baseUrl}/medicine`);
                setData(jsonData);
              }else{
                let jsonData = await axios.get(`${baseUrl}/medicine?search=${searchValue}`);
                setData(jsonData);
              }
              
            }} className='searchButton' type="search"></button>
          </div>
          
        </div>
      </form>
      <h5>Medicine Type</h5>
      {medicineType?.map((ele) => {
        return <Link to={`/medicine/${ele.name}`} key={ele._id} className='text-decoration-none pill text-muted d-flex'>
          {/* <i className={`${ele.icon} vvv`}></i> */}
          <div className={`w-100 my-2 ${activeElement == ele.name ? 'bg-main w-100 p-2 text-white rounded-pill' : '' // Add 'active' class when element is active
            }`}
            onClick={() => handleElementClick(ele.name)}>
            <p>{ele.name}</p>
          </div>
        </Link>
      })}
      <h5>Filters</h5>

      <div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name='sort' value={"-medicineUnitPrice"} checked={selectedFilters.includes("-medicineUnitPrice")} onChange={handleFilterChange} id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            high price
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name='sort' value={"medicineUnitPrice"} checked={selectedFilters.includes("medicineUnitPrice")} onChange={handleFilterChange} id="flexCheckChecked" />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            low price
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" name='sort' value={"medicineExpireDate"} checked={selectedFilters.includes("medicineExpireDate")} onChange={handleFilterChange} id="sortDate" />
          <label className="form-check-label" htmlFor="sortDate">
            low expire date
          </label>
        </div>
        <div className="form-check">
        <input className="form-check-input" type="checkbox" name='sort' value={"-medicineExpireDate"} checked={selectedFilters.includes("-medicineExpireDate")} onChange={handleFilterChange} id="-sortDate" />
        <label className="form-check-label" htmlFor="-sortDate">
          high expire date
        </label>
      </div>
      </div>

    <div className='mt-4'>
      <SidebarSlider/>
    </div>
    </div>

    // </div >

  )
}
