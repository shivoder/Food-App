import React, { useState, useEffect, useRef } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
// import { useNavigate } from 'react-router-dom';

export default function Card(props) {
    const dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    let foodItem = props.item;
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const handleAddToCart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
                return 
                //   await console.log(data);
            }
            return 
        }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })

    }

  
      let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    useEffect(() => {

    }, [finalPrice])
    return (
        <div >
            <div>
                <div className="card mt-5 " id="completecard" style={{ "width": "18rem", "maxheight": "360px" }}>
                    <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "180px", objectFit: "fill" }} />
                    <div className="card-body cardbody">
                        <h5 className="card-title">{props.foodName}</h5>
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        <div className='container w-100'>
                            <select className='m-2 h-100  bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}

                            </ select>

                            <div className='d-inline h-100 fs-5 '>
                                ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>


                    </div>
                </div>
            </div>
        </div>
    )
}
