import React from 'react';

const AboutEvair = () => {
    const reviews = [
        {
            id: 1,
            name: 'Sarah Johnson',
            rating: 5,
            comment: 'The car perfume is absolutely amazing! The fragrance lasts for weeks and creates such a pleasant atmosphere during my daily commute.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60'
        },
        {
            id: 2,
            name: 'Michael Chen',
            rating: 5,
            comment: "Best car freshener I've ever used.The scent is sophisticated and not overwhelming.Highly recommend!'",
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            rating: 4,
            comment: 'Love how the fragrance transforms my car into a luxurious space. Great product that lasts long.',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60'
        }
    ];

    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                <div className="relative w-full md:w-1/2 rounded-md">
                    <div className="w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
                        <img
                            src="https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Evair Perfume"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <div className="text-center text-white text-lg md:text-xl font-medium px-6">
                                STEP INTO YOUR CAR FOR AN AROMATIC ESCAPE INTO A WORLD OF FRESHNESS
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What is Evair?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Cars are more than a vehicle. They are a medium to travel and explore, a tool to gain freedom and a source
                        to commute from one place to the other. They are an ocean of memories which we cherish for a lifetime. And
                        to make those memories and every other moment special, we have created a range of car perfumes which
                        mingle with your surroundings to create a pleasant atmosphere while you explore and prepare for the next
                        adventure!
                    </p>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-24">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h3 className="font-medium text-gray-900">{review.name}</h3>
                                    <div className="flex items-center">
                                        {[...Array(review.rating)].map((_, index) => (
                                            <svg
                                                key={index}
                                                className="w-4 h-4 text-yellow-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutEvair;