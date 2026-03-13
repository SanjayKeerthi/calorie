import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
