import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
const Product = (props) => {
    const [isAdding, setIsAdding] = useState(false);
    const { cart, setCart } = useContext(CartContext);

    function addToCart(e, product) {
        // console.log(product);
        e.preventDefault();
        let _cart = { ...cart };
        if (!_cart.items) {
            _cart.items = {};
        }
        if (_cart.items[product._id]) {
            _cart.items[product._id] += 1;
        }
        else {
            _cart.items[product._id] = 1;
        }
        if (!_cart.totalItems) {
            _cart.totalItems = 0;
        }
        _cart.totalItems += 1;
        setCart(_cart);
        setIsAdding(true);
        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    }
    return (
        <div >
            <Link to={`/products/${props._id}`}>
                <img src={props.img} alt="pep"></img>

                <div className="text-center">
                    <h2 className="text-lg font-bold py-2">{props.name}</h2>
                    <span className="bg-gray-200 py-1 rounded-full text-sm px-4">Small</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span>₹{props.price}</span>
                    <button disabled={isAdding} onClick={(e) => { addToCart(e, props) }} className={`${isAdding ? 'bg-green-500' : 'bg-yellow-500'} py-1 px-4 rounded-full font-bold`}>{`ADD${isAdding ? 'ED' : ''}`}</button>
                </div>
            </Link>
        </div>
    )
}

export default Product