import React, { useState, useEffect } from 'react';
import {
    Search,
    ChevronRight,
    ChevronLeft,
    AlertTriangle,
    ShoppingCart,
    CheckCircle,
    Clock,
    ShieldAlert,
    Home,
    Wrench,
    Droplet,
    Zap,
    TreePine,
    Info,
    ExternalLink,
    ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS_DATA = [
    {
        "Project_ID": "KITCH-002",
        "Category": "Kitchen/Bath",
        "Icon": <Droplet className="w-5 h-5" />,
        "Color": "#007AFF",
        "Project_Title": "How to Unblock a Sink: Fast UK Plumbing Fixes",
        "Top_5_Keywords": ["How to unblock a sink UK", "blocked kitchen sink", "best drain unblocker", "sink plunger", "clean P-trap"],
        "Tool_Checklist": {
            "Mandatory": ["Cup Plunger (平底馬桶拔)", "Slip Joint Pliers (水泵鉗)", "Bucket (接水桶)"],
            "Recommended": ["Drain Snake / Auger (管道疏通蛇管)", "Rubber Gloves (防護手套)"]
        },
        "Material_List": ["Soda Crystals (蘇打粉)", "White Vinegar (白醋)", "Heavy Duty Drain Unblocker (化學疏通劑)", "Replacement 40mm P-Trap Seals"],
        "Step_by_Step_Guide": [
            { text: "1. Empty standing water and block overflow with a damp cloth for vacuum.", highlight: "Microfibre Cloths" },
            { text: "2. Cover drain with plunger, apply rapid pressure.", highlight: "Heavy Duty Sink Plunger" },
            { text: "3. If failed, use soda crystals & vinegar, wait 30 min, then flush with hot water.", highlight: "Soda Crystals" },
            { text: "4. If still blocked, place bucket under sink and unscrew P-Trap.", highlight: "40mm P-Trap Replacement Seals" },
            { text: "5. Use drain snake for deep 40mm waste pipe cleaning.", highlight: "Flexible Drain Snake" }
        ],
        "Legal_and_Safety_Note": "⚠️ Building Regs Part H: Ensure water seal depth is sufficient. ⚠️ Asbestos: Potential asbestos in old stainless steel sink pads."
    },
    {
        "Project_ID": "BATH-002",
        "Category": "Kitchen/Bath",
        "Icon": <Droplet className="w-5 h-5" />,
        "Color": "#007AFF",
        "Project_Title": "Replace a Toilet Fill Valve: WRAS Standard",
        "Tool_Checklist": {
            "Mandatory": ["Adjustable Spanner", "Water Pump Pliers", "Sponge / Towel"],
            "Recommended": ["Hacksaw"]
        },
        "Material_List": ["Universal Fill Valve (WRAS)", "1/2\" BSP Fibre Washers", "PTFE Tape"],
        "Step_by_Step_Guide": [
            { text: "1. Turn off 15mm isolation valve.", highlight: "WD-40 Penetrating Oil" },
            { text: "2. Flush to empty cistern, sponge dry.", highlight: "Heavy Duty Absorbent Sponge" },
            { text: "3. Loosen 1/2\" BSP connector.", highlight: "15mm x 1/2\" Flexible Tap Connector" },
            { text: "4. Replace with WRAS-approved valve.", highlight: "Fluidmaster Fill Valve" },
            { text: "5. Reconnect and adjust float height.", highlight: "PTFE Tape" }
        ],
        "Legal_and_Safety_Note": "⚠️ Building Regs Part G: Flush volume max 6L. ⚠️ Asbestos: Old high-level cisterns may contain asbestos cement."
    },
    {
        "Project_ID": "BATH-003",
        "Category": "Kitchen/Bath",
        "Icon": <Droplet className="w-5 h-5" />,
        "Color": "#007AFF",
        "Project_Title": "How to Reseal a Bath: Perfect Silicone Guide",
        "Tool_Checklist": {
            "Mandatory": ["Silicone Removal Tool", "Cartridge Gun", "Profiling Tool"],
            "Recommended": ["Utility Knife"]
        },
        "Material_List": ["Anti-Mould Silicone", "Methylated Spirits", "Trade Wipes", "Soapy Water Spray"],
        "Step_by_Step_Guide": [
            { text: "1. Scrape off old mouldy silicone.", highlight: "Silicone Sealant Remover Tool" },
            { text: "2. Clean with methylated spirits.", highlight: "Methylated Spirits" },
            { text: "3. Fill bath with water to sink it to its lowest point.", highlight: "Crucial step to prevent future cracking" },
            { text: "4. Apply silicone with cartridge gun.", highlight: "Dow 785 Sanitary Silicone" },
            { text: "5. Smooth with profiling tool and soapy water.", highlight: "Cramer Silicone Profiling Kit" }
        ],
        "Legal_and_Safety_Note": "⚠️ Building Regs Part G: Ensure waterproof integrity. ⚠️ Asbestos: Old bath panels may contain asbestos."
    },
    {
        "Project_ID": "ELEC-001",
        "Category": "Electrical",
        "Icon": <Zap className="w-5 h-5" />,
        "Color": "#FFD60A",
        "Project_Title": "Replace a Ceiling Light Pendant Safely UK",
        "Tool_Checklist": {
            "Mandatory": ["VDE Screwdrivers", "Voltage Tester", "Wire Strippers"],
            "Recommended": ["Head Torch", "Step Ladder"]
        },
        "Material_List": ["Ceiling Pendant (UKCA)", "Wago 221 Connectors", "Brown PVC Sleeving"],
        "Step_by_Step_Guide": [
            { text: "1. Turn off Consumer Unit lighting circuit.", highlight: "Non-Contact Voltage Tester" },
            { text: "2. Photo the Loop-in wiring pattern.", highlight: "Wago 221 Lever Connectors" },
            { text: "3. Sleeve switched live wire with brown PVC.", highlight: "Brown PVC Sleeving" },
            { text: "4. Connect L, N, E to new terminal.", highlight: "Modern Ceiling Pendant Fitting" },
            { text: "5. Lock base and install LED bulb.", highlight: "LED B22/E27 Bulb" }
        ],
        "Legal_and_Safety_Note": "⚠️ Part P: DIY limited to like-for-like. No new circuits in bathrooms. ⚠️ Asbestos: Artex ceilings often contain asbestos."
    },
    {
        "Project_ID": "ELEC-002",
        "Category": "Electrical",
        "Icon": <Zap className="w-5 h-5" />,
        "Color": "#FFD60A",
        "Project_Title": "How to Change a Plug Socket Faceplate",
        "Tool_Checklist": {
            "Mandatory": ["VDE Screwdriver Set", "Socket Tester", "Wire Snips"],
            "Recommended": ["Pliers"]
        },
        "Material_List": ["13A Double USB Socket", "3.5mm Socket Screws", "Green/Yellow Sleeving"],
        "Step_by_Step_Guide": [
            { text: "1. Test socket then cut mains power.", highlight: "13A Socket Tester" },
            { text: "2. Unscrew 3.5mm faceplate screws.", highlight: "3.5mm Electrical Screws" },
            { text: "3. Check Ring Main wiring (L, N, E).", highlight: "Wire Strippers" },
            { text: "4. Port wires to new USB faceplate.", highlight: "13A Double USB-C Socket" },
            { text: "5. Ensure earth sleeve is on, then screw back.", highlight: "Socket Spacers" }
        ],
        "Legal_and_Safety_Note": "⚠️ Part P: Like-for-like allowed. No new spurs. ⚠️ Asbestos: Old backbox insulation pads."
    },
    {
        "Project_ID": "DECO-001",
        "Category": "Decoration",
        "Icon": <Home className="w-5 h-5" />,
        "Color": "#5856D6",
        "Project_Title": "Drill & Hang Heavy Objects on Plasterboard",
        "Tool_Checklist": {
            "Mandatory": ["Combi Drill", "Stud Detector", "Spirit Level", "Hammer"],
            "Recommended": ["SDS Drill"]
        },
        "Material_List": ["GripIt or Toggle Bolts", "Rawlplugs", "Screws"],
        "Step_by_Step_Guide": [
            { text: "1. Scan for cables and pipes using detector.", highlight: "Digital Cable & Pipe Detector" },
            { text: "2. Mark with level, identify wall type (Stud vs Solid).", highlight: "Laser Level" },
            { text: "3. For Brick: Use masonry bit and Rawlplugs.", highlight: "Fischer Wall Plugs" },
            { text: "4. For Plasterboard: Use Gripit fixings.", highlight: "GripIt Plasterboard Fixings" },
            { text: "5. Secure object and check resistance.", highlight: "Impact Driver" }
        ],
        "Legal_and_Safety_Note": "⚠️ Part A: Structural integrity of stud walls for heavy loads. ⚠️ Asbestos: Old insulation behind walls."
    },
    {
        "Project_ID": "WOOD-001",
        "Category": "Woodwork",
        "Icon": <Wrench className="w-5 h-5" />,
        "Color": "#AF52DE",
        "Project_Title": "How to Fix Squeaky Floorboards Permanently",
        "Tool_Checklist": {
            "Mandatory": ["Combi Drill", "Stud Finder", "Hammer"],
            "Recommended": ["Countersink Bit"]
        },
        "Material_List": ["Part-threaded Wood Screws", "Talcum Powder", "Wood Filler"],
        "Step_by_Step_Guide": [
            { text: "1. Minor noise: Apply talcum powder to gaps.", highlight: "Talcum/Graphite Powder" },
            { text: "2. Major noise: Detect joists, avoid pipes.", highlight: "Electronic Stud/Pipe Finder" },
            { text: "3. Drill pilot holes to prevent splitting.", highlight: "Wood Drill Bit Set" },
            { text: "4. Use part-threaded screws to pull board to joist.", highlight: "Spax Flooring Screws" },
            { text: "5. Fill holes and sand smooth.", highlight: "Tinted Wood Filler" }
        ],
        "Legal_and_Safety_Note": "⚠️ Safe Zones: Cable/pipe routes in joists. ⚠️ Asbestos: 9x9 vinyl tile glue often contains asbestos."
    }
];

// Reusable Components
const AppleCard = ({ children, onClick, className = "" }) => (
    <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`apple-card p-6 cursor-pointer ${className}`}
    >
        {children}
    </motion.div>
);

const SectionHeader = ({ icon, title, color }) => (
    <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15`, color: color }}>
            {icon}
        </div>
        <h3 className="text-sm font-bold tracking-tight text-apple-subtext uppercase">{title}</h3>
    </div>
);

export default function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [checkedItems, setCheckedItems] = useState({});

    const filteredProjects = PROJECTS_DATA.filter(p =>
        p.Project_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.Category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleCheck = (item) => {
        setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
    };

    return (
        <div className="min-h-screen pb-20 overflow-x-hidden">
            <AnimatePresence mode='wait'>
                {!selectedProject ? (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl mx-auto px-6 py-12"
                    >
                        {/* iOS Style Header */}
                        <header className="mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 mb-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-apple-accent animate-pulse" />
                                <span className="text- apple-accent font-bold text-xs tracking-widest uppercase">Live Guide 2026</span>
                            </motion.div>
                            <h1 className="text-5xl font-extrabold tracking-tight mb-4 font-display">
                                DIY Master.
                            </h1>
                            <p className="text-xl text-apple-subtext font-medium max-w-lg mb-8">
                                Professional UK Home Maintenance, simplified for everyone.
                            </p>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Search className="w-5 h-5 text-apple-subtext group-focus-within:text-apple-accent transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="What are you fixing today?"
                                    className="w-full h-16 bg-white border border-black/5 rounded-2xl pl-12 pr-6 text-lg focus:ring-4 focus:ring-apple-accent/10 focus:border-apple-accent outline-none transition-all shadow-sm"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </header>

                        {/* Quick Actions / Categories */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                            {['Electrical', 'Kitchen/Bath', 'Decoration', 'Woodwork'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSearchTerm(cat === searchTerm ? "" : cat)}
                                    className={`p-4 rounded-apple-lg border transition-all text-sm font-semibold flex flex-col items-center gap-2 ${searchTerm === cat ? 'bg-apple-accent text-white border-apple-accent shadow-lg shadow-apple-accent/20' : 'bg-white border-black/5 text-apple-text hover:bg-apple-bg'
                                        }`}
                                >
                                    <span className="opacity-80">{cat === 'Electrical' ? <Zap /> : cat === 'Kitchen/Bath' ? <Droplet /> : cat === 'Decoration' ? <Home /> : <Wrench />}</span>
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Project Feed */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 font-display flex items-center gap-2">
                                All Projects
                                <span className="text-apple-subtext text-base font-normal">({filteredProjects.length})</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredProjects.map((project, idx) => (
                                    <AppleCard
                                        key={project.Project_ID}
                                        onClick={() => setSelectedProject(project)}
                                        className="flex flex-col h-full bg-white border-black/5"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 rounded-2xl bg-apple-bg text-apple-accent">
                                                {project.Icon}
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-apple-bg text-[10px] font-bold tracking-widest text-apple-subtext border border-black/5 uppercase">
                                                {project.Category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold leading-tight mb-4 group-hover:text-apple-accent transition-colors line-clamp-2">
                                            {project.Project_Title}
                                        </h3>
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/5">
                                            <div className="flex items-center text-apple-subtext text-xs space-x-3">
                                                <span className="flex items-center gap-1 font-semibold"><Clock className="w-3 h-3" /> 30-60 min</span>
                                                <span className="flex items-center gap-1 font-semibold text-apple-warning"><Info className="w-3 h-3" /> Easy</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-apple-bg flex items-center justify-center text-apple-accent group-hover:bg-apple-accent group-hover:text-white transition-all">
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </AppleCard>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                ) : (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Dynamic Sticky Detail Navigation */}
                        <nav className="glass-nav px-6 py-4 flex justify-between items-center">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="flex items-center gap-2 font-bold text-apple-accent text-sm hover:opacity-70 transition-opacity"
                            >
                                <ChevronLeft className="w-5 h-5" /> Back
                            </button>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-widest text-apple-subtext font-bold">{selectedProject.Category}</span>
                                <span className="text-xs font-mono font-bold">{selectedProject.Project_ID}</span>
                            </div>
                            <div className="w-20" /> {/* Spacer */}
                        </nav>

                        <div className="px-6 py-12">
                            <header className="mb-12">
                                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-[1.1] font-display">
                                    {selectedProject.Project_Title}
                                </h2>

                                {/* Visual Metadata Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
                                        <span className="block text-xs font-bold text-apple-subtext uppercase tracking-wider mb-1">Time</span>
                                        <span className="text-lg font-bold">1 Hour</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
                                        <span className="block text-xs font-bold text-apple-subtext uppercase tracking-wider mb-1">Cost</span>
                                        <span className="text-lg font-bold">£5 - £20</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
                                        <span className="block text-xs font-bold text-apple-subtext uppercase tracking-wider mb-1">Difficulty</span>
                                        <span className="text-lg font-bold text-apple-success">Standard</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
                                        <span className="block text-xs font-bold text-apple-subtext uppercase tracking-wider mb-1">Safety</span>
                                        <span className="text-lg font-bold text-apple-warning">High</span>
                                    </div>
                                </div>

                                {/* Safety Warning - Enhanced */}
                                <div className="bg-apple-danger/5 border border-apple-danger/10 p-6 rounded-apple shadow-sm">
                                    <div className="flex items-center gap-3 text-apple-danger font-bold mb-3">
                                        <ShieldAlert className="w-6 h-6" />
                                        <span className="uppercase tracking-widest text-sm">Vital Safety Information</span>
                                    </div>
                                    <p className="text-[#3A3A3C] leading-relaxed font-medium">
                                        {selectedProject.Legal_and_Safety_Note}
                                    </p>
                                </div>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-8">
                                    <section>
                                        <SectionHeader icon={<CheckCircle className="w-5 h-5" />} title="Step by Step Walkthrough" color="#34C759" />
                                        <div className="space-y-6">
                                            {selectedProject.Step_by_Step_Guide.map((step, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="apple-card p-6 !rounded-3xl border-black/5 relative overflow-hidden"
                                                >
                                                    <div className="flex gap-4">
                                                        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-apple-accent text-white font-black flex items-center justify-center text-sm">
                                                            {idx + 1}
                                                        </span>
                                                        <div className="flex-grow pt-1">
                                                            <p className="text-lg font-medium leading-relaxed mb-4">{step.text}</p>
                                                            {step.highlight && (
                                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-apple-bg rounded-lg border border-black/5 text-xs font-bold text-apple-accent">
                                                                    <ShoppingCart className="w-3.5 h-3.5" />
                                                                    Pro Tip: Buy {step.highlight}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-10">
                                    <section>
                                        <SectionHeader icon={<Wrench className="w-5 h-5" />} title="Inventory List" color="#8E8E93" />
                                        <div className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm">
                                            {[...selectedProject.Tool_Checklist.Mandatory, ...selectedProject.Material_List].map((item, idx) => (
                                                <div
                                                    key={item}
                                                    className={`flex items-center justify-between p-4 group ${idx !== 0 ? 'border-t border-black/5' : ''}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            className="w-5 h-5 rounded-full accent-apple-accent cursor-pointer"
                                                            onChange={() => toggleCheck(item)}
                                                            checked={checkedItems[item]}
                                                        />
                                                        <span className={`text-sm font-semibold transition-all ${checkedItems[item] ? 'line-through text-apple-subtext opacity-50' : 'text-apple-text'}`}>
                                                            {item}
                                                        </span>
                                                    </div>
                                                    <a
                                                        href={`https://www.amazon.co.uk/s?k=${encodeURIComponent(item + " UK DIY")}`}
                                                        target="_blank"
                                                        className="p-2 rounded-full text-apple-subtext hover:bg-apple-accent hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="bg-apple-accent p-8 rounded-3xl text-white shadow-xl shadow-apple-accent/20 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                            <AlertTriangle className="w-24 h-24" />
                                        </div>
                                        <h4 className="text-xl font-black mb-4 uppercase tracking-tighter">Emergency Protocol</h4>
                                        <p className="text-white/80 text-sm leading-relaxed mb-6 font-medium">
                                            If something goes wrong or you hit a major leak, follow our emergency SOS plan immediately.
                                        </p>
                                        <button className="w-full py-4 bg-white text-apple-accent rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-opacity-90 active:scale-95 transition-all">
                                            SOS Emergency Guide
                                        </button>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SOS Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 w-16 h-16 bg-apple-danger text-white rounded-full shadow-2xl flex items-center justify-center z-[200] group"
            >
                <AlertTriangle className="w-7 h-7" />
                <span className="absolute right-20 bg-apple-danger text-white px-4 py-2 rounded-xl text-xs font-black tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                    EMERGENCY SOS
                </span>
            </motion.button>
        </div>
    );
}
