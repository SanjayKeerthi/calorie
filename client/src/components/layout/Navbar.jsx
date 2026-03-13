import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, Activity, BarChart2, Calendar, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    if (!user && (location.pathname === '/login' || location.pathname === '/register')) {
        return null; // Don't show navbar on auth pages
    }

    const navLinks = [
        { name: 'BMI Calculator', path: '/bmi', icon: <Activity size={18} /> },
        { name: 'Daily Report', path: '/daily-report', icon: <Calendar size={18} /> },
        { name: 'Monthly Report', path: '/monthly-report', icon: <BarChart2 size={18} /> },
        { name: 'Help', path: '/help', icon: <HelpCircle size={18} /> },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-600">
                        Sweat to Fit
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user && navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="nav-link flex items-center gap-2"
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}

                        {user ? (
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500 text-pink-600 hover:bg-pink-50 transition-colors"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        ) : (
                            <Link to="/login" className="btn-primary text-sm">Login</Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-panel border-t border-white/20 animate-slide-up">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {user && navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-white/30"
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                        {user ? (
                            <button
                                onClick={() => { logout(); setIsOpen(false); }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-left text-base font-medium text-red-500 hover:bg-white/30"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-center btn-primary mt-4">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
