import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { cartStore } from "../../Context/CartContext.jsx";
import { avatar, mainLogo } from "../../Utils/logos.js";
import { profileStore } from "../../Context/ProfileContext.jsx";


export default function Navber({ logOut }) {
  let { getFromCart, count } = useContext(cartStore);
  let { profile } = useContext(profileStore);
  let token = localStorage.getItem("token");
  useEffect(() => {
    getFromCart();
  }, []);
  return (
    <>
      {token ? (
        <nav className="navbar navbar-expand-lg bg-main navbar-dark">
          <div className="container">
            <NavLink className="navbar-brand" to={"/"}>
              <img className="w-100" height={55} src={mainLogo} />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={"/home"}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item ms-3">
                  <button className="btn btn-fifth me-1 bg-fifth">
                    <NavLink className="nav-link " to={"/addmedicines"}>
                      <i className="fas fa-plus me-1 "></i> Add Medicine
                    </NavLink>
                  </button>
                </li>

              
              </ul>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to={"cart"}>
                    <h5 className=" position-relative me-5  mt-2">
                      Cart
                      <i className="fa-solid fa-cart-shopping" />
                      <span className="position-absolute cart ms-3 start-100 translate-middle badge rounded-pill bg-third">
                        {count}
                      </span>
                    </h5>
                  </NavLink>
                </li>
                <li className="nav-item mt-3 text-white">
                  <h5>
                    Welcome{" "}
                    <span className="fw-bold text-second">
                      {profile.firstName}
                    </span>
                  </h5>
                </li>
                <div>
                  <div className="nav-item  dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle d-flex align-items-center hidden-arrow"
                      id="navbarDropdownMenuAvatar"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={profile.profileURL ? profile.profileURL : avatar}
                        className="rounded-circle"
                        height={40}
                        alt="avatar"
                      />
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item" to={"/profile"}>
                          My profile
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to={"/wishlist"}
                        >
                          Wishlist{" "}
                          <i className="fa-solid fa-heart text-third"></i>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to={"/login"}>
                          <h4 onClick={logOut}>Logout</h4>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg bg-main navbar-dark">
          <div className="container">
            <NavLink className="navbar-brand" to={"/"}>
              <img className="w-100" height={55} src={mainLogo} />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={"/home"}
                  >
                    Home
                  </NavLink>
                </li> */}
                <li>
                  {/* <div className="searchBox">
                    <input
                      id="searchInput"
                      type="search"
                      className="form-control rounded-pill"
                      placeholder="Search..."
                    />
                    <button className="searchButton" href="#">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div> */}
                </li>
              </ul>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to={"cart"}>
                    <h5 className=" position-relative me-5  mt-2">
                      Cart
                      <i className="fa-solid fa-cart-shopping" />
                      <span className="position-absolute cart ms-3 start-100 translate-middle badge rounded-pill bg-third">
                        {count}
                      </span>
                    </h5>
                  </NavLink>
                </li> */}

                <li className="nav-item">
                  <NavLink className="nav-link" to={"/login"}>
                    {" "}
                    <button class="btn btn-link px-3 me-2">Login</button>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/register"}>
                    {" "}
                    <button class="btn btn-primary me-1">
                      Sign up for free
                    </button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}



// import React, { useContext, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { cartStore } from "../../Context/CartContext.jsx";
// import { avatar, mainLogo } from "../../Utils/logos.js";
// import { profileStore } from "../../Context/ProfileContext.jsx";

// export default function Navber() {
//   let { getFromCart, count } = useContext(cartStore);
//   let { profile } = useContext(profileStore);
//   useEffect(() => {
//     getFromCart();
//   }, []);
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-main navbar-dark">
//         <div className="container">
//           <NavLink className="navbar-brand" to={"/"}>
//             <img className="w-100" height={55} src={mainLogo} />
//           </NavLink>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <NavLink className="nav-link" aria-current="page" to={"/home"}>
//                   Home
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to={"/addmedicines"}>
//                   Medicine
//                 </NavLink>
//               </li>
            
//               <li>
//                 <form class="d-flex input-group w-auto">
//                   <input
//                     type="search"
//                     class="form-control rounded"
//                     placeholder="Search"
//                     aria-label="Search"
//                     aria-describedby="search-addon"
//                   />
//                   <span class="input-group-text border-0" id="search-addon">
//                     <i class="fas fa-search text-light"></i>
//                   </span>
//                 </form>
//               </li>
//             </ul>

//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <NavLink className="nav-link" to={"cart"}>
//                   <h5 className=" position-relative me-4">
//                     Cart
//                     <i className="fa-solid fa-cart-shopping" />
//                     <span className="position-absolute cart ms-3 start-100 translate-middle badge rounded-pill bg-third">
//                       {count}
//                     </span>
//                   </h5>
//                 </NavLink>
//               </li>

//              {profile?'':<> <li className="nav-item">
//                 <NavLink className="nav-link" to={"/login"}>
//                   {" "}
//                   <button class="btn btn-link px-3 me-2">Login</button>
//                 </NavLink>
//               </li>

//               <li className="nav-item">
//                 <NavLink className="nav-link" to={"/register"}>
//                   {" "}
//                   <button class="btn btn-primary me-1">Sign up for free</button>
//                 </NavLink>
//               </li></>}
//               {!profile?<> <li className="nav-item">
//                 <NavLink className="nav-link" to={"/login"}>
//                   {" "}
//                   <button class="btn btn-link px-3 me-2">Login</button>
//                 </NavLink>
//               </li>

//               <li className="nav-item">
//                 <NavLink className="nav-link" to={"/register"}>
//                   {" "}
//                   <button class="btn btn-primary me-1">Sign up for free</button>
//                 </NavLink>
//               </li></>:''}
//               <div>
//                 <div className="nav-item  dropdown">
//                   <NavLink
//                     className="nav-link dropdown-toggle d-flex align-items-center hidden-arrow"
//                     id="navbarDropdownMenuAvatar"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     <img
//                       src={profile.profileURL ? profile.profileURL : avatar}
//                       className="rounded-circle"
//                       height={40}
//                       alt="avatar"
//                     />
//                   </NavLink>
//                   <ul className="dropdown-menu">
//                     <li>
//                       <NavLink className="dropdown-item" to={"/profile"}>
//                         My profile
//                       </NavLink>
//                     </li>
//                     <li className="nav-item">
//                 <NavLink
//                   className="dropdown-item"
//                   aria-current="page"
//                   to={"/wishlist"}
//                 >
//                   Wishlist <i className="fa-solid fa-heart text-third"></i>
//                 </NavLink>
//               </li>
//                     <li>
//                       <NavLink className="dropdown-item" to={"/login"}>
//                         Logout
//                       </NavLink>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }
