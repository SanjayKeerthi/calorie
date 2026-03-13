import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto glass-panel border-t border-white/20 text-gray-700 pt-10 pb-6 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Organization Info */}
                    <div>
                        <h3 className="text-2xl font-bold gradient-text mb-4">Sweat to Fit</h3>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Empowering you to achieve your fitness goals through precise tracking and daily motivation.
                            Join our community and transform your lifestyle today.
                        </p>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-violet-700">Contact Us</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-pink-500 mt-1 shrink-0" />
                                <p>123 Fitness Boulevard, Wellness City, WC 45678</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-pink-500 shrink-0" />
                                <p>contact@sweattofit.com</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-pink-500 shrink-0" />
                                <p>+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-violet-700">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Copyright © 2026 Sweat to Fit</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm opacity-60">
                    <p>© 2026 Sweat to Fit Organization. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
