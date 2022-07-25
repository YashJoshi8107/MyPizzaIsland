import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../CartContext"
import contents from "../components/Contents";
import Products from "./Products";
const url = "Contents.json"
const Cart = () => {
    let total = 0;
    const { cart, setCart } = useContext(CartContext);
    const [contents, setContents] = useState([]);

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
                setContents(contents);
            });
    }, []);

    const increment = (productId) => {

        const _cart = { ...cart };
        const oldQuantity = cart.items[productId];
        _cart.items[productId] = oldQuantity + 1;
        _cart.totalItems += 1;
        setCart(_cart);



    }
    const decrement = (productId) => {

        const _cart = { ...cart };
        const oldQuantity = cart.items[productId];
        _cart.items[productId] = oldQuantity - 1;
        _cart.totalItems -= 1;
        setCart(_cart);



    }
    const getQuantity = (productId) => {
        return cart.items[productId];
    }
    const getSum = (productId, price) => {

        const sum = price * getQuantity(productId);
        total += sum;
        return sum;
    }
    const handleDelete = (productId) => {
        const _cart = { ...cart };
        // _cart.totalItems -= _cart.items[productId];
        // _cart.items[productId] = 0;

        const qty = _cart.items[productId];
        delete _cart.items[productId];
        _cart.totalItems -= qty;
        setCart(_cart);
    }
    const handleOrderNow = () => {
        window.alert('Order placed succesfully!');
        // setProducts([]);
        setCart({});
    }
    // console.log(cart.totalItems);
    return (

        cart.totalItems ?
            <div className="container mx-auto lg:w-1/2 w-full pb-24">
                {/* {console.log(cart.totalItems)} */}
                <h1 h1 className="my-12 font-bold" > Cart items</h1 >
                <ul>
                    {
                        contents.map((content) => {

                            var product = content;
                            if (cart.items[product._id]) {
                                return (

                                    <li className="mb-12" key={product._id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img className="h-16" src={product.img} alt=""></img>
                                                <h1 className="ml-4 w-48 font-bold">{product.name}</h1>
                                            </div>

                                            <div>
                                                <button onClick={() => decrement(product._id)} className="bg-yellow-500 py-2 px-4 rounded-full leading-none font-bold">-</button>
                                                <b className="mx-2">{getQuantity(product._id)}</b>
                                                <button onClick={() => increment(product._id)} className="bg-yellow-500 py-2 px-4 rounded-full leading-none font-bold">+</button>
                                            </div>
                                            <span>₹{getSum(product._id, product.price)}</span>
                                            <div>
                                                <button onClick={() => { handleDelete(product._id) }} className="bg-red-500 py-2 px-4 rounded-full leading-none text-white font-bold ">Delete</button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }

                        })
                    }
                </ul>
                <hr className="my-6" />
                <div className="text-right">
                    <b>Grand Total:</b> ₹{total}
                </div>
                <div className="text-right mt-6">
                    <button onClick={handleOrderNow} className="bg-yellow-500 py-2 px-4 rounded-full leading-none  ">Order Now</button>
                </div>
            </div > :
            <img className="mx-auto w-1/2 mt-12" src="../images/empty-cart.png" alt="jhg"></img>
    )
}

export default Cart