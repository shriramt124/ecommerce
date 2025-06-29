import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOrderById } from '../../services/orderService';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const response = await getOrderById(id);
            if (response.success) {
                setOrder(response.order);
            } else {
                toast.error('Failed to fetch order details');
                navigate('/my-orders');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
            navigate('/my-orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'PENDING':
                return <FiClock className="w-5 h-5 text-yellow-500" />;
            case 'PROCESSING':
                return <FiPackage className="w-5 h-5 text-blue-500" />;
            case 'SHIPPED':
                return <FiTruck className="w-5 h-5 text-purple-500" />;
            case 'DELIVERED':
                return <FiCheckCircle className="w-5 h-5 text-green-500" />;
            case 'CANCELLED':
                return <FiAlertCircle className="w-5 h-5 text-red-500" />;
            default:
                return <FiClock className="w-5 h-5 text-gray-500" />;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
                    <p className="mt-2 text-gray-600">The order you're looking for doesn't exist or you don't have permission to view it.</p>
                    <button
                        onClick={() => navigate('/my-orders')}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        Back to My Orders
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[100px]">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order Details</h1>
                    <p className="mt-2 text-gray-600">Order ID: {order._id}</p>
                </div>
                <button
                    onClick={() => navigate(`/orders/${order._id}/track`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Track Order
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Order Summary</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex items-center">
                        {getStatusIcon(order.orderStatus)}
                        <span className="ml-2 text-sm font-medium">
                            {order.orderStatus}
                        </span>
                    </div>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {order.paymentInfo.type === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
                                {order.paymentInfo.status && ` (${order.paymentInfo.status})`}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.zipCode}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Order Items</h3>
                </div>
                <div className="border-t border-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {order.orderItems.map((item) => (
                            <li key={item._id} className="px-4 py-4 sm:px-6">
                                <div className="flex items-center">
                                    <div className="min-w-0 flex-1 flex items-center">
                                        <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                                            {item.product.images && item.product.images[0] ? (
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.title}
                                                    className="h-full w-full object-center object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-gray-400">No image</div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">{item.product.title}</h4>
                                            <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <p className="text-sm font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Price Details</h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Items Price</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{order.itemsPrice.toFixed(2)}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Tax</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{order.taxPrice.toFixed(2)}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Shipping</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{order.shippingPrice.toFixed(2)}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 font-bold">Total</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">₹{order.totalPrice.toFixed(2)}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    onClick={() => navigate('/my-orders')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Back to My Orders
                </button>
            </div>
        </div>
    );
};

export default OrderDetails;