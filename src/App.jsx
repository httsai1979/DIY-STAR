import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    ChevronRight,
    ChevronLeft,
    AlertTriangle,
    ShoppingCart,
    Clock,
    ShieldAlert,
    Volume2,
    VolumeX,
    Package,
    HelpCircle,
    ExternalLink,
    Hammer,
    Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS_DATA = [
    {
        "project_name": "更換水龍頭",
        "coin_test": "拿 10p 硬幣比對水管，一樣寬是 15mm (1/2吋)，比 10p 硬幣寬一圈大約是 22mm (3/4吋)。",
        "sound_diagnosis": "用扳手輕敲舊螺帽，聲音清脆代表未生鏽死，聲音悶沉代表已嚴重鈣化卡死。",
        "sunday_disaster_clock": "12:00",
        "point_of_no_return": "一旦拆下舊水龍頭的進水軟管，買錯規格或裝不回去，你今晚就沒水洗手、洗臉。",
        "shopping_logic": {
            "target_material": "Basin Mixer Tap & Flexible Tails",
            "exact_specs": "WRAS Approved, 15mm x 1/2\" BSP",
            "store_slug": "monobloc+tap+15mm+flexible+tails"
        }
    },
    {
        "project_name": "疏通水槽",
        "coin_test": "用 2p 硬幣比對排水管管徑，比 2p 硬幣大一圈通常是 40mm (廚房標準廢水管)。",
        "sound_diagnosis": "敲擊水槽下方的 U 型管 (P-Trap)，聲音空洞表示水已排空，聲音悶實表示裡面塞滿油垢和水。",
        "sunday_disaster_clock": "13:00",
        "point_of_no_return": "一旦轉開 U 型管 (P-Trap) 且發現膠圈老化碎裂，沒買到替換膠圈你的廚房就準備淹水。",
        "shopping_logic": {
            "target_material": "Drain Snake & 40mm P-Trap Seals",
            "exact_specs": "40mm tubular P-trap, flexible drain auger",
            "store_slug": "40mm+p+trap+drain+snake"
        }
    },
    {
        "project_name": "修馬桶進水閥",
        "coin_test": "拿 10p 硬幣比對馬桶底部的進水軟管，通常是一樣寬的 15mm。",
        "sound_diagnosis": "沖水後聽水箱聲音，若有持續的『嘶嘶』漏氣或流水聲，代表進水閥止水橡皮已老化失效。",
        "sunday_disaster_clock": "12:30",
        "point_of_no_return": "一旦鋸開卡死的塑膠進水螺帽，裝不上新閥門，你家馬桶今晚就無法沖水。",
        "shopping_logic": {
            "target_material": "Toilet Fill Valve",
            "exact_specs": "WRAS approved bottom/side entry 1/2\" BSP",
            "store_slug": "fluidmaster+bottom+entry+valve"
        }
    },
    {
        "project_name": "填補矽膠",
        "coin_test": "用 1p 硬幣測試縫隙，若縫隙寬度能塞入硬幣，打矽利康時需確保深度足夠填滿。",
        "sound_diagnosis": "輕敲浴缸邊緣，若發出中空的『咚咚』聲且有晃動感，需先加固浴缸底部再打膠，否則踩進去膠必裂。",
        "sunday_disaster_clock": "12:00",
        "point_of_no_return": "一旦徹底刮除舊有發霉矽利康，若沒買到防霉型新矽利康補上，洗澡水會直接流到樓下天花板。",
        "shopping_logic": {
            "target_material": "Sanitary Silicone & Profiling Tool",
            "exact_specs": "Dow 785 / Anti-mould sanitary silicone, Cramer tool",
            "store_slug": "dow+785+sanitary+silicone"
        }
    },
    {
        "project_name": "更換燈具",
        "coin_test": "檢查天花板舊孔洞，若大於 2p 硬幣，新燈具底座需大於此尺寸才能完美遮醜。",
        "sound_diagnosis": "敲擊天花板，敲起來像打鼓是空心石膏板（需用膨脹釘），敲起來像石頭是實木樑（可直接鎖木螺絲）。",
        "sunday_disaster_clock": "12:30",
        "point_of_no_return": "一旦拆開舊燈座的 Loop-in 複雜接線且忘記拍照，你將無法分出哪根是開關火線，全家今晚摸黑。",
        "shopping_logic": {
            "target_material": "Wago Connectors & PVC Sleeving",
            "exact_specs": "Wago 221 lever connectors, Brown PVC sleeving BS 7671",
            "store_slug": "wago+221+lever+connectors"
        }
    },
    {
        "project_name": "更換插座面板",
        "coin_test": "拿 1p 硬幣測量牆內暗盒深度，若深度比硬幣直徑(20mm)淺，換帶 USB 的厚面板會塞不進去，需買墊片。",
        "sound_diagnosis": "輕敲舊插座面板，若感覺鬆動且有沙沙聲，代表牆內暗盒(Back box)螺絲孔可能已崩牙或碎裂。",
        "sunday_disaster_clock": "13:00",
        "point_of_no_return": "一旦剪斷過短的舊銅線，若沒準備 Wago 端子延長接線，插座將永遠接不上，該迴路報廢。",
        "shopping_logic": {
            "target_material": "13A USB Socket & Socket Tester",
            "exact_specs": "13A Double Socket BS 1363, 13A mains tester",
            "store_slug": "13a+double+socket+usb"
        }
    },
    {
        "project_name": "更換門鈴",
        "coin_test": "用 5p 硬幣確認牆外鑽孔，若孔徑與 5p 差不多大 (約 6mm) 最適合塞入標準紅色壁拔。",
        "sound_diagnosis": "輕敲門框，敲起來像打鼓是空心木框（直接鑽），敲起來像石頭是實心磚（需用水泥鑽頭與震動模式）。",
        "sunday_disaster_clock": "12:00",
        "point_of_no_return": "一旦剪斷舊變壓器接線，才發現買的智能門鈴需要 24V 而舊的是 8V，今晚訪客只能用手敲門。",
        "shopping_logic": {
            "target_material": "24V Transformer",
            "exact_specs": "8-24V AC DIN Rail Transformer",
            "store_slug": "bell+transformer+24v"
        }
    },
    {
        "project_name": "測試報警器",
        "coin_test": "用 20p 硬幣撬開舊警報器電池蓋，若發現製造年份已超過 10 年，換電池無效，必須整機更換。",
        "sound_diagnosis": "長按測試鍵，若發出微弱『嗶』聲而非刺耳警報，代表感測器老化或電池耗盡。",
        "sunday_disaster_clock": "13:00",
        "point_of_no_return": "一旦拆下市電(Mains)型警報器且底座不相容，沒買替換接線端子，全戶連動防火警報將全部失效。",
        "shopping_logic": {
            "target_material": "Mains Smoke Alarm",
            "exact_specs": "Mains Powered Smoke/Heat Alarm BS EN 14604",
            "store_slug": "mains+smoke+alarm"
        }
    },
    {
        "project_name": "修補裂縫",
        "coin_test": "若裂縫能塞入 1p 硬幣 (厚度約 1.5mm)，必須先將縫隙刻成 V 型再填補，否則補土吃不住。",
        "sound_diagnosis": "敲擊裂縫周圍，敲起來像打鼓（空鼓）代表底層灰泥已脫離木條，需整塊敲掉重補。",
        "sunday_disaster_clock": "11:00",
        "point_of_no_return": "一旦將鬆動的舊石膏大塊敲下，若沒買足夠的快乾修補粉 (Patching plaster)，牆面將留下巨大坑洞。",
        "shopping_logic": {
            "target_material": "Wall Filler & Decorator's Caulk",
            "exact_specs": "Ready-mixed interior filler, Flexible Caulk",
            "store_slug": "ready+mixed+wall+filler"
        }
    },
    {
        "project_name": "鑽孔掛重物",
        "coin_test": "拿 10p 硬幣比對 GripIt 膨脹螺絲的鑽孔要求，孔徑通常需要極大(15-25mm)，遠大於硬幣。",
        "sound_diagnosis": "敲牆壁，敲起來像打鼓是空心石膏板（必須用GripIt蝴蝶釘），敲起來像石頭是實心磚牆（需用紅色壁拔）。",
        "sunday_disaster_clock": "12:30",
        "point_of_no_return": "一旦鑽穿牆壁看見金屬屑或冒水（鑽到管線 Safe Zones），沒買管線探測儀的你將面臨數千鎊的水電維修費。",
        "shopping_logic": {
            "target_material": "GripIt Fixings & Stud Detector",
            "exact_specs": "GripIt Plasterboard Fixings (Max 100kg), Digital Pipe/Cable Detector",
            "store_slug": "gripit+plasterboard+fixings"
        }
    },
    {
        "project_name": "粉刷牆面",
        "coin_test": "用 2p 硬幣刮牆角舊漆，若如雪片般輕易掉落，代表未清潔油污，必須徹底打磨洗淨才能上新漆。",
        "sound_diagnosis": "滾筒刷過牆面若發出『撕裂或黏稠』聲，代表漆太濃或牆面吸水太快，需加水或上底漆(Primer)。",
        "sunday_disaster_clock": "10:00",
        "point_of_no_return": "一旦開始大面積刷色，發現遮蓋力不足且漆不夠，下午買不到同批號 (Batch number) 的漆，牆面將有嚴重色差。",
        "shopping_logic": {
            "target_material": "FrogTape & Sugar Soap",
            "exact_specs": "FrogTape Painters Tape, Sugar Soap liquid",
            "store_slug": "frogtape+painters+tape"
        }
    },
    {
        "project_name": "貼壁紙",
        "coin_test": "將 1p 硬幣壓在接縫處，若能輕易塞入，代表壁紙嚴重收縮，黏膠塗抹不均或未泡水軟化足夠時間。",
        "sound_diagnosis": "用手掌輕拍貼好的壁紙，若有『啪啪』空心聲，代表裡面有大氣泡，需挑破重新注膠壓平。",
        "sunday_disaster_clock": "10:00",
        "point_of_no_return": "一旦切開插座周圍的壁紙，才發現沒切斷總電源，將面臨極大的觸電危險 (違反 Part P 規範)。",
        "shopping_logic": {
            "target_material": "Wallpaper Paste & Wall Size",
            "exact_specs": "Solvite ready-mixed wallpaper paste, Wall size/primer",
            "store_slug": "ready+mixed+wallpaper+paste"
        }
    },
    {
        "project_name": "鋪地板",
        "coin_test": "在地板與牆壁間塞入兩個 10p 硬幣疊加的厚度（約 4mm），若塞不進，代表膨脹縫預留不足（英國標準需 10mm）。",
        "sound_diagnosis": "拿硬物敲擊底層混凝土，若聲音沉悶且測出濕氣，必須鋪設 1000-Gauge 防潮布 (DPM)，否則地板必發霉起拱。",
        "sunday_disaster_clock": "08:00",
        "point_of_no_return": "一旦切錯門框底部的形狀且木板卡死，沒買多功能切鋸機 (Multi-tool) 幫忙平切門框，你將無法收尾。",
        "shopping_logic": {
            "target_material": "Laminate Kit & DPM",
            "exact_specs": "Laminate installation kit (spacers/pull bar), 1000-Gauge Polythene DPM",
            "store_slug": "laminate+fitting+kit"
        }
    },
    {
        "project_name": "地板去響",
        "coin_test": "將 10p 硬幣立起插入木板縫隙，若能輕易滑動，可先灑入滑石粉潤滑摩擦面作為最快速的解法。",
        "sound_diagnosis": "人在上面走動，發出尖銳『吱吱』聲是木板互摩；發出低沉『嘎吱』聲是木板與底部托樑鬆動。",
        "sunday_disaster_clock": "12:00",
        "point_of_no_return": "盲目用長螺絲鎖入木板，一旦打穿下方 Safe Zones 的水管或電線，將引發淹水或火災危機。",
        "shopping_logic": {
            "target_material": "Flooring Screws & Stud Finder",
            "exact_specs": "Spax partial-threaded flooring screws, Electronic stud finder",
            "store_slug": "spax+flooring+screws"
        }
    },
    {
        "project_name": "換門把手",
        "coin_test": "拿 10p 硬幣比對門閂方孔，標準英規轉軸 (Spindle) 通常為 8mm，比硬幣直徑小很多。",
        "sound_diagnosis": "轉動把手若有金屬摩擦的『卡卡』聲，代表內部彈簧疲乏或管狀門閂 (Tubular Latch) 損壞，需整組更換。",
        "sunday_disaster_clock": "13:00",
        "point_of_no_return": "抽出舊門閂後發現新門閂的 Backset 距離 (44mm 或 57mm) 買錯，你的房門今晚將無法關閉鎖上。",
        "shopping_logic": {
            "target_material": "Tubular Latch & Spindle",
            "exact_specs": "Premium tubular mortice latch (CE/UKCA), 8mm door spindle",
            "store_slug": "tubular+mortice+latch"
        }
    },
    {
        "project_name": "安裝踢腳線",
        "coin_test": "用 1p 硬幣測量踢腳線與牆壁的縫隙，若能塞入，代表牆面不平，需使用大量免釘膠 (Grab Adhesive) 填補。",
        "sound_diagnosis": "敲擊牆面底端，敲起來像打鼓代表是石膏板，直接打無頭釘無效，必須使用強力免釘膠黏合。",
        "sunday_disaster_clock": "10:00",
        "point_of_no_return": "內部轉角(Internal corner)若偷懶切 45 度角而不是用線鋸仿形切割 (Scribe)，接縫日後絕對會裂開。",
        "shopping_logic": {
            "target_material": "Grab Adhesive & Decorator's Caulk",
            "exact_specs": "CT1 Grab Adhesive, Flexible water-based caulk",
            "store_slug": "ct1+grab+adhesive"
        }
    },
    {
        "project_name": "清洗露台",
        "coin_test": "用 20p 硬幣刮石板縫隙，若舊沙子輕易被挖出，高壓沖洗後必須重新填入窯乾石英砂 (Kiln-dried sand)。",
        "sound_diagnosis": "高壓水槍沖洗時若石板發出空洞的『喀喀』聲，代表底部砂漿已掏空，石板隨時會破裂。",
        "sunday_disaster_clock": "11:00",
        "point_of_no_return": "一旦水槍直射縫隙把底沙全部沖走，下午若買不到石英砂回填，露台石板將鬆動且雜草叢生。",
        "shopping_logic": {
            "target_material": "Kiln-Dried Sand & Patio Cleaner",
            "exact_specs": "Kiln-dried block paving sand, Pet-safe patio cleaner",
            "store_slug": "kiln+dried+block+paving+sand"
        }
    },
    {
        "project_name": "安裝圍欄",
        "coin_test": "將 50p 硬幣放在木柱頂端，若水滴無法快速滑落，需加裝柱帽 (Post caps) 防止雨水滲入木紋導致腐爛。",
        "sound_diagnosis": "用鐵鎚敲擊挖洞器，若發出『鏘』的堅硬聲，代表遇到粗樹根或舊混凝土，需改用軍刀鋸或碎石棍。",
        "sunday_disaster_clock": "09:00",
        "point_of_no_return": "一旦速乾水泥 (Postcrete) 倒進洞裡加了水，5 分鐘內就會硬化，木柱若沒抓平將永遠歪斜。",
        "shopping_logic": {
            "target_material": "Postcrete & UC4 Timber Post",
            "exact_specs": "20kg Rapid-Set Postcrete, 100x100mm UC4 Treated Post",
            "store_slug": "postcrete+20kg"
        }
    },
    {
        "project_name": "修補磚牆",
        "coin_test": "拿 1p 硬幣測試舊砂漿厚度，剔除舊砂漿的深度必須大約是一枚 1p 硬幣的直徑 (約 15-20mm)。",
        "sound_diagnosis": "用鑿刀輕敲磚塊，若發出沉悶破碎聲，代表老磚已被過硬的現代水泥撐破，需改用石灰砂漿 (Lime Mortar)。",
        "sunday_disaster_clock": "10:00",
        "point_of_no_return": "若在 1920 年前的老屋錯用現代硬水泥填縫，冬天水分結冰時會把昂貴的老紅磚直接擠碎。",
        "shopping_logic": {
            "target_material": "Mortar Rake & Hydraulic Lime",
            "exact_specs": "Mortar raking chisel, Hydraulic Lime NHL 3.5",
            "store_slug": "mortar+raking+chisel"
        }
    },
    {
        "project_name": "清理天溝",
        "coin_test": "把 2p 硬幣丟入天溝沖水，若硬幣停滯不前，代表洩水坡度不對，需重新調整掛勾 (Gutter clips)。",
        "sound_diagnosis": "輕敲天溝，聲音清脆為 PVC 管，聲音沉悶死硬極可能是 1999 年前的石棉水泥管 (Asbestos)，嚴禁高壓沖洗。",
        "sunday_disaster_clock": "12:00",
        "point_of_no_return": "一旦把淤泥落葉直接沖進下水管 (Downpipe) 導致底部U型彎頭堵死，你將面臨雨水倒灌進牆壁的災難。",
        "shopping_logic": {
            "target_material": "Gutter Brush & Sealant",
            "exact_specs": "Hedgehog Gutter Brush, Soudal Roof & Gutter Sealant",
            "store_slug": "hedgehog+gutter+brush"
        }
    }
];

// Helper to check if current time is past sunday_disaster_clock
const isPastDeadline = (deadlineStr) => {
    const now = new Date();
    if (now.getDay() !== 0) return false; // Not Sunday
    const [h, m] = deadlineStr.split(':').map(Number);
    const deadline = new Date();
    deadline.setHours(h, m, 0);
    return now > deadline;
};

// Helper for countdown
const getSundayCountdown = () => {
    const now = new Date();
    const closing = new Date();
    closing.setHours(16, 0, 0);
    const diff = closing - now;
    if (diff < 0) return "STORE CLOSED";
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${h}H ${m}M LEFT`;
};

export default function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [diagnosed, setDiagnosed] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [checkedSteps, setCheckedSteps] = useState({});

    // Pillars Logic
    const sundayActive = new Date().getDay() === 0;
    const deadlineExceeded = selectedProject ? isPastDeadline(selectedProject.sunday_disaster_clock) : false;

    // Search logic
    const filteredProjects = PROJECTS_DATA.filter(p =>
        p.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const speak = (text) => {
        if (!voiceEnabled) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-TW';
        window.speechSynthesis.speak(utterance);
    };

    const handleStartProject = () => {
        if (deadlineExceeded) return;
        setDiagnosed(true);
    };

    if (!selectedProject) {
        return (
            <div className="min-h-screen p-6 max-w-4xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-6xl font-black italic text-[#FACC15] mb-4 tracking-tighter">
                        UK DIY SURVIVAL
                    </h1>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-8">Professional Diagnostic Engine</p>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-6 h-6 group-focus-within:text-[#FACC15] transition-colors" />
                        <input
                            className="w-full bg-zinc-900 border-4 border-zinc-800 p-6 pl-14 text-2xl font-black focus:border-[#FACC15] outline-none transition-all placeholder:text-zinc-800"
                            placeholder="SEARCH PROJECT..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {sundayActive && (
                        <div className="mt-6 p-4 bg-[#FACC15] text-black font-black flex justify-between items-center text-xl italic shadow-[8px_8px_0px_0px_#000]">
                            <div className="flex items-center gap-2"><Clock /> SUNDAY DEADLINE</div>
                            <div>{getSundayCountdown()}</div>
                        </div>
                    )}
                </header>

                <div className="grid gap-6">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => { setSelectedProject(project); setDiagnosed(false); }}
                            className="card-construction group cursor-pointer"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-3xl font-black uppercase group-hover:text-[#FACC15] transition-colors">
                                    {project.project_name}
                                </h3>
                                <ChevronRight className="w-8 h-8 text-zinc-700 group-hover:text-[#FACC15]" />
                            </div>
                            <div className="mt-4 flex gap-4">
                                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                    Deadline: {project.sunday_disaster_clock} PM
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#FACC15] selection:text-black">
            {/* Pillar 1: Sunday Alert Overlay */}
            <AnimatePresence>
                {deadlineExceeded && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-[#EF4444] p-12 flex flex-col justify-center items-center text-center"
                    >
                        <AlertTriangle className="w-32 h-32 mb-8 animate-bounce fill-white text-[#EF4444]" />
                        <h2 className="text-7xl font-black italic mb-6 leading-none">STOP WORK!</h2>
                        <p className="text-3xl font-bold max-w-2xl mb-12">
                            Sunday trading hours end at 16:00. You missed the dynamic start window ({selectedProject.sunday_disaster_clock}).
                            If something breaks now, you are stuck without water or power.
                        </p>
                        <div className="flex flex-col gap-4 w-full max-w-md">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="btn-construction"
                            >
                                ABORT PROJECT
                            </button>
                            <button
                                className="btn-construction bg-black text-white"
                                onClick={() => {
                                    const url = `https://www.amazon.co.uk/s?k=${selectedProject.shopping_logic.store_slug}`;
                                    window.open(url, '_blank');
                                }}
                            >
                                ORDER PARTS ONLY
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="p-6 flex justify-between items-center border-b-4 border-zinc-900 sticky top-0 bg-black z-50">
                <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 font-black text-[#FACC15] text-xl">
                    <ChevronLeft /> BACK
                </button>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setVoiceEnabled(!voiceEnabled)}
                        className={`p-4 rounded-full border-2 ${voiceEnabled ? 'border-[#FACC15] text-[#FACC15]' : 'border-zinc-800 text-zinc-600'}`}
                    >
                        {voiceEnabled ? <Volume2 /> : <VolumeX />}
                    </button>
                    <div className="text-right">
                        <div className="text-xs font-black text-zinc-600 uppercase">Project ID</div>
                        <div className="font-mono text-[#FACC15]">{selectedProject.project_name.substring(0, 4)}</div>
                    </div>
                </div>
            </nav>

            <main className="p-6 md:p-12 max-w-6xl mx-auto">
                {!diagnosed ? (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                        {/* Pillar 2: Diagnostic Gate */}
                        <div className="hazard-stripe h-6 mb-12" />
                        <h2 className="text-6xl font-black italic mb-12 leading-none uppercase">Pre-Flight Diagnostic</h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="card-construction p-10 border-[#FACC15]">
                                <div className="flex items-center gap-4 mb-8">
                                    <Package className="text-[#FACC15] w-10 h-10" />
                                    <h4 className="text-2xl font-black uppercase">Physical Coin Test</h4>
                                </div>
                                <p className="text-step text-zinc-300 leading-relaxed min-h-[120px]">
                                    {selectedProject.coin_test}
                                </p>
                                <div className="mt-8 text-sm font-bold text-zinc-600 italic">Verify sizing before opening any sealed pipes/valves.</div>
                            </div>

                            <div className="card-construction p-10 border-[#FACC15]">
                                <div className="flex items-center gap-4 mb-8">
                                    <Volume2 className="text-[#FACC15] w-10 h-10" />
                                    <h4 className="text-2xl font-black uppercase">Acoustic Diagnosis</h4>
                                </div>
                                <p className="text-step text-zinc-300 leading-relaxed min-h-[120px]">
                                    {selectedProject.sound_diagnosis}
                                </p>
                                <div className="mt-8 text-sm font-bold text-zinc-600 italic">Listen carefully to determine internal structural integrity.</div>
                            </div>
                        </div>

                        <button
                            onClick={handleStartProject}
                            className="btn-construction mb-20"
                        >
                            I'VE VERIFIED - START PROJECT
                        </button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-4xl font-black uppercase italic mb-8 flex items-center gap-2">
                                <Hammer className="text-[#FACC15]" /> Construction Queue
                            </h3>

                            {/* Pillars 3 & 4 Integrated in Steps */}
                            <div className="space-y-6">
                                {[
                                    "Prepare tools and clear workspace area.",
                                    "Isolate power or water supply to the unit.",
                                    selectedProject.point_of_no_return ? `${selectedProject.point_of_no_return} (CRITICAL JUNCTION)` : "Proceed with primary disassembly.",
                                    "Fit the new part following store specifications.",
                                    "Test the installation for 15 minutes."
                                ].map((step, idx) => {
                                    const isCritical = step.includes("CRITICAL JUNCTION");
                                    return (
                                        <motion.div
                                            key={idx}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setCheckedSteps({ ...checkedSteps, [idx]: !checkedSteps[idx] });
                                                speak(step);
                                            }}
                                            className={`card-construction p-8 cursor-pointer border-l-8 ${checkedSteps[idx] ? 'border-zinc-800 opacity-30 scale-95' :
                                                    isCritical ? 'border-[#EF4444] urgency-blink' : 'border-[#FACC15]'
                                                }`}
                                        >
                                            <div className="flex gap-6 items-start">
                                                <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-2xl border-4 ${isCritical ? 'border-[#EF4444] text-[#EF4444]' : 'border-zinc-800 text-zinc-700'
                                                    }`}>
                                                    {idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    {isCritical && (
                                                        <div className="text-xs font-black text-[#EF4444] uppercase tracking-tighter mb-2 flex items-center gap-1">
                                                            <ShieldAlert className="w-4 h-4" /> POINT OF NO RETURN
                                                        </div>
                                                    )}
                                                    <p className={`text-step uppercase ${isCritical ? 'text-[#EF4444]' : ''}`}>
                                                        {step}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="mt-20 border-t-8 border-zinc-900 pt-20">
                            <h3 className="text-4xl font-black uppercase italic mb-8 flex items-center gap-2">
                                <ShoppingCart className="text-[#FACC15]" /> Shopping Matrix
                            </h3>

                            <div className="bg-zinc-900 p-10 industrial-border border-[#FACC15]">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div>
                                        <div className="text-xs font-black text-zinc-500 uppercase mb-2">Target Component</div>
                                        <div className="text-4xl font-black text-[#FACC15]">{selectedProject.shopping_logic.target_material}</div>
                                        <div className="mt-2 text-xl font-bold italic text-zinc-400">{selectedProject.shopping_logic.exact_specs}</div>
                                    </div>

                                    <div className="flex flex-col gap-4 w-full md:w-auto">
                                        <button
                                            onClick={() => window.open(`https://www.amazon.co.uk/s?k=${selectedProject.shopping_logic.store_slug}`, '_blank')}
                                            className="btn-construction py-4 flex items-center justify-center gap-2"
                                        >
                                            <Eye className="w-6 h-6" /> VIEW ON AMAZON
                                        </button>
                                        <button
                                            onClick={() => window.open(`https://www.screwfix.com/search?q=${selectedProject.shopping_logic.store_slug}`, '_blank')}
                                            className="btn-construction bg-black text-white hover:bg-zinc-800 border-2 border-white py-4"
                                        >
                                            CHECK SCREWFIX STOCK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </main>

            <footer className="mt-20 p-12 bg-zinc-950 border-t-4 border-zinc-900 text-center">
                <button
                    onClick={() => alert("EMERGENCY: TURN OFF MAINS IMMEDIATELY. CALL A PROFESSIONAL IF SMOKING OR FLOODING.")}
                    className="btn-construction btn-danger bg-[#EF4444] animate-pulse"
                >
                    SOS EMERGENCY CALL
                </button>
            </footer>
        </div>
    );
}
