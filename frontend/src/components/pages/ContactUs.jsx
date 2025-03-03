import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck, FiAlertCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ContactUs = () => {
    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);

    // Contact information
    const contactInfo = [
        {
            icon: <FiMapPin className="h-6 w-6" />,
            title: 'Our Location',
            details: ['123 Fragrance Avenue', 'Mumbai, Maharashtra 400001', 'India']
        },
        {
            icon: <FiPhone className="h-6 w-6" />,
            title: 'Phone Number',
            details: ['+91 98765 43210', '+91 22 2345 6789']
        },
        {
            icon: <FiMail className="h-6 w-6" />,
            title: 'Email Address',
            details: ['contact@aromahpure.com', 'support@aromahpure.com']
        },
        {
            icon: <FiClock className="h-6 w-6" />,
            title: 'Working Hours',
            details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed']
        }
    ];

    // FAQ items
    const faqItems = [
        {
            question: 'How quickly can I expect a response?',
            answer: 'We strive to respond to all inquiries within 24-48 business hours. For urgent matters, we recommend calling our customer service line directly.'
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location. Please contact us for specific information about your country.'
        },
        {
            question: 'Can I schedule a consultation for custom fragrances?',
            answer: 'Absolutely! We offer personalized fragrance consultations. Please fill out the contact form with your requirements, and our fragrance specialists will get in touch to schedule a session.'
        },
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day satisfaction guarantee on most products. Please refer to our Returns & Refunds page for complete details or contact our customer service team for assistance.'
        }
    ];

    // Toggle FAQ accordion
    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    // Validate form
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
            isValid = false;
        }

        if (!formData.subject.trim()) {
            errors.subject = 'Subject is required';
            isValid = false;
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
            isValid = false;
        } else if (formData.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError(false);

        try {
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            setSubmitSuccess(true);

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);

        } catch (error) {
            setSubmitError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form status when component unmounts
    useEffect(() => {
        return () => {
            setSubmitSuccess(false);
            setSubmitError(false);
        };
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 bg-cover bg-center h-[50vh]">
                <img
                    src="https://images.unsplash.com/photo-1596461010505-0712e0243f8e?auto=format&fit=crop&q=80&w=1970"
                    alt="Contact Us"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center px-4 sm:px-6 lg:px-8">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white font-bold tracking-tight"
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mt-6 max-w-lg mx-auto text-xl text-gray-300"
                        >
                            We'd love to hear from you. Reach out to us with any questions or feedback.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Contact Information and Form Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Information */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Get in Touch</h2>
                            <p className="text-gray-600 text-lg">
                                We're here to help and answer any questions you might have. We look forward to hearing from you and will respond as soon as possible.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {contactInfo.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow duration-300 border border-gray-100"
                                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                                >
                                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-black text-white mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">{item.title}</h3>
                                    <div className="space-y-1">
                                        {item.details.map((detail, idx) => (
                                            <p key={idx} className="text-gray-600">{detail}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Media Links */}
                        <div>
                            <h3 className="text-xl font-medium text-gray-900 mb-4">Connect With Us</h3>
                            <div className="flex space-x-4">
                                <motion.a
                                    href="#"
                                    className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-3.96-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
                                    </svg>
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-lg shadow-sm ${formErrors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-black focus:border-black'} transition-colors duration-200`}
                                />
                                {formErrors.name && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-lg shadow-sm ${formErrors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-black focus:border-black'} transition-colors duration-200`}
                                />
                                {formErrors.email && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-lg shadow-sm border-gray-300 focus:ring-black focus:border-black transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-lg shadow-sm ${formErrors.subject ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-black focus:border-black'} transition-colors duration-200`}
                                />
                                {formErrors.subject && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-lg shadow-sm ${formErrors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-black focus:border-black'} transition-colors duration-200`}
                                />
                                {formErrors.message && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <FiSend className="animate-spin h-5 w-5" />
                                ) : (
                                    <>
                                        Send Message
                                        <FiSend className="ml-2" />
                                    </>
                                )}
                            </button>

                            {submitSuccess && (
                                <div className="flex items-center space-x-2 text-green-600">
                                    <FiCheck className="h-5 w-5" />
                                    <span>Message sent successfully!</span>
                                </div>
                            )}

                            {submitError && (
                                <div className="flex items-center space-x-2 text-red-600">
                                    <FiAlertCircle className="h-5 w-5" />
                                    <span>Failed to send message. Please try again.</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50"
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                                >
                                    <span className="text-lg font-medium text-gray-900">{item.question}</span>
                                    {activeAccordion === index ? (
                                        <FiChevronUp className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <FiChevronDown className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                                {activeAccordion === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600">{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default ContactUs;