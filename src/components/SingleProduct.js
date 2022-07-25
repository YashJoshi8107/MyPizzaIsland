import Product from "./Product"
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const SingleProduct = () => {

    const [contents, setContents] = useState([]);
    const params = useParams();
    useEffect(() => {
        fetch('../Data.json',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

        )
            .then(response => {
                return response.json();
            })
            .then(contents => {
                // console.log(contents)
                setContents(contents);
            });
    }, []);
    const navigate = useNavigate();
    var items = '';
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].id == params._id) {
            items = contents[i];
            break;
        }
    }
    // console.log(params);
    // console.log(contents);
    return (
        <div className="container mx-auto mt 12">

            <button className="mb-12 font-bold" onClick={() => { navigate('/') }}>Back</button>
            <div className="flex items-center">

                <img src={items.img} alt="pizza"></img>

                <div className="ml-16">
                    <h1 className="text-xl font-bold">{items.name}</h1>
                    <ul>
                        <li>Regular Hand Tossed [7 inch]</li>
                        <li>Regular Hand Tossed [7 inch]</li>
                        <li>Regular Hand Tossed [7 inch]</li>
                        <li>Regular Hand Tossed [7 inch]</li>
                        <li>Regular Hand Tossed [7 inch]</li>
                        <li>Regular Hand Tossed [7 inch]</li>
                        <li>Regular Hand Tossed [7 inch]</li>
                        <li>Regular Hand Tossed [7 inch]</li>
                        <li>Regular Hand Tossed [7 inch]</li>
                        <li>Regular Hand Tossed [7 inch]</li>
                    </ul>
                    <div className="text-md">Small</div>
                    <div className="font-bold mt-2">${items.price}</div>
                    <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold">Add to Cart</button>
                </div>

            </div>
        </div >


    )
}

export default SingleProduct