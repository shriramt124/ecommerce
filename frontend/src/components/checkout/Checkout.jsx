import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
    saveInfo: false,
    paymentMethod: 'card'
  });
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleOrderSummary = () => {
    setIsOrderSummaryVisible(!isOrderSummaryVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement order creation logic
      toast.success('Order placed successfully!');
      navigate('/order-confirmation');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mt-[70px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <h2 className="text-2xl md:text-3xl font-serif mb-6">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">PIN Code</label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                >
                  <option value="India">India</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleChange}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
                Save this information for next time
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Method</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                  />
                  <label htmlFor="card" className="ml-2 text-sm text-gray-700">
                    Credit/Debit Card
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                  />
                  <label htmlFor="upi" className="ml-2 text-sm text-gray-700">
                    UPI
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                  />
                  <label htmlFor="cod" className="ml-2 text-sm text-gray-700">
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹369.00</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold">₹369.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;