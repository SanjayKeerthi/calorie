import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTracker } from '../context/TrackerContext';
import { COMMON_FOODS } from '../utils/constants'; // We'll assume this exists or use empty
import { Plus, Trash2, CheckCircle, AlertCircle, ChevronLeft } from 'lucide-react';
import { clsx } from 'clsx';

const DayEntry = () => {
    const [searchParams] = useSearchParams();
    const dateStr = searchParams.get('date');
    const navigate = useNavigate();
    const { data, getDayLog, saveDayLog } = useTracker();

    const [log, setLog] = useState({
        breakfast: [], lunch: [], dinner: [], snacks: [],
        totalConsumed: 0, isComplete: false
    });

    // Input state
    const [activeSection, setActiveSection] = useState('breakfast');
    const [newItemName, setNewItemName] = useState('');
    const [newItemQty, setNewItemQty] = useState(''); // grams
    const [newItemCals, setNewItemCals] = useState(''); // manual cals override

    const bmiData = data.bmi || {};
    const goal = bmiData.goal || 2000;

    useEffect(() => {
        if (!dateStr) navigate('/daily-report');
        const existingLog = getDayLog(dateStr);
        if (existingLog) {
            setLog(existingLog);
        }
    }, [dateStr, data]);

    const calculateCalories = (name, qty) => {
        // Simple lookup simulation
        const food = COMMON_FOODS.find(f => f.name.toLowerCase().includes(name.toLowerCase()));
        if (food) {
            return Math.round((food.calories * qty) / 100);
        }
        return 0; // Unknown food
    };

    const addItem = () => {
        if (!newItemName || !newItemQty) return;

        let cals = parseInt(newItemCals);
        if (!cals) {
            cals = calculateCalories(newItemName, parseInt(newItemQty));
        }
        if (!cals && !newItemCals) {
            // Fallback: if unknown and no manual calories, maybe default 1cal/g or ask user?
            // For simplicity, let's default to a generic 1.5 cal/g if unknown
            cals = Math.round(parseInt(newItemQty) * 1.5);
        }

        const newItem = {
            id: Date.now(),
            item: newItemName,
            qty: parseInt(newItemQty),
            cal: cals
        };

        const updatedSection = [...log[activeSection], newItem];
        const newLog = {
            ...log,
            [activeSection]: updatedSection,
            totalConsumed: log.totalConsumed + cals
        };

        setLog(newLog);
        saveDayLog(dateStr, newLog);

        setNewItemName('');
        setNewItemQty('');
        setNewItemCals('');
    };

    const removeItem = (section, id, cal) => {
        const updatedSection = log[section].filter(i => i.id !== id);
        const newLog = {
            ...log,
            [section]: updatedSection,
            totalConsumed: log.totalConsumed - cal
        };
        setLog(newLog);
        saveDayLog(dateStr, newLog);
    };

    const toggleComplete = () => {
        const newLog = { ...log, isComplete: !log.isComplete };
        setLog(newLog);
        saveDayLog(dateStr, newLog);
    };

    const remaining = goal - log.totalConsumed;
    const progressPercent = Math.min(100, Math.max(0, (log.totalConsumed / goal) * 100));

    // Recommendations based on simplified logic
    const isDeficit = bmiData.deficitType === "Deficit";

    return (
        <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/daily-report')} className="p-2 hover:bg-white/20 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-3xl font-bold gradient-text">Entry for {dateStr}</h2>
            </div>

            {/* Stats Card */}
            <div className="glass-panel p-6 rounded-2xl mb-8 relative overflow-hidden">
                <div className="flex justify-between items-end mb-2 relative z-10">
                    <div>
                        <p className="text-gray-500 font-medium">Daily Goal</p>
                        <p className="text-3xl font-bold">{goal} <span className="text-sm font-normal text-gray-400">kcal</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 font-medium">Consumed</p>
                        <p className={clsx("text-3xl font-bold", log.totalConsumed > goal ? "text-red-500" : "text-green-500")}>
                            {log.totalConsumed} <span className="text-sm font-normal text-gray-400">kcal</span>
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2 relative z-10">
                    <div
                        className={clsx("h-full transition-all duration-500",
                            remaining < 0 ? "bg-red-500" : "bg-gradient-to-r from-pink-500 to-violet-500"
                        )}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                <p className="text-center font-medium relative z-10">
                    {remaining >= 0 ?
                        <span className="text-green-600">{remaining} kcal remaining</span> :
                        <span className="text-red-500">{Math.abs(remaining)} kcal over limit</span>
                    }
                </p>

                {/* Status Indicator at end of day */}
                {log.isComplete && (
                    <div className="mt-4 p-3 bg-green-100/50 rounded-lg flex items-center justify-center gap-2 text-green-700 font-medium">
                        <CheckCircle size={18} /> Day Completed!
                    </div>
                )}
            </div>

            {/* Input Section */}
            <div className="glass-panel p-6 rounded-2xl mb-8">
                <div className="flex gap-4 mb-4 border-b border-gray-200 pb-2 overflow-x-auto">
                    {['breakfast', 'lunch', 'dinner', 'snacks'].map(sec => (
                        <button
                            key={sec}
                            onClick={() => setActiveSection(sec)}
                            className={clsx(
                                "px-4 py-2 rounded-lg capitalize font-medium transition-all whitespace-nowrap",
                                activeSection === sec ? "bg-pink-500 text-white shadow-lg" : "text-gray-600 hover:bg-white/50"
                            )}
                        >
                            {sec}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full relative">
                        <label className="text-sm text-gray-500 mb-1 block">Food Item</label>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={e => setNewItemName(e.target.value)}
                            placeholder="e.g. Grilled Chicken"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 outline-none"
                            list="food-suggestions"
                        />
                        <datalist id="food-suggestions">
                            {COMMON_FOODS.map(f => <option key={f.name} value={f.name} />)}
                        </datalist>
                    </div>
                    <div className="w-full md:w-32">
                        <label className="text-sm text-gray-500 mb-1 block">Qty (g/ml)</label>
                        <input
                            type="number"
                            value={newItemQty}
                            onChange={e => setNewItemQty(e.target.value)}
                            placeholder="100"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 outline-none"
                        />
                    </div>
                    <div className="w-full md:w-32">
                        <label className="text-sm text-gray-500 mb-1 block">Cals (Opt)</label>
                        <input
                            type="number"
                            value={newItemCals}
                            onChange={e => setNewItemCals(e.target.value)}
                            placeholder="Auto"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 outline-none"
                        />
                    </div>
                    <button
                        onClick={addItem}
                        className="w-full md:w-auto px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={18} /> Add
                    </button>
                </div>
            </div>

            {/* List Items */}
            <div className="space-y-4">
                {log[activeSection].length === 0 ? (
                    <div className="text-center py-10 text-gray-400">No items in {activeSection} yet.</div>
                ) : (
                    log[activeSection].map(item => (
                        <div key={item.id} className="glass-panel p-4 rounded-xl flex justify-between items-center group">
                            <div>
                                <p className="font-bold text-gray-800">{item.item}</p>
                                <p className="text-sm text-gray-500">{item.qty}g</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-pink-600">{item.cal} kcal</span>
                                <button
                                    onClick={() => removeItem(activeSection, item.id, item.cal)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={toggleComplete}
                    className={clsx(
                        "px-8 py-3 rounded-full font-bold shadow-lg transition-all",
                        log.isComplete ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-800 text-white hover:bg-black"
                    )}
                >
                    {log.isComplete ? "Day Completed (Click to Undo)" : "Mark Day as Complete"}
                </button>
            </div>

        </div>
    );
};

export default DayEntry;
