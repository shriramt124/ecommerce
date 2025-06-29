import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOrderById } from '../../services/orderService';
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';

const OrderTracking = () => {
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

    const getStatusStep = (status) => {
        switch (status) {
            case 'PENDING':
                return 0;
            case 'PROCESSING':
                return 1;
            case 'SHIPPED':
                return 2;
            case 'DELIVERED':
                return 3;
            case 'CANCELLED':
                return -1;
            default:
                return 0;
        }
    };

    const renderStatusIcon = (status) => {
        switch (status) {
            case 'PENDING':
                return <FiClock className="w-6 h-6" />;
            case 'PROCESSING':
                return <FiPackage className="w-6 h-6" />;
            case 'SHIPPED':
                return <FiTruck className="w-6 h-6" />;
            case 'DELIVERED':
                return <FiCheckCircle className="w-6 h-6" />;
            case 'CANCELLED':
                return <FiClock className="w-6 h-6 text-red-500" />;
            default:
                return <FiClock className="w-6 h-6" />;
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[100px]">
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

    const currentStep = getStatusStep(order.orderStatus);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[100px]">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order Tracking</h1>
                <p className="mt-2 text-gray-600">Order ID: {order._id}</p>
            </div>

            {order.orderStatus === 'CANCELLED' ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <FiClock className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                This order has been cancelled.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-12">
                    <div className="relative">
                        {/* Progress bar */}
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <div
                                style={{ width: `${currentStep * 33.33}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black transition-all duration-500"
                            ></div>
                        </div>

                        {/* Steps */}
                        <div className="flex justify-between">
                            <div className={`flex flex-col items-center ${currentStep >= 0 ? 'text-black' : 'text-gray-400'}`}>
                                <div className={`rounded-full p-2 ${currentStep >= 0 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                    <FiClock className="w-5 h-5" />
                                </div>
                                <span className="mt-2 text-sm font-medium">Order Placed</span>
                            </div>

                            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-black' : 'text-gray-400'}`}>
                                <div className={`rounded-full p-2 ${currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                    <FiPackage className="w-5 h-5" />
                                </div>
                                <span className="mt-2 text-sm font-medium">Processing</span>
                            </div>

                            <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-black' : 'text-gray-400'}`}>
                                <div className={`rounded-full p-2 ${currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                    <FiTruck className="w-5 h-5" />
                                </div>
                                <span className="mt-2 text-sm font-medium">Shipped</span>
                            </div>

                            <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-black' : 'text-gray-400'}`}>
                                <div className={`rounded-full p-2 ${currentStep >= 3 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                    <FiCheckCircle className="w-5 h-5" />
                                </div>
                                <span className="mt-2 text-sm font-medium">Delivered</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Current Status</h3>
                        <div className="mt-4 flex items-center">
                            {renderStatusIcon(order.orderStatus)}
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{order.orderStatus}</p>
                                <p className="text-sm text-gray-500">
                                    {order.orderStatus === 'DELIVERED' && order.deliveredAt
                                        ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}`
                                        : order.orderStatus === 'SHIPPED'
                                            ? 'Your order is on the way!'
                                            : order.orderStatus === 'PROCESSING'
                                                ? 'Your order is being processed'
                                                : 'Your order has been received'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Order Details</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Order placed on {new Date(order.createdAt).toLocaleDateString()}</p>
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
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{order.totalPrice.toFixed(2)}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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

export default OrderTracking;