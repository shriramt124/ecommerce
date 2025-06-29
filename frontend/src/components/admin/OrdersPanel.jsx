import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle, FiEdit, FiEye } from 'react-icons/fi';

const API_URL = 'http://localhost:3000/orders';

// Configure axios to include credentials with every request
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const OrdersPanel = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [paymentFilter, setPaymentFilter] = useState('ALL');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await api.get('/');
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                toast.error('Failed to fetch orders');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await api.put(`/${orderId}/status`, { status });
            if (response.data.success) {
                toast.success('Order status updated successfully');
                fetchOrders();
                setIsModalOpen(false);
            } else {
                toast.error('Failed to update order status');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
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

    const openOrderModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const filteredOrders = orders.filter(order => {
        const statusMatch = statusFilter === 'ALL' || order.orderStatus === statusFilter;
        const paymentMatch = paymentFilter === 'ALL' || order.paymentInfo.type === paymentFilter;
        return statusMatch && paymentMatch;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Manage Orders</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                    <select
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    >
                        <option value="ALL">All Payment Methods</option>
                        <option value="CARD">Card Payment</option>
                        <option value="COD">Cash on Delivery</option>
                    </select>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="text-center py-8">
                    <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try changing your filters or check back later.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order._id.substring(0, 8)}...
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {order.user.FirstName} {order.user.LastName}
                                        </div>
                                        <div className="text-sm text-gray-500">{order.user.Email}</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getStatusIcon(order.orderStatus)}
                                            <span className="ml-2 text-sm text-gray-900">{order.orderStatus}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 py-1 rounded-full text-xs ${order.paymentInfo.type === 'COD' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                            {order.paymentInfo.type === 'COD' ? 'Cash on Delivery' : 'Card'}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ₹{order.totalPrice.toFixed(2)}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openOrderModal(order)}
                                                className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                            >
                                                <FiEye className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => openOrderModal(order)}
                                                className="text-blue-600 hover:text-blue-900 focus:outline-none"
                                            >
                                                <FiEdit className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Order Detail Modal */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Order Details
                                        </h3>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Order ID: {selectedOrder._id}</p>
                                                <p className="text-sm text-gray-500">Date: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Customer Information</h4>
                                                <p className="text-sm text-gray-500">{selectedOrder.user.FirstName} {selectedOrder.user.LastName}</p>
                                                <p className="text-sm text-gray-500">{selectedOrder.user.Email}</p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Shipping Address</h4>
                                                <p className="text-sm text-gray-500">
                                                    {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}, {selectedOrder.shippingAddress.country} - {selectedOrder.shippingAddress.zipCode}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Payment Information</h4>
                                                <p className="text-sm text-gray-500">
                                                    Method: {selectedOrder.paymentInfo.type === 'COD' ? 'Cash on Delivery' : 'Card'}
                                                </p>
                                                {selectedOrder.paymentInfo.id && (
                                                    <p className="text-sm text-gray-500">Transaction ID: {selectedOrder.paymentInfo.id}</p>
                                                )}
                                                <p className="text-sm text-gray-500">
                                                    Status: {selectedOrder.paymentInfo.status || 'Pending'}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Order Items</h4>
                                                <ul className="mt-2 divide-y divide-gray-200">
                                                    {selectedOrder.orderItems.map((item) => (
                                                        <li key={item._id} className="py-2">
                                                            <div className="flex justify-between">
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900">{item.product.title}</p>
                                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                                </div>
                                                                <p className="text-sm font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="border-t border-gray-200 pt-4">
                                                <div className="flex justify-between">
                                                    <p className="text-sm text-gray-500">Subtotal</p>
                                                    <p className="text-sm font-medium text-gray-900">₹{selectedOrder.itemsPrice.toFixed(2)}</p>
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-sm text-gray-500">Tax</p>
                                                    <p className="text-sm font-medium text-gray-900">₹{selectedOrder.taxPrice.toFixed(2)}</p>
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-sm text-gray-500">Shipping</p>
                                                    <p className="text-sm font-medium text-gray-900">₹{selectedOrder.shippingPrice.toFixed(2)}</p>
                                                </div>
                                                <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                                                    <p className="text-sm font-medium text-gray-900">Total</p>
                                                    <p className="text-sm font-bold text-gray-900">₹{selectedOrder.totalPrice.toFixed(2)}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Update Status</h4>
                                                <div className="mt-2 grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() => updateOrderStatus(selectedOrder._id, 'PROCESSING')}
                                                        disabled={selectedOrder.orderStatus === 'PROCESSING' || selectedOrder.orderStatus === 'SHIPPED' || selectedOrder.orderStatus === 'DELIVERED' || selectedOrder.orderStatus === 'CANCELLED'}
                                                        className={`px-3 py-2 text-xs font-medium rounded-md ${selectedOrder.orderStatus === 'PROCESSING' || selectedOrder.orderStatus === 'SHIPPED' || selectedOrder.orderStatus === 'DELIVERED' || selectedOrder.orderStatus === 'CANCELLED' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                                                    >
                                                        Processing
                                                    </button>
                                                    <button
                                                        onClick={() => updateOrderStatus(selectedOrder._id, 'SHIPPED')}
                                                        disabled={selectedOrder.orderStatus === 'PENDING' || selectedOrder.orderStatus === 'SHIPPED' || selectedOrder.orderStatus === 'DELIVERED' || selectedOrder.orderStatus === 'CANCELLED'}
                                                        className={`px-3 py-2 text-xs font-medium rounded-md ${selectedOrder.orderStatus === 'PENDING' || selectedOrder.orderStatus === 'SHIPPED' || selectedOrder.orderStatus === 'DELIVERED' || selectedOrder.orderStatus === 'CANCELLED' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                                                    >
                                                        Shipped
                                                    </button>
                                                    <button
                                                        onClick={() => updateOrderStatus(selectedOrder._id, 'DELIVERED')}
                                                        disabled={selectedOrder.orderStatus === 'PENDING' || selectedOrder.orderStatus === 'PROCESSING' || selectedOrder.orderStatus === 'DELIVERED' || selectedOrder.orderStatus === 'CANCELLED'}
                                                        className={`px-3 py-2 text-xs font-medium rounded-md ${selectedOrder.orderStatus === 'PENDING' || selectedOrder.orderStatus === 'PROCESSING' || selectedOrder.orderStatus === 'DELIVERED' || selectedOrder.orderStatus === 'CANCELLED' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                                                    >
                                                        Delivered
                                                    </button>
                                                    <button
                                                        onClick={() => updateOrderStatus(selectedOrder._id, 'CANCELLED')}
                                                        disabled={selectedOrder.orderStatus === 'DELIVERED' || selectedOrder.orderStatus === 'CANCELLED'}
                                                        className={`px-3 py-2 text-xs font-medium rounded-md ${selectedOrder.orderStatus === 'DELIVERED' || selectedOrder.orderStatus === 'CANCELLED' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPanel;