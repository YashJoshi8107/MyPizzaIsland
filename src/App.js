import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Navigation from "./components/Navigation";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import SingleProduct from "./components/SingleProduct";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";


const App = () => {
    const [cart, setCart] = useState({});

    useEffect(() => {
        const cart = window.localStorage.getItem('cart');
        setCart(JSON.parse(cart));
        // console.log(JSON.parse(cart));
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])
    return (
        <>

            <Router>
                <CartContext.Provider value={{ cart, setCart }}>
                    <Navigation />
                    <Routes>
                        <Route exact path="/" element={<Home />}></Route>
                        <Route exact path="/products" element={<Products />}></Route>
                        <Route exact path="/products/:id" element={<SingleProduct />}></Route>
                        <Route exact path="/cart" element={<Cart />}></Route>
                    </Routes>
                </CartContext.Provider>
            </Router>

        </>
    )

}
export default App;





