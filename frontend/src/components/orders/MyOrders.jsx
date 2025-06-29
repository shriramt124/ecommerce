import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMyOrders } from '../../services/orderService';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const MyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await getMyOrders();
            if (response.success) {
                setOrders(response.orders);
            } else {
                toast.error('Failed to fetch orders');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
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

    const getStatusText = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Order Placed';
            case 'PROCESSING':
                return 'Processing';
            case 'SHIPPED':
                return 'Shipped';
            case 'DELIVERED':
                return 'Delivered';
            case 'CANCELLED':
                return 'Cancelled';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen mt-[100px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[100px]">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
                <p className="mt-2 text-gray-600">Track and manage your orders</p>
            </div>

            {orders.length === 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                    <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/products')}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            Browse Products
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <li key={order._id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-150">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="mb-4 sm:mb-0">
                                        <div className="flex items-center">
                                            {getStatusIcon(order.orderStatus)}
                                            <span className="ml-2 text-sm font-medium text-gray-900">
                                                {getStatusText(order.orderStatus)}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Order ID: {order._id}</p>
                                        <p className="mt-1 text-sm text-gray-900">
                                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:items-end">
                                        <p className="text-sm font-medium text-gray-900">₹{order.totalPrice.toFixed(2)}</p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'items'}
                                        </p>
                                        <div className="mt-2 flex space-x-2">
                                            <button
                                                onClick={() => navigate(`/orders/${order._id}`)}
                                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => navigate(`/orders/${order._id}/track`)}
                                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                            >
                                                Track Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyOrders;