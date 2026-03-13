import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from '../context/TrackerContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isFuture } from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

const DailyReport = () => {
    const navigate = useNavigate();
    const { data } = useTracker();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    const getDayStatus = (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const log = data.logs[dateStr];
        const isFutureDate = isFuture(date) && !isSameDay(date, new Date());

        if (isFutureDate) return 'future'; // White
        if (!log || !log.isComplete) return 'incomplete'; // Red
        return 'complete'; // Blue (or Green for success match, but task asked for Blue if completed)
    };

    const handleDayClick = (date) => {
        navigate(`/day-view?date=${format(date, 'yyyy-MM-dd')}`);
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Your Progress Calendar</h2>

            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6 glass-panel p-4 rounded-xl">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h3 className="text-xl font-bold text-gray-800">
                    {format(currentMonth, 'MMMM yyyy')}
                </h3>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-4 mb-4 text-center font-medium text-gray-500">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-4">
                {days.map((date) => {
                    const status = getDayStatus(date);
                    return (
                        <button
                            key={date.toString()}
                            onClick={() => handleDayClick(date)}
                            className={clsx(
                                "aspect-square rounded-2xl flex flex-col items-center justify-center transition-all relative border overflow-hidden",
                                status === 'future' && "bg-white/40 border-white/40 hover:bg-white/60",
                                status === 'incomplete' && "bg-red-100 border-red-200 text-red-600 hover:bg-red-200",
                                status === 'complete' && "bg-blue-100 border-blue-200 text-blue-600 hover:bg-blue-200"
                            )}
                        >
                            <span className="text-lg font-bold">{format(date, 'd')}</span>

                            {status === 'complete' && <CheckCircle size={16} className="mt-1" />}
                            {status === 'incomplete' && <span className="w-2 h-2 rounded-full bg-red-400 mt-2 block" />}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center gap-6 text-sm text-gray-600 glass-panel p-4 rounded-xl inline-flex mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                    <span>Data Entered (Complete)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                    <span>Missing / Incomplete</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white/40 border border-white/40 rounded"></div>
                    <span>Upcoming Day</span>
                </div>
            </div>
        </div>
    );
};

export default DailyReport;
