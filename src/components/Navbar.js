import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  
  const [cartView, setCartView] = useState(false);

  let data = useCart();
  const navigate = useNavigate();
  
  const handleLogout = () =>{
      localStorage.removeItem("authToken");
      navigate("/login");
  }


  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-bold text-black" to="/">BeFoodie</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-bottom" >
              <li className="nav-item"><Link className="navlinks nav-link nav-link active fs-5"  id="navitem1" aria-current="page" to="/">Home</Link></li>
              {(localStorage.getItem("authToken"))?
              <li className='nav-item'>
                      <Link className="navlinks nav-link nav-link active fs-5" id="navitem2" aria-current="page" to="/myOrder">My-Orders</Link>
                      {/* "nav-link nav-link active fs-5 text-white" */}
              </li>
              : ""
              }
            </ul>
            <div className="d-flex">
            {(!localStorage.getItem("authToken"))?
              <div className='nav-item'>
                      <Link className="btn  mx-1 text-success bg-white" to="/login">Login</Link>
                      <Link className="btn  mx-1 text-success bg-white" to="/creatuser">Signup</Link>
              </div>
              :
               <div>
                 <div className="btn  mx-2" id="mycart"onClick = {()=>{setCartView(true)}}>
                  My Cart {" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                  </div>
                  {cartView?<Modal onClose={()=>{setCartView(false)}} ><Cart /></Modal>:null}
                 <div className="btn mx-2" id="logoutbtn"onClick={handleLogout}>Logout</div>
                 {/* bg-white text-danger */}
               </div>
              }
            </div>
          </div>


        </div>
      </nav >

    </div >
  )
}
