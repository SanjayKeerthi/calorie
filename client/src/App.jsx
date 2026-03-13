import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TrackerProvider } from './context/TrackerContext';
import Layout from './components/layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import BMICalculator from './pages/BMICalculator';
import DailyReport from './pages/DailyReport';
import DayEntry from './pages/DayEntry';
import MonthlyReport from './pages/MonthlyReport';
import Help from './pages/Help';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/bmi" element={
                    <ProtectedRoute>
                        <BMICalculator />
                    </ProtectedRoute>
                } />
                <Route path="/daily-report" element={
                    <ProtectedRoute>
                        <DailyReport />
                    </ProtectedRoute>
                } />
                <Route path="/day-view" element={
                    <ProtectedRoute>
                        <DayEntry />
                    </ProtectedRoute>
                } />
                <Route path="/monthly-report" element={
                    <ProtectedRoute>
                        <MonthlyReport />
                    </ProtectedRoute>
                } />
                <Route path="/help" element={
                    <ProtectedRoute>
                        <Help />
                    </ProtectedRoute>
                } />
            </Routes>
        </Layout>
    )
}

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <TrackerProvider>
                    <AppRoutes />
                </TrackerProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;