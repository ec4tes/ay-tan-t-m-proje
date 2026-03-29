'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Gauge, Play, Radar, RotateCcw, Sparkles, Target, User } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import StarField from '@/components/StarField';
import SoundToggle from '@/components/SoundToggle';
import Planet from '@/components/Planet';
import Rocket from '@/components/Rocket';

export default function HomePage() {
    const { username, setUsername, startGame, loadSavedState, resetGame, phase, currentStation, score, isMuted, toggleMute } =
        useGameStore();

    const [inputName, setInputName] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [hasSavedGame, setHasSavedGame] = useState(false);

    useEffect(() => {
        loadSavedState();
    }, [loadSavedState]);

    useEffect(() => {
        if (username && phase === 'playing' && currentStation > 1) {
            setHasSavedGame(true);
        }
    }, [username, phase, currentStation]);

    const handleSkipIntro = () => {
        setShowIntro(false);
    };

    const handleStart = () => {
        if (!inputName.trim()) return;
        setUsername(inputName.trim());
        startGame();
        window.location.href = '/game';
    };

    const handleContinue = () => {
        startGame();
        window.location.href = '/game';
    };

    const handleRestart = () => {
        resetGame();
        setHasSavedGame(false);
        setInputName('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleStart();
        }
    };

    return (
        <div className="relative h-screen overflow-hidden bg-[#02050d] text-white">
            <StarField starsVisible speed={0.75} />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(59,130,246,0.14),transparent_18%),radial-gradient(circle_at_50%_120%,rgba(251,191,36,0.08),transparent_26%),linear-gradient(180deg,#02050d_0%,#07101d_45%,#030713_100%)]" />
            <div className="fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />

            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-hidden bg-[#010409]"
                        onClick={handleSkipIntro}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_10%),linear-gradient(180deg,#010409_0%,#020814_100%)]" />

                        <motion.div
                            className="relative mx-6 flex w-full max-w-[980px] flex-col overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,28,0.92),rgba(4,9,19,0.96))] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                        >
                            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                                    <Radar size={13} />
                                    Ay Gorev Brifingi
                                </div>
                                <div className="font-space text-[11px] uppercase tracking-[0.28em] text-white/35">Launch Sequence</div>
                            </div>

                            <div className="grid gap-8 px-6 py-7 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-8">
                                <div className="flex flex-col justify-center">
                                    <p className="font-space text-xs uppercase tracking-[0.35em] text-cyan-200/55">Mission 01</p>
                                    <h1 className="mt-4 max-w-xl font-space text-4xl font-bold leading-[0.92] text-white md:text-6xl">
                                        Ay&apos;a ilk temasi hisseden sinematik bir gorev.
                                    </h1>
                                    <p className="mt-5 max-w-lg text-sm leading-7 text-white/62 md:text-base">
                                        Atmosferden cik, yildizlar arasinda ilerle ve Ay yuzeyine kontrollu inis yap. Bu ekran artik
                                        sade bir giris degil, gorevin acilis brifingi.
                                    </p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                            <p className="font-space text-xs uppercase tracking-[0.25em] text-cyan-200/55">Rota</p>
                                            <p className="mt-2 text-sm text-white">10 Durak</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                            <p className="font-space text-xs uppercase tracking-[0.25em] text-cyan-200/55">Hedef</p>
                                            <p className="mt-2 text-sm text-white">Ay Yuzeyi</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                            <p className="font-space text-xs uppercase tracking-[0.25em] text-cyan-200/55">Kontrol</p>
                                            <p className="mt-2 text-sm text-white">Oyuncu Reaksiyonu</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative min-h-[340px] overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,rgba(8,13,24,0.9),rgba(12,19,33,0.72))]">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.22),transparent_34%)]" />
                                    <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                                    <div className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />

                                    <div className="absolute left-[10%] bottom-[12%]">
                                        <Planet type="earth" size={170} detailLevel="medium" glow animated />
                                    </div>
                                    <div className="absolute right-[8%] top-[10%]">
                                        <Planet type="moon" size={126} detailLevel="high" glow animated={false} />
                                    </div>

                                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path
                                            d="M 22 76 C 34 64, 46 53, 60 38 S 78 18, 88 20"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.16)"
                                            strokeWidth="0.6"
                                            strokeDasharray="2 2"
                                        />
                                        <path
                                            d="M 22 76 C 34 64, 46 53, 60 38 S 78 18, 88 20"
                                            fill="none"
                                            stroke="rgba(103,232,249,0.65)"
                                            strokeWidth="0.9"
                                            strokeDasharray="0 6"
                                        />
                                    </svg>

                                    <motion.div
                                        className="absolute left-[26%] top-[56%] scale-[0.62] md:scale-[0.72]"
                                        animate={{ x: ['0%', '220%'], y: ['0%', '-116%'], rotate: [-18, 5, -10] }}
                                        transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <Rocket speed={5} isShaking={false} isThrusting={true} progress={45} />
                                    </motion.div>

                                    <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 backdrop-blur-md">
                                        <p className="font-space text-[11px] uppercase tracking-[0.25em] text-white/42">Telemetry</p>
                                        <p className="mt-1 text-sm text-white/78">Earth to Moon Transfer</p>
                                    </div>
                                    <div className="absolute bottom-4 right-4 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 backdrop-blur-md">
                                        <p className="font-space text-[11px] uppercase tracking-[0.25em] text-cyan-200/58">Status</p>
                                        <p className="mt-1 text-sm text-white/78">Press To Begin Mission</p>
                                    </div>
                                </div>
                            </div>

                            <motion.p
                                className="pb-6 text-center font-space text-[11px] uppercase tracking-[0.42em] text-white/30"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.25, 1, 0.25] }}
                                transition={{ duration: 2.2, repeat: Infinity }}
                            >
                                Devam etmek icin tikla
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1500px] flex-col px-4 pb-4 pt-4 md:px-6 lg:px-8">
                <div className="mb-4 flex items-center justify-between rounded-[28px] border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md md:px-5">
                    <div>
                        <p className="font-space text-[11px] uppercase tracking-[0.35em] text-cyan-200/55">Lunar Surface Program</p>
                        <p className="mt-1 text-sm text-white/70">Interactive Mission Interface</p>
                    </div>
                    <div className="hidden items-center gap-6 md:flex">
                        <div className="text-right">
                            <p className="font-space text-[11px] uppercase tracking-[0.25em] text-white/35">Route</p>
                            <p className="mt-1 text-sm text-white/78">Earth Orbit to Moon</p>
                        </div>
                        <div className="text-right">
                            <p className="font-space text-[11px] uppercase tracking-[0.25em] text-white/35">Mode</p>
                            <p className="mt-1 text-sm text-white/78">Mission Ready</p>
                        </div>
                    </div>
                </div>

                <div className="grid h-full flex-1 gap-4 overflow-hidden lg:grid-cols-[1.15fr_0.85fr] xl:gap-5">
                    <motion.section
                        className="relative grid h-full overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,32,0.9),rgba(4,8,18,0.95))] shadow-[0_30px_100px_rgba(0,0,0,0.42)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75 }}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_78%_20%,rgba(255,255,255,0.06),transparent_16%),radial-gradient(circle_at_52%_78%,rgba(14,165,233,0.16),transparent_26%)]" />

                        <div className="relative grid h-full grid-rows-[auto_auto_1fr] p-6 lg:p-8">
                            <div className="flex items-start justify-between gap-6">
                                <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-cyan-200/80">
                                        <Sparkles size={14} />
                                        Mission Control
                                    </div>
                                    <h1 className="mt-5 max-w-3xl font-space text-4xl font-bold leading-[0.9] text-white md:text-5xl xl:text-[5.2rem]">
                                        Dunya&apos;dan Ay&apos;a uzanan premium bir gorev deneyimi.
                                    </h1>
                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 md:text-base xl:text-lg">
                                        Katmanlari as, sorulari dogru cevapla, roketini hizlandir ve finalde Ay yuzeyine kontrollu bir
                                        dokunus yap. Arayuz, NASA esintili bir gorev merkezi gibi tasarlandi.
                                    </p>
                                </div>

                                <div className="hidden rounded-[26px] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-md xl:block">
                                    <p className="font-space text-[11px] uppercase tracking-[0.3em] text-white/40">Launch Objective</p>
                                    <p className="mt-3 max-w-[220px] text-sm leading-6 text-white/78">
                                        Atmosferden Ay yuzüne giden yolculugu bilgi ve refleksle tamamla.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-3 md:grid-cols-3">
                                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                                    <Gauge size={18} className="text-cyan-300" />
                                    <p className="mt-3 font-space text-sm text-white">10 duraklik rota</p>
                                    <p className="mt-2 text-sm leading-6 text-white/55">Troposferden Ay yuzeyine kademeli yukselis.</p>
                                </div>
                                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                                    <Target size={18} className="text-emerald-300" />
                                    <p className="mt-3 font-space text-sm text-white">Gercek zamanli akış</p>
                                    <p className="mt-2 text-sm leading-6 text-white/55">Bilgi paneli, soru ve hareket tek sahnede.</p>
                                </div>
                                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                                    <Radar size={18} className="text-amber-300" />
                                    <p className="mt-3 font-space text-sm text-white">Ay inişi finali</p>
                                    <p className="mt-2 text-sm leading-6 text-white/55">Roket itkisini ayarlayip sakin inis yap.</p>
                                </div>
                            </div>

                            <div className="relative mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,26,0.78),rgba(5,10,20,0.96))]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_78%,rgba(59,130,246,0.24),transparent_20%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.08),transparent_18%)]" />
                                <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                                <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />

                                <div className="absolute left-[7%] bottom-[8%]">
                                    <Planet type="earth" size={220} detailLevel="medium" glow animated />
                                </div>
                                <div className="absolute right-[8%] top-[10%]">
                                    <Planet type="moon" size={136} detailLevel="high" glow animated />
                                </div>

                                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path
                                        d="M 18 78 C 31 67, 43 58, 58 42 S 79 18, 90 21"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.16)"
                                        strokeWidth="0.55"
                                        strokeDasharray="2.2 2.2"
                                    />
                                    <path
                                        d="M 18 78 C 31 67, 43 58, 58 42 S 79 18, 90 21"
                                        fill="none"
                                        stroke="rgba(34,211,238,0.68)"
                                        strokeWidth="0.95"
                                        strokeDasharray="0 6"
                                    />
                                </svg>

                                <motion.div
                                    className="absolute left-[23%] top-[58%] scale-[0.74] md:scale-[0.82]"
                                    animate={{ x: ['0%', '230%'], y: ['0%', '-120%'], rotate: [-18, 5, -12] }}
                                    transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <Rocket speed={5} isShaking={false} isThrusting={true} progress={50} />
                                </motion.div>

                                <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-md">
                                    <p className="font-space text-[11px] uppercase tracking-[0.28em] text-cyan-200/55">Flight Path</p>
                                    <p className="mt-2 text-sm text-white/78">Earth departure, transfer arc, controlled landing.</p>
                                </div>

                                <div className="absolute bottom-5 right-5 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-md">
                                    <p className="font-space text-[11px] uppercase tracking-[0.28em] text-white/40">Goal</p>
                                    <p className="mt-2 text-sm text-white/78">Reach lunar surface with a stable descent.</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.aside
                        className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,20,35,0.92),rgba(5,10,20,0.96))] shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.75, delay: 0.08 }}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.08),transparent_22%),linear-gradient(180deg,transparent,rgba(0,0,0,0.1))]" />

                        <div className="relative flex h-full flex-col p-5 md:p-6">
                            <div className="border-b border-white/10 pb-5">
                                <p className="font-space text-[11px] uppercase tracking-[0.34em] text-cyan-200/55">Mission Brief</p>
                                <h2 className="mt-3 font-space text-2xl font-bold leading-tight text-white xl:text-3xl">
                                    Ucus planini kilitle, ekibi hazirla.
                                </h2>
                                <p className="mt-3 max-w-md text-sm leading-7 text-white/58 md:text-base">
                                    Her dogru cevap roketine ivme kazandirir. Finalde tek amac, Ay yuzüne sakin ve kontrollu bir
                                    sekilde inmek.
                                </p>
                            </div>

                            <div className="mt-5 grid gap-3">
                                <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-4">
                                    <p className="font-space text-sm text-cyan-200">Gorev Akisi</p>
                                    <div className="mt-4 space-y-3 text-sm text-white/65">
                                        <div className="flex items-start gap-3">
                                            <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-300" />
                                            <span>Atmosfer katmanlarini gec ve bilgi topla.</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-300" />
                                            <span>Sorulari cevaplayip puan ve hiz kombosu yakala.</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-300" />
                                            <span>Finalde itkiyi yonetip Ay&apos;a kontrollu in.</span>
                                        </div>
                                    </div>
                                </div>

                                {hasSavedGame ? (
                                    <div className="rounded-[28px] border border-emerald-400/20 bg-emerald-500/10 p-5">
                                        <p className="font-space text-sm text-emerald-300">Kayitli Gorev Bulundu</p>
                                        <p className="mt-2 text-sm leading-7 text-white/70">
                                            {username} icin durak {currentStation}/10 hazir. Toplam puan: {score}.
                                        </p>
                                        <div className="mt-5 flex gap-3">
                                            <motion.button
                                                className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 px-5 py-3 font-space text-sm font-bold text-white"
                                                onClick={handleContinue}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className="inline-flex items-center gap-2">
                                                    <Play size={15} />
                                                    Devam Et
                                                </span>
                                            </motion.button>
                                            <motion.button
                                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75"
                                                onClick={handleRestart}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <RotateCcw size={16} />
                                            </motion.button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
                                        <label className="mb-3 block font-space text-sm text-white/70">
                                            <User size={14} className="mr-2 inline" />
                                            Astronot Kimligi
                                        </label>
                                        <input
                                            type="text"
                                            value={inputName}
                                            onChange={(e) => setInputName(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Adini gir..."
                                            maxLength={20}
                                            className="w-full rounded-2xl border border-white/10 bg-[#11182d] px-4 py-4 text-sm text-white placeholder:text-white/25 focus:border-cyan-400/50 focus:outline-none"
                                            autoFocus
                                        />
                                        <motion.button
                                            className={`mt-4 w-full rounded-2xl px-6 py-4 font-space text-sm font-bold transition-all ${
                                                inputName.trim()
                                                    ? 'bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500 text-white shadow-[0_18px_40px_rgba(14,165,233,0.28)]'
                                                    : 'bg-white/5 text-white/30'
                                            }`}
                                            onClick={handleStart}
                                            disabled={!inputName.trim()}
                                            whileHover={inputName.trim() ? { scale: 1.02 } : {}}
                                            whileTap={inputName.trim() ? { scale: 0.98 } : {}}
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                Goreve Basla
                                                <ArrowRight size={15} />
                                            </span>
                                        </motion.button>
                                    </div>
                                )}
                            </div>

                            <div className="mt-auto grid grid-cols-3 gap-3 pt-4">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center">
                                    <p className="font-space text-[11px] uppercase tracking-[0.22em] text-white/35">Layer</p>
                                    <p className="mt-2 text-sm text-white/78">Atmosfer</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center">
                                    <p className="font-space text-[11px] uppercase tracking-[0.22em] text-white/35">Mode</p>
                                    <p className="mt-2 text-sm text-white/78">Quiz + Flight</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center">
                                    <p className="font-space text-[11px] uppercase tracking-[0.22em] text-white/35">Final</p>
                                    <p className="mt-2 text-sm text-white/78">Lunar Landing</p>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>

            <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
        </div>
    );
}
