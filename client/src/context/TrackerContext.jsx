import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TrackerContext = createContext();

export const useTracker = () => useContext(TrackerContext);

export const TrackerProvider = ({ children }) => {
    const { user } = useAuth();
    const [data, setData] = useState({ bmi: null, logs: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrackerData = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem('sweatToFit_token');
                    const res = await axios.get('/api/tracker', {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    // Format data correctly if the backend sends an empty document
                    const fetchedData = res.data || { bmi: null, logs: {} };
                    setData({
                        bmi: fetchedData.bmi || null,
                        logs: fetchedData.logs || {}
                    });

                } catch (err) {
                    console.error("Failed to fetch tracker data", err);
                    setData({ bmi: null, logs: {} });
                }
            } else {
                setData({ bmi: null, logs: {} });
            }
            setLoading(false);
        };

        fetchTrackerData();
    }, [user]);

    const saveBMI = async (bmiData) => {
        if (!user) return;

        // Optimistic UI update
        const newData = { ...data, bmi: bmiData };
        setData(newData);

        try {
            const token = localStorage.getItem('sweatToFit_token');
            await axios.post('/api/tracker/bmi', { bmi: bmiData }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error("Failed to save BMI data to server", err);
        }
    };

    const getDayLog = (dateStr) => {
        return data.logs[dateStr] || null;
    };

    const saveDayLog = async (dateStr, logData) => {
        if (!user) return;

        // Optimistic UI update
        const newData = {
            ...data,
            logs: {
                ...data.logs,
                [dateStr]: logData
            }
        };
        setData(newData);

        try {
            const token = localStorage.getItem('sweatToFit_token');
            await axios.post('/api/tracker/log', { dateStr, logData }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error("Failed to save day log to server", err);
        }
    };

    const value = {
        data,
        loading,
        saveBMI,
        getDayLog,
        saveDayLog
    };

    return (
        <TrackerContext.Provider value={value}>
            {!loading && children}
        </TrackerContext.Provider>
    );
};
