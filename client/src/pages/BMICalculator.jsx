import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from '../context/TrackerContext';
import { calculateBMI, calculateMaintenanceCalories } from '../utils/calculations';
import { Activity } from 'lucide-react';

const BMICalculator = () => {
    const { saveBMI } = useTracker();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        age: '',
        gender: 'male',
        activity: '1.2'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const height = parseFloat(formData.height);
        const weight = parseFloat(formData.weight);
        const age = parseInt(formData.age);
        const activity = parseFloat(formData.activity);

        const bmiResult = calculateBMI(height, weight);
        const maintenance = calculateMaintenanceCalories(height, weight, age, formData.gender, activity);

        // Determine suggested goal
        let goal = maintenance;
        let deficitType = "Maintenance";

        if (bmiResult.status === "Overweight" || bmiResult.status === "Obese") {
            goal = maintenance - 500;
            deficitType = "Deficit";
        } else if (bmiResult.status === "Underweight") {
            goal = maintenance + 300;
            deficitType = "Surplus";
        }

        const bmiData = {
            ...formData,
            bmi: bmiResult.value,
            status: bmiResult.status,
            maintenance,
            goal,
            deficitType,
            updatedAt: new Date().toISOString()
        };

        saveBMI(bmiData);
        navigate('/daily-report', { state: { newCalc: true } });
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="max-w-2xl mx-auto py-8 animate-slide-up">
            <div className="glass-panel p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-pink-100 rounded-xl text-pink-600">
                        <Activity size={24} />
                    </div>
                    <h2 className="text-3xl font-bold gradient-text">BMI & Calorie Calculator</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                placeholder="e.g. 175"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder="e.g. 70"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="e.g. 25"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Activity Level</label>
                        <select
                            name="activity"
                            value={formData.activity}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        >
                            <option value="1.2">Sedentary (Office job, little exercise)</option>
                            <option value="1.375">Lightly Active (Exercise 1-3 days/week)</option>
                            <option value="1.55">Moderately Active (Exercise 3-5 days/week)</option>
                            <option value="1.725">Very Active (Exercise 6-7 days/week)</option>
                            <option value="1.9">Extra Active (Physical job hard exercise)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary py-4 text-lg font-bold shadow-xl mt-4"
                    >
                        Calculate & Save Plan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BMICalculator;
