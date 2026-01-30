import { useRef, useEffect } from 'react';
import { Card } from './Card';

export const Features = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // drawing those glowing light beams in the background with canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const MINIMUM_BEAMS = 20;
        let beams: any[] = [];
        let rafId = 0;

        const opacityMap: Record<string, number> = {
            subtle: 0.7,
            medium: 0.85,
            strong: 1.0,
        };

        const intensity = 'strong';

        function createBeam(w: number, h: number) {
            const angle = -35 + Math.random() * 10;
            return {
                x: Math.random() * w * 1.5 - w * 0.25,
                y: Math.random() * h * 1.5 - h * 0.25,
                width: 30 + Math.random() * 60,
                length: h * 2.5,
                angle,
                speed: 0.6 + Math.random() * 1.2,
                opacity: 0.12 + Math.random() * 0.16,
                hue: 190 + Math.random() * 70,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03,
            };
        }

        function resetBeam(beam: any, index: number, totalBeams: number, w: number, h: number) {
            const column = index % 3;
            const spacing = w / 3;
            beam.y = h + 100;
            beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = 190 + (index * 70) / totalBeams;
            beam.opacity = 0.2 + Math.random() * 0.1;
            return beam;
        }

        function updateCanvasSize() {
            const dpr = Math.max(1, window.devicePixelRatio || 1);
            const w = Math.floor(canvas?.clientWidth || window.innerWidth);
            const h = Math.floor(canvas?.clientHeight || window.innerHeight);

            canvas!.width = Math.floor(w * dpr);
            canvas!.height = Math.floor(h * dpr);

            ctx!.setTransform(1, 0, 0, 1, 0, 0);
            ctx!.scale(dpr, dpr);

            const density = Math.min(1.5, Math.max(1, (w * h) / (1280 * 800)));
            const total = Math.floor(MINIMUM_BEAMS * density * 1.5);

            beams = Array.from({ length: total }, () => createBeam(w, h));
        }

        function drawBeam(c: CanvasRenderingContext2D, beam: any) {
            c.save();
            c.translate(beam.x, beam.y);
            c.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity];

            // Safety check for valid numbers before creating gradient
            if (!Number.isFinite(beam.width) || !Number.isFinite(beam.length)) {
                c.restore();
                return;
            }

            const gradient = c.createLinearGradient(0, 0, 0, beam.length);
            gradient.addColorStop(0, `hsla(${beam.hue},85%,65%,0)`);
            gradient.addColorStop(0.1, `hsla(${beam.hue},85%,65%,${pulsingOpacity * 0.5})`);
            gradient.addColorStop(0.4, `hsla(${beam.hue},85%,65%,${pulsingOpacity})`);
            gradient.addColorStop(0.6, `hsla(${beam.hue},85%,65%,${pulsingOpacity})`);
            gradient.addColorStop(0.9, `hsla(${beam.hue},85%,65%,${pulsingOpacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${beam.hue},85%,65%,0)`);

            c.fillStyle = gradient;
            c.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            c.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;

            ctx.clearRect(0, 0, w, h);
            ctx.filter = 'blur(35px)';

            const total = beams.length;
            for (let i = 0; i < total; i++) {
                const b = beams[i];
                b.y -= b.speed;
                b.pulse += b.pulseSpeed;

                if (b.y + b.length < -100) {
                    resetBeam(b, i, total, w, h);
                }
                drawBeam(ctx, b);
            }

            rafId = requestAnimationFrame(animate);
        }

        updateCanvasSize();
        animate();

        const handleResize = () => updateCanvasSize();
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section id="features" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-blitz-bg relative z-0 overflow-hidden">
            {/* those animated light beams */}
            <div className="absolute inset-0 bg-neutral-950">
                <div className="relative w-full h-full">
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
                    <div className="absolute inset-0 bg-neutral-950/5 backdrop-blur-3xl animate-pulse [animation-duration:8s]"></div>
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-950 to-transparent"></div>
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent"></div>
                        <div className="absolute -inset-[25%] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(80,120,255,0.10),transparent)]"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-semibold tracking-tighter text-white leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6">
                        Collaboration, <span className="text-slate-500">Reimagined.</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                        Features built for speed, privacy, and productivity.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[minmax(280px,auto)] sm:auto-rows-[minmax(300px,auto)]">

                    {/* big feature card (anonymous profiles) */}
                    <Card className="sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/5 to-transparent">
                        <div className="flex flex-col h-full">
                            <div className="w-16 h-13 mb-6 flex items-center justify-center">
                                <img src="/images/anonymous.svg?v=2" alt="Anonymous Profiles" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-3">Anonymous Profiles</h3>
                            <p className="text-slate-400 max-w-lg mb-8 leading-relaxed">
                                Go anonymous with randomly generated handles.Eliminate bias, remove social pressure, and protect personal metadata by default.
                            </p>

                            <div className="mt-auto relative h-24 w-full overflow-hidden flex items-center gap-4">
                                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>user_x92a</span>
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 flex items-center gap-2 opacity-60">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span>delta_v4</span>
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 flex items-center gap-2 opacity-40">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <span>echo_7z</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* smaller feature grids */}
                    <Card className="sm:col-span-1 lg:col-span-1">
                        <div className="flex flex-col h-full">
                            <div className="w-16 h-12 mb-6 flex items-center justify-center">
                                <img src="/images/message.svg?v=2" alt="Instant Messaging" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">Instant Messaging</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Messages sync across devices in milliseconds. No loading spinners, no waiting for history.
                            </p>

                        </div>
                    </Card>

                    {/* Card 3: Mobile App */}
                    <Card className="sm:col-span-1 lg:col-span-1">
                        <div className="flex flex-col h-full">
                            <div className="w-16 h-16 mb-6 flex items-center justify-center">
                                <img src="/images/mobile.svg?v=2" alt="Protected Mobile App" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">Protected Mobile App</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Protect your message history with passcodes, secret gestures, and Touch ID on iOS and on Android.
                            </p>
                        </div>
                    </Card>

                    {/* Card 4: Encryption */}
                    <Card className="sm:col-span-1 lg:col-span-1">
                        <div className="flex flex-col h-full">
                            <div className="w-16 h-16 mb-6 flex items-center justify-center">
                                <img src="/images/encrypt.svg?v=2" alt="End-to-End Encryption" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">End-to-End Encryption</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Strong encryption is done using AES CBC method with 256 bit key length, with separate pair of keys for every message dialog.
                            </p>
                        </div>
                    </Card>

                    {/* Card 5: Sovereignty */}
                    <Card className="sm:col-span-1 lg:col-span-1">
                        <div className="flex flex-col h-full">
                            <div className="w-16 h-16 mb-6 flex items-center justify-center">
                                <img src="/images/server.svg?v=2" alt="Data Sovereignty" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">Data Sovereignty</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                You retain full control over where and how your data is processed. No message retention on our servers.
                            </p>
                        </div>
                    </Card>

                </div>
            </div>
        </section>
    );
};
