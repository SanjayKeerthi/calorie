import { Mail, Phone, MapPin, Target, Eye, Heart } from 'lucide-react';

const Help = () => {
    return (
        <div className="max-w-4xl mx-auto py-8 animate-fade-in pb-20">
            {/* Header */}
            <h2 className="text-4xl font-bold gradient-text text-center mb-12">About Sweat to Fit</h2>

            {/* Vision & Mission Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
                <div className="glass-panel p-6 rounded-2xl text-center hover:scale-105 transition-transform">
                    <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center text-pink-500 mb-4">
                        <Eye size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                    <p className="text-gray-600 text-sm">
                        To create a world where fitness is accessible, understandable, and integral to daily life.
                    </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl text-center hover:scale-105 transition-transform">
                    <div className="w-16 h-16 mx-auto bg-violet-100 rounded-full flex items-center justify-center text-violet-500 mb-4">
                        <Target size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                    <p className="text-gray-600 text-sm">
                        To provide precise tools and analytics that empower individuals to take control of their health journey.
                    </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl text-center hover:scale-105 transition-transform">
                    <div className="w-16 h-16 mx-auto bg-cyan-100 rounded-full flex items-center justify-center text-cyan-500 mb-4">
                        <Heart size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Our Values</h3>
                    <p className="text-gray-600 text-sm">
                        Transparency, Scientific Accuracy, and Community Support are at the heart of everything we do.
                    </p>
                </div>
            </div>

            {/* Contact Section */}
            <div className="glass-panel p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-8 text-center">Contact Us</h3>
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <div className="p-3 bg-gray-100 rounded-full text-gray-700">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold">Visit Us</h4>
                            <p className="text-gray-600">123 Fitness Boulevard</p>
                            <p className="text-gray-600">Wellness City, WC 45678</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-3">
                        <div className="p-3 bg-gray-100 rounded-full text-gray-700">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold">Email Us</h4>
                            <p className="text-gray-600 text-sm">Support: help@sweattofit.com</p>
                            <p className="text-gray-600 text-sm">Business: partners@sweattofit.com</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-3">
                        <div className="p-3 bg-gray-100 rounded-full text-gray-700">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold">Call Us</h4>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                            <p className="text-gray-400 text-xs">Mon-Fri, 9am - 6pm EST</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
