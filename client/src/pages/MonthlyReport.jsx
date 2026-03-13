import { useState, useEffect } from 'react';
import { useTracker } from '../context/TrackerContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyReport = () => {
    const { data } = useTracker();
    const [chartData, setChartData] = useState(null);
    const [monthStats, setMonthStats] = useState({ deficitDays: 0, surplusDays: 0, maintenanceDays: 0 });

    const bmiData = data.bmi || {};
    const goal = bmiData.goal || 2000;
    const maintenance = bmiData.maintenance || 2000;

    useEffect(() => {
        const today = new Date();
        const days = eachDayOfInterval({
            start: startOfMonth(today),
            end: endOfMonth(today)
        });

        const labels = days.map(d => format(d, 'd MMM'));
        const consumedData = [];
        const goalData = [];

        let deficit = 0;
        let surplus = 0;
        let maint = 0;

        days.forEach(date => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const log = data.logs[dateStr];
            const consumed = log ? log.totalConsumed : 0;

            consumedData.push(consumed);
            goalData.push(goal);

            if (log && log.isComplete) {
                if (consumed < maintenance - 200) deficit++;
                else if (consumed > maintenance + 200) surplus++;
                else maint++;
            }
        });

        setMonthStats({ deficitDays: deficit, surplusDays: surplus, maintenanceDays: maint });

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Consumed (kcal)',
                    data: consumedData,
                    backgroundColor: 'rgba(236, 72, 153, 0.6)',
                    borderColor: 'rgba(236, 72, 153, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                }
            ]
        });

    }, [data, goal, maintenance]);

    if (!data.bmi) {
        return (
            <div className="text-center py-20 text-gray-500">
                <p>Please calculate your BMI first.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-8 mb-20">
            <h2 className="text-3xl font-bold gradient-text mb-8">Monthly Analytics</h2>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-panel p-6 rounded-xl text-center">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Deficit Days</p>
                    <p className="text-4xl font-bold text-green-500">{monthStats.deficitDays}</p>
                    <p className="text-xs text-green-600 mt-2">Below maintenance</p>
                </div>
                <div className="glass-panel p-6 rounded-xl text-center">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Surplus Days</p>
                    <p className="text-4xl font-bold text-blue-500">{monthStats.surplusDays}</p>
                    <p className="text-xs text-blue-600 mt-2">Above maintenance</p>
                </div>
                <div className="glass-panel p-6 rounded-xl text-center">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Goal</p>
                    <p className="text-4xl font-bold text-pink-500">{goal}</p>
                    <p className="text-xs text-pink-600 mt-2">kcal / day</p>
                </div>
            </div>

            {/* Chart */}
            <div className="glass-panel p-6 rounded-2xl h-[400px] flex items-center justify-center">
                {chartData ? <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: `Calorie Intake vs Goal (${format(new Date(), 'MMMM')})` },
                            annotation: {
                                annotations: {
                                    line1: {
                                        type: 'line',
                                        yMin: goal,
                                        yMax: goal,
                                        borderColor: 'rgb(100, 100, 255)',
                                        borderWidth: 2,
                                        borderDash: [5, 5],
                                        label: { content: 'GOAL', enabled: true }
                                    }
                                }
                            }
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }}
                /> : <p>Loading chart...</p>}
            </div>

            <div className="mt-8 glass-panel p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-2">Analysis</h3>
                <p className="text-gray-600">
                    Based on your goal of <strong>{bmiData.deficitType}</strong> (Goal: {goal} kcal), you are advised to maintain a consistent intake.
                    Green bars indicate consumption. The dotted line represents your daily target.
                </p>
            </div>
        </div>
    );
};

export default MonthlyReport;
