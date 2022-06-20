import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { userRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.products;

  // console.log(cart);
  // console.log(data);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentCart = useSelector((state) => state.cart);
  console.log(currentCart);

  console.log(carts);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post('/orders', {
          userId: currentUser.user._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        // const clear = setTimeout(() => {
        //   navigate('/', {
        //     currentCart: {
        //       products: [],
        //       amount: 0,
        //       quantity: 0,
        //     },
        //   });
        // }, 5000);
        // clear();
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>
        <a href="/">Go to Homepage</a>
      </button>
    </div>
  );
};

export default Success;
