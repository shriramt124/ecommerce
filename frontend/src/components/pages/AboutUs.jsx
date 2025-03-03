import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiAward, FiHeart } from 'react-icons/fi';

const AboutUs = () => {
    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    // Team members data
    const teamMembers = [
        {
            name: 'Aanya Sharma',
            position: 'Founder & CEO',
            bio: 'With over 15 years in the fragrance industry, Aanya brings her passion for scents and sustainable luxury to every product.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
        },
        {
            name: 'Vikram Mehta',
            position: 'Head of Product Development',
            bio: 'Vikram combines traditional aromatherapy knowledge with modern techniques to create our signature scent profiles.',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
        },
        {
            name: 'Priya Patel',
            position: 'Creative Director',
            bio: 'With a background in luxury brand design, Priya ensures every product delivers both visual and olfactory elegance.',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
        },
        {
            name: 'Arjun Kapoor',
            position: 'Sustainability Officer',
            bio: 'Arjun leads our initiatives to ensure all products meet the highest standards of environmental responsibility.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
        }
    ];

    // Company values
    const values = [
        {
            icon: <FiHeart className="h-8 w-8" />,
            title: 'Passion',
            description: 'We pour our heart into every fragrance we create, ensuring each product reflects our dedication to excellence.'
        },
        {
            icon: <FiAward className="h-8 w-8" />,
            title: 'Quality',
            description: 'We use only the finest ingredients and materials, crafting premium products that stand the test of time.'
        },
        {
            icon: <FiUsers className="h-8 w-8" />,
            title: 'Community',
            description: 'We believe in building relationships with our customers and supporting the communities we serve.'
        },
        {
            icon: <FiTarget className="h-8 w-8" />,
            title: 'Innovation',
            description: 'We constantly explore new scent profiles and sustainable practices to stay at the forefront of our industry.'
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 h-[60vh]">
                <img 
                    src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop" 
                    alt="Fragrance production" 
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white font-bold tracking-tight">
                            Our Story
                        </h1>
                        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
                            Crafting premium fragrances that transform everyday moments into extraordinary experiences.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Our Journey</h2>
                        <div className="space-y-6 text-gray-600">
                            <p>
                                Founded in 2018, Aromahpure began with a simple vision: to create premium fragrances that transform everyday spaces into sanctuaries of well-being. What started as a small workshop in Mumbai has grown into a beloved brand recognized for its distinctive scents and commitment to quality.
                            </p>
                            <p>
                                Our founder, Aanya Sharma, combined her background in aromatherapy with her passion for sustainable luxury to develop our first collection of car fragrances. The overwhelming response inspired us to expand our offerings to include home fragrances, candles, and personal accessories.
                            </p>
                            <p>
                                Today, we continue to handcraft each product with the same attention to detail and dedication to excellence that defined our beginnings. Every Aromahpure creation is a testament to our belief that fragrance has the power to elevate mood, evoke memories, and create meaningful experiences.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="overflow-hidden rounded-lg h-64">
                                <img 
                                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop" 
                                    alt="Our products" 
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="overflow-hidden rounded-lg h-40">
                                <img 
                                    src="https://images.unsplash.com/photo-1616486029016-0735d416d693?q=80&w=1932&auto=format&fit=crop" 
                                    alt="Fragrance creation" 
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="overflow-hidden rounded-lg h-40">
                                <img 
                                    src="https://images.unsplash.com/photo-1599446794254-16ca8acf93d9?q=80&w=1964&auto=format&fit=crop" 
                                    alt="Product development" 
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="overflow-hidden rounded-lg h-64">
                                <img 
                                    src="https://images.unsplash.com/photo-1596461010505-0712e0243f8e?q=80&w=1970&auto=format&fit=crop" 
                                    alt="Our workshop" 
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Our Values Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Our Values</h2>
                    <p className="max-w-2xl mx-auto text-gray-600 mb-12">
                        These core principles guide everything we do, from product development to customer service.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-black text-white mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Our Team Section */}
            {/* <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Meet Our Team</h2>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        The passionate individuals behind Aromahpure who bring expertise, creativity, and dedication to every product we create.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                                <p className="text-gray-500 mb-3">{member.position}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section> */}

            {/* Mission Statement */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Mission</h2>
                    <p className="text-xl md:text-2xl font-light leading-relaxed">
                        "To create exceptional fragrances that transform everyday spaces, inspire well-being, and bring moments of joy and luxury to our customers' lives while maintaining our commitment to sustainability and ethical practices."
                    </p>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutUs;