import { Link } from 'react-router-dom';
import { ChevronRight, Star, Activity, TrendingUp, Users } from 'lucide-react';

const Home = () => {
    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="relative pt-20 flex flex-col items-center text-center animate-fade-in">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-500/20 blur-[100px] rounded-full -z-10" />

                <h1 className="text-6xl font-extrabold tracking-tight mb-6">
                    <span className="block text-gray-800">Transform Body</span>
                    <span className="gradient-text">Transform Life</span>
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
                    Your personal companion for precision calorie tracking, health analytics, and daily motivation.
                    Sweat to fit, one day at a time.
                </p>

                <div className="flex gap-4">
                    <Link to="/bmi" className="btn-primary flex items-center gap-2">
                        Start Your Journey <ChevronRight size={20} />
                    </Link>
                    <Link to="/help" className="px-8 py-3 rounded-full border border-gray-300 font-medium text-gray-700 hover:bg-white/50 hover:border-pink-300 transition-all">
                        Learn More
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: <Activity className="text-pink-500" />, title: "Precision Tracking", desc: "Calculate daily intake with scientific accuracy tailored to your BMI." },
                    { icon: <TrendingUp className="text-violet-500" />, title: "Visual Analytics", desc: "Track progress through interactive monthly reports and deficit trends." },
                    { icon: <Users className="text-cyan-500" />, title: "Community Driven", desc: "Join thousands of users achieving their dream physique." }
                ].map((feature, i) => (
                    <div key={i} className="glass-panel p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                        <div className="bg-white/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-md">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </section>

            {/* Testimonials */}
            <section>
                <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { name: "Sarah J.", role: "Lost 15kg", text: "The daily calorie deficit tracking changed my perspective on food. The visual cues made it easy to stay on track." },
                        { name: "Mike T.", role: "Gained Muscle", text: "Finally a tool that understands maintenance calories vs surplus. The monthly reports are a game changer." }
                    ].map((item, i) => (
                        <div key={i} className="glass-panel p-8 rounded-2xl relative">
                            <div className="flex gap-1 text-yellow-400 mb-4">
                                {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={16} />)}
                            </div>
                            <p className="text-lg text-gray-700 italic mb-6">"{item.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white font-bold">
                                    {item.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold">{item.name}</h4>
                                    <p className="text-sm text-pink-600">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
