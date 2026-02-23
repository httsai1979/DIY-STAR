import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    ChevronRight,
    ChevronLeft,
    AlertTriangle,
    ShoppingCart,
    CheckCircle,
    Clock,
    ShieldAlert,
    Wrench,
    Activity,
    Zap,
    Droplet,
    ExternalLink,
    Info,
    Package,
    X,
    Hammer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Global Data Section ---

const SPECS_DICTIONARY = [
    { term: "1/2\" BSP", translation: "面盆/廚房水龍頭軟管標準接口", note: "實際外徑約 21mm。買軟管中心孔通常為此規格。" },
    { term: "15mm / 22mm", translation: "銅管/塑膠水管標準直徑", note: "15mm 用於冷熱供水與馬桶；22mm 用於中央供暖主幹管。" },
    { term: "WRAS Approved", translation: "英國水法規認證", note: "保險理賠必備。確保產品符合英國飲用水安全標準。" },
    { term: "P-Trap", translation: "U型/P型存水彎", note: "廚房標準 40mm，面盆 32mm。防止下水道異味進入室內。" },
    { term: "BS 1363", translation: "英規三插腳安全標準", note: "所有英國零售插座面板必須符合此安全規範。" },
    { term: "Part P", translation: "英國電力安全建築法規", note: "規定哪些電力工程必須由認證電工操作或報備 Council。" },
    { term: "UC4", translation: "木材防腐等級 (觸地級)", note: "花園圍欄柱必須使用 UC4 等級，否則埋入土中幾年即腐爛。" }
];

const RAW_PROJECTS = [
    {
        "Project_ID": "BATH-001",
        "Category": "Plumbing",
        "Project_Title": "Fix a Leaky Tap: Washer Replacement",
        "Tool_Checklist": { "Mandatory": ["Adjustable Spanner", "Screwdriver Set"], "Recommended": ["WD-40"] },
        "Material_List": ["1/2\" Tap Washers", "PTFE Tape"],
        "Step_by_Step_Guide": [
            "Turn off isolation valve or main stopcock.",
            "Remove tap handle and unscrew the headgear nut.",
            "Remove old washer and replace with a size-matched one.",
            "Reassemble and test for leaks."
        ],
        "Legal_and_Safety_Note": "⚠️ WRAS Approved: Always use certified kits. ⚠️ Ensure water is fully drained before opening tap inner works.",
        "optimization_pack": {
            "Procurement_Drill_down": { "Target_Material": "PTFE Tape & Flexible Tails", "Exact_SKU": "BS 7786 Standard PTFE Tape / 15mm Tails" },
            "Sunday_Deadline_Expansion": { "Latest_Start_Time": "12:00 PM", "Deadline_Warning": "週日中午 12 點前未開工請停手！若拆壞舊水管，下午 2 點後你將沒有足夠時間趕到 B&Q 買替換隔離閥，今晚將無水可用。" }
        }
    },
    {
        "Project_ID": "KITCH-002",
        "Category": "Plumbing",
        "Project_Title": "How to Unblock a Sink: Fast UK Plumbing Fixes",
        "Tool_Checklist": { "Mandatory": ["Cup Plunger", "Slip Joint Pliers", "Bucket"], "Recommended": ["Drain Snake"] },
        "Material_List": ["Soda Crystals", "White Vinegar", "40mm P-Trap Seals"],
        "Step_by_Step_Guide": [
            "Emply standing water and block overflow.",
            "Use plunger with rapid pressure.",
            "If failed, use Soda Crystals & Vinegar.",
            "If still blocked, disassemble P-Trap with bucket ready.",
            "Clean waste pipe with drain snake."
        ],
        "Legal_and_Safety_Note": "⚠️ Building Regs Part H: Water seal depth. ⚠️ Asbestos: Old stainless steel sink pads (pre-1999).",
        "optimization_pack": {
            "Procurement_Drill_down": { "Target_Material": "Drain Snake & 40mm P-Trap", "Exact_SKU": "Flexible Drain Snake / 40mm P-Trap Seals" },
            "Sunday_Deadline_Expansion": { "Latest_Start_Time": "13:00 PM", "Deadline_Warning": "週日下午 1 點是最後底線！若拆下 P-Trap 後發現膠圈老化漏水，你必須在下午 4 點前衝到 Plumbase 買替換墊圈，否則廚房將癱瘓。" }
        }
    },
    {
        "Project_ID": "BATH-002",
        "Category": "Plumbing",
        "Project_Title": "Replace a Toilet Fill Valve: WRAS Standard",
        "Tool_Checklist": { "Mandatory": ["Adjustable Spanner", "Water Pump Pliers"], "Recommended": ["Hacksaw"] },
        "Material_List": ["Fluidmaster Fill Valve (WRAS)", "1/2\" BSP Fibre Washers", "PTFE Tape"],
        "Step_by_Step_Guide": [
            "Turn off 15mm isolation valve.",
            "Flush and sponge dry cistern.",
            "Unscrew old valve from cistern base.",
            "Install new WRAS-approved valve.",
            "Reconnect and adjust float height."
        ],
        "Legal_and_Safety_Note": "⚠️ Building Regs Part G: 6L max flush. ⚠️ Asbestos: Old black high-level cisterns.",
        "optimization_pack": {
            "Procurement_Drill_down": { "Target_Material": "Fill Valve & Connector", "Exact_SKU": "Fluidmaster Fill Valve / 15mm x 1/2\" Connector" },
            "Sunday_Deadline_Expansion": { "Latest_Start_Time": "12:30 PM", "Deadline_Warning": "下午 12:30 前未動工請改天！若舊的塑膠螺帽滑牙必須切斷，你需要在 4 點前去買一把 Hacksaw (鋼鋸)。" }
        }
    },
    {
        "Project_ID": "ELEC-002",
        "Category": "Electrical",
        "Project_Title": "How to Change a Plug Socket Faceplate",
        "Tool_Checklist": { "Mandatory": ["VDE Screwdriver Set", "Socket Tester"], "Recommended": ["Wire Strippers"] },
        "Material_List": ["13A Double USB Socket", "3.5mm Socket Screws", "Yellow/Green Sleeving"],
        "Step_by_Step_Guide": [
            "Use tester to confirm live, then cut power at CU.",
            "Unscrew faceplate and pull out slowly.",
            "Observe Ring Main (usually 2 wires per terminal).",
            "Connect L, N, E to new faceplate.",
            "Check earth sleeving and screw back."
        ],
        "Legal_and_Safety_Note": "⚠️ Part P: Like-for-like swaps only. Use BS 1363 sockets. ⚠️ Asbestos: Old backbox insulation pads.",
        "optimization_pack": {
            "Procurement_Drill_down": { "Target_Material": "13A USB Socket & Tester", "Exact_SKU": "13A Double USB Socket (BS 1363) / 13A Tester" },
            "Sunday_Deadline_Expansion": { "Latest_Start_Time": "13:00 PM", "Deadline_Warning": "下午 1 點前開工。若發現舊暗盒太淺，需購買 Socket Spacers (墊片)，下午 2 點出門跑店還來得及。" }
        }
    },
    {
        "Project_ID": "DECO-001",
        "Category": "Decoration",
        "Project_Title": "Drill & Hang Heavy Objects on Plasterboard",
        "Tool_Checklist": { "Mandatory": ["Combi Drill", "Stud Detector", "Spirit Level"], "Recommended": ["Impact Driver"] },
        "Material_List": ["GripIt Fixings", "Screws", "Rawlplugs"],
        "Step_by_Step_Guide": [
            "Scan wall for cables/pipes (Safe Zones).",
            "Identify Studs vs Hollow space.",
            "Use GripIt flat bit for hollow plasterboard.",
            "Hammer in GripIt and turn locking wings.",
            "Screw in item securely."
        ],
        "Legal_and_Safety_Note": "⚠️ Part A: Structural integrity of stud walls. ⚠️ Asbestos: Insulating boards or older plasters.",
        "optimization_pack": {
            "Procurement_Drill_down": { "Target_Material": "Wall Anchors & Detector", "Exact_SKU": "GripIt Plasterboard Fixings / Stud Detector" },
            "Sunday_Deadline_Expansion": { "Latest_Start_Time": "12:30 PM", "Deadline_Warning": "最晚 12:30 鑽第一個孔。若不幸鑽到極硬的工程磚 (Engineering brick)，你需要立刻去買 SDS 水泥鑽頭。" }
        }
    }
    // Simplified for logic demo - in production this would contain all 20
];

const PROJECTS_DATA = RAW_PROJECTS; // In full build, merge logic here

// --- Logic Components ---

const SundayWatch = ({ warningMessage, startTime }) => {
    const [isSundayAlert, setIsSundayAlert] = useState(false);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000);
        const isSunday = now.getDay() === 0;
        const isAfterTwo = now.getHours() >= 14;
        setIsSundayAlert(isSunday && isAfterTwo);
        return () => clearInterval(timer);
    }, [now]);

    if (!isSundayAlert) return null;

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="bg-red-600 hazard-border p-[3px] border-b-4 border-yellow-400 mb-8"
        >
            <div className="bg-red-600 text-yellow-400 p-4 font-black flex items-center justify-between animate-emergency">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 fill-yellow-400 text-red-600" />
                    <div className="leading-tight">
                        <h4 className="text-xl uppercase tracking-tighter">Sunday Deadline Warning</h4>
                        <p className="text-xs text-white max-w-lg">{warningMessage}</p>
                    </div>
                </div>
                <div className="text-right hidden sm:block">
                    <div className="text-3xl font-black italic">14:00+</div>
                    <div className="text-[10px] uppercase">Shops Closing Soon</div>
                </div>
            </div>
        </motion.div>
    );
};

const SpecsModal = ({ isOpen, onClose }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-zinc-900 border-4 border-yellow-400 overflow-hidden"
                >
                    <div className="bg-yellow-400 p-4 text-black flex justify-between items-center">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter">UK Construction Dictionary</h3>
                        <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-full transition-colors"><X /></button>
                    </div>
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        <div className="grid gap-4">
                            {SPECS_DICTIONARY.map((item, idx) => (
                                <div key={idx} className="bg-zinc-800 p-4 border-l-4 border-yellow-400">
                                    <div className="text-yellow-400 font-black text-xl mb-1">{item.term}</div>
                                    <div className="font-bold text-white mb-2">{item.translation}</div>
                                    <p className="text-sm text-zinc-400 leading-relaxed italic">Expert Note: {item.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 bg-zinc-950 border-t border-zinc-800 text-center">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-zinc-800 text-white font-black hover:bg-zinc-700 transition-all uppercase"
                        >
                            Close Manual
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [checkedMaterials, setCheckedMaterials] = useState({});
    const [completedSteps, setCompletedSteps] = useState({});
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);

    // Derived Values
    const filteredProjects = useMemo(() => {
        return PROJECTS_DATA.filter(p =>
            p.Project_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.Category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const progress = useMemo(() => {
        if (!selectedProject) return 0;
        const total = selectedProject.Step_by_Step_Guide.length;
        const done = Object.keys(completedSteps).filter(k => k.startsWith(selectedProject.Project_ID)).length;
        return Math.round((done / total) * 100);
    }, [selectedProject, completedSteps]);

    const toggleStep = (idx) => {
        const key = `${selectedProject.Project_ID}-${idx}`;
        setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleMaterial = (item) => {
        setCheckedMaterials(prev => ({ ...prev, [item]: !prev[item] }));
    };

    return (
        <div className="min-h-screen pb-20 selection:bg-yellow-400 selection:text-black">
            <SpecsModal isOpen={isSpecsOpen} onClose={() => setIsSpecsOpen(false)} />

            {!selectedProject ? (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="max-w-6xl mx-auto px-6 py-12"
                >
                    {/* Dashboard Header */}
                    <header className="mb-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-5 w-5 bg-yellow-400 rounded-sm" />
                                    <span className="text-yellow-400 font-black tracking-widest text-xs uppercase">Safety First Edition</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-4">
                                    UK DIY <br /><span className="text-yellow-400">SURVIVAL</span>
                                </h1>
                                <p className="text-zinc-500 font-bold max-w-md uppercase text-sm border-l-4 border-zinc-800 pl-4 py-1">
                                    Avoid Sunday Afternoon Disasters. <br />
                                    Get The Specs Right. Fix it Once.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsSpecsOpen(true)}
                                    className="industrial-btn btn-outline h-fit"
                                >
                                    <Info className="w-5 h-5" /> Check Specs
                                </button>
                            </div>
                        </div>

                        <div className="mt-12 group relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-yellow-400 transition-colors" />
                            <input
                                className="input-field pl-16 py-6 text-2xl h-20 shadow-2xl"
                                placeholder="SEARCH PROJECT OR CATEGORY..."
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </header>

                    {/* Project List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.Project_ID}
                                layoutId={project.Project_ID}
                                onClick={() => setSelectedProject(project)}
                                className="safety-card p-6 flex flex-col justify-between group cursor-pointer"
                            >
                                <div className="mb-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="tag-label text-yellow-500 border-yellow-500/30">{project.Category}</span>
                                            <span className="text-[10px] font-mono font-bold text-zinc-600 mt-1">{project.Project_ID}</span>
                                        </div>
                                        <div className="bg-zinc-800 p-2 border border-zinc-700">
                                            {project.Category === 'Electrical' ? <Zap className="w-5 h-5 text-yellow-400" /> : <Droplet className="w-5 h-5 text-blue-400" />}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-yellow-400 transition-colors">
                                        {project.Project_Title}
                                    </h3>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t-2 border-zinc-800">
                                    <div className="flex items-center gap-2 text-zinc-500 font-black text-[10px] uppercase">
                                        <Activity className="w-3 h-3" /> Certified Guide
                                    </div>
                                    <div className="h-10 w-10 bg-yellow-400 text-black flex items-center justify-center -mr-2 transition-transform group-hover:translate-x-1">
                                        <ChevronRight />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                    className="min-h-screen bg-black"
                >
                    {/* Project Detail View */}
                    <SundayWatch
                        warningMessage={selectedProject.optimization_pack.Sunday_Deadline_Expansion.Deadline_Warning}
                        startTime={selectedProject.optimization_pack.Sunday_Deadline_Expansion.Latest_Start_Time}
                    />

                    <nav className="p-4 border-b-2 border-zinc-800 flex justify-between items-center bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
                        <button
                            onClick={() => { setSelectedProject(null); window.scrollTo(0, 0) }}
                            className="industrial-btn py-2 px-4 bg-zinc-800 text-white font-black text-sm uppercase flex items-center gap-2"
                        >
                            <ChevronLeft /> Back to HQ
                        </button>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Progress</span>
                            <div className="w-32 h-2 bg-zinc-900 overflow-hidden border border-zinc-800">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-yellow-400"
                                />
                            </div>
                            <span className="font-mono text-yellow-400 font-bold text-xs">{progress}%</span>
                        </div>
                    </nav>

                    <main className="max-w-6xl mx-auto p-6 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Left Column: Core Info */}
                            <div className="lg:col-span-12">
                                <div className="flex flex-col gap-4 mb-12">
                                    <div className="flex items-center gap-4">
                                        <span className="text-yellow-400 font-black px-3 py-1 bg-yellow-400/10 border-2 border-yellow-400/20 text-xs uppercase italic">ID: {selectedProject.Project_ID}</span>
                                        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{selectedProject.Project_Title}</h2>
                                    </div>
                                    <div className="bg-zinc-900 border-2 border-red-600/30 p-6 flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <ShieldAlert className="w-12 h-12 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-red-500 font-black uppercase text-sm mb-1 tracking-widest">Site Safety & Legal Requirements</h4>
                                            <p className="text-zinc-300 font-medium leading-relaxed">{selectedProject.Legal_and_Safety_Note}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Workflow Column */}
                            <div className="lg:col-span-8 space-y-12">
                                <section>
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-3xl font-black uppercase italic flex items-center gap-3">
                                            <Hammer className="text-yellow-400" /> Construction Steps
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {selectedProject.Step_by_Step_Guide.map((step, idx) => {
                                            const isDone = completedSteps[`${selectedProject.Project_ID}-${idx}`];
                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() => toggleStep(idx)}
                                                    className={`group relative p-8 cursor-pointer transition-all border-2 flex items-start gap-6 ${isDone ? 'bg-zinc-900 border-zinc-800 opacity-50' : 'bg-black border-zinc-800 hover:border-yellow-400'}`}
                                                >
                                                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center font-black italic text-xl border-2 transition-colors ${isDone ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-transparent border-zinc-700 text-zinc-500 group-hover:border-yellow-400 group-hover:text-yellow-400'}`}>
                                                        {isDone ? <CheckCircle /> : idx + 1}
                                                    </div>
                                                    <p className={`text-xl font-bold leading-snug pt-1 ${isDone ? 'line-through text-zinc-600 text-lg' : 'text-zinc-100'}`}>
                                                        {step}
                                                    </p>
                                                    {/* Indicator for unread/active */}
                                                    {!isDone && <motion.div layoutId="activeStep" className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400" />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar: Shopping & Specs */}
                            <div className="lg:col-span-4 space-y-10">
                                <section className="bg-zinc-900 p-8 border-2 border-zinc-800">
                                    <h4 className="text-xl font-black uppercase italic flex items-center gap-2 mb-6 border-b-2 border-zinc-800 pb-4">
                                        <Package className="text-yellow-400" /> Procurement List
                                    </h4>
                                    <div className="space-y-6">
                                        {selectedProject.Material_List.map((item, idx) => (
                                            <div key={idx} className="flex flex-col gap-3">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 accent-yellow-400 rounded-none bg-black border-2 border-zinc-700"
                                                        checked={checkedMaterials[item]}
                                                        onChange={() => toggleMaterial(item)}
                                                    />
                                                    <span className={`font-bold transition-all ${checkedMaterials[item] ? 'line-through text-zinc-600' : 'text-white'}`}>{item}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <a
                                                        href={`https://www.amazon.co.uk/s?k=${encodeURIComponent(item + " UK DIY")}`}
                                                        target="_blank"
                                                        className="text-center py-2 bg-black border border-zinc-800 text-[10px] font-black uppercase text-zinc-400 hover:text-yellow-400 hover:border-yellow-400 transition-all flex items-center justify-center gap-1"
                                                    >
                                                        Amazon <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                    <a
                                                        href={`https://www.screwfix.com/search?q=${encodeURIComponent(item)}`}
                                                        target="_blank"
                                                        className="text-center py-2 bg-black border border-zinc-800 text-[10px] font-black uppercase text-zinc-400 hover:text-yellow-400 hover:border-yellow-400 transition-all flex items-center justify-center gap-1"
                                                    >
                                                        Screwfix <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="bg-yellow-400 p-8 border-2 border-yellow-500 shadow-2xl">
                                    <h4 className="text-black font-black uppercase text-xl mb-4 italic leading-tight">Emergency Protocol?</h4>
                                    <p className="text-black/80 font-bold text-sm mb-6 uppercase tracking-tighter">If you hit a gas pipe or major electrical fault, abandon project immediately.</p>
                                    <button
                                        onClick={() => alert("EMERGENCY: Call 999 for fire/gas or 105 for power cut. Shut off your main valve NOW.")}
                                        className="w-full bg-black text-white font-black py-4 uppercase flex items-center justify-center gap-2 hover:bg-zinc-900 transition-all shadow-xl"
                                    >
                                        <ShieldAlert /> SOS EMERGENCY
                                    </button>
                                </section>

                                <div className="bg-zinc-800 p-6 border-l-4 border-yellow-400">
                                    <h5 className="text-yellow-400 font-black text-xs uppercase mb-2">UK Specs Helper</h5>
                                    <p className="text-zinc-400 text-xs font-bold leading-relaxed mb-4">Unsure about 1/2" BSP vs 15mm? Open the construction dictionary.</p>
                                    <button
                                        onClick={() => setIsSpecsOpen(true)}
                                        className="w-full py-2 border border-zinc-600 text-[10px] font-black uppercase text-zinc-300 hover:bg-zinc-700"
                                    >
                                        Open Dictionary
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </motion.div>
            )}
        </div>
    );
}
