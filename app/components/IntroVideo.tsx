'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const MAX_DURATION_MS = 8500;
const AUTOPLAY_WATCHDOG_MS = 900;
const PRE_ROLL_MS = 350;
const DIM_MS = 250;
const EXIT_MS = 500;
const PLAYBACK_RATE = 1.25;

type Phase = 'pending' | 'preroll' | 'playing' | 'dim' | 'exiting' | 'done';

export function IntroVideo() {
  const [phase, setPhase] = useState<Phase>('pending');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const queueTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setPhase('preroll');
    queueTimer(() => setPhase('playing'), PRE_ROLL_MS);

    return clearTimers;
  }, []);

  useEffect(() => {
    if (phase === 'pending' || phase === 'done') return;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const hardCap = queueTimer(beginDim, MAX_DURATION_MS);
    const video = videoRef.current;
    if (!video) return () => clearTimeout(hardCap);

    video.playbackRate = PLAYBACK_RATE;
    const attempt = video.play();
    if (attempt && typeof attempt.then === 'function') {
      attempt.catch(() => beginDim());
    }

    const watchdog = queueTimer(() => {
      if (video.paused || video.readyState < 2 || video.currentTime === 0) {
        beginDim();
      }
    }, AUTOPLAY_WATCHDOG_MS);

    const onTime = () => {
      if (video.duration > 0) setProgress(video.currentTime / video.duration);
    };
    video.addEventListener('timeupdate', onTime);

    return () => {
      clearTimeout(hardCap);
      clearTimeout(watchdog);
      video.removeEventListener('timeupdate', onTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function beginDim() {
    setPhase((current) =>
      current === 'playing' || current === 'preroll' ? 'dim' : current,
    );
    queueTimer(() => setPhase('exiting'), DIM_MS);
    queueTimer(() => setPhase('done'), DIM_MS + EXIT_MS);
  }

  function finish() {
    clearTimers();
    setPhase('dim');
    queueTimer(() => setPhase('exiting'), DIM_MS);
    queueTimer(() => setPhase('done'), DIM_MS + EXIT_MS);
  }

  if (phase === 'pending' || phase === 'done') return null;

  const showVideo = phase === 'playing';
  const showLogoLayer = phase === 'preroll';

  return (
    <motion.div
      role="dialog"
      aria-label="Solivance Electric intro"
      aria-modal="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video */}
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={beginDim}
        onError={beginDim}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: showVideo ? 1 : 0, scale: showVideo ? 1 : 1.04 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-contain sm:object-cover"
      >
        <source src="/intro.mp4" type="video/mp4" />
        <source src="/intro.mov" type="video/quicktime" />
      </motion.video>

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Logo — preroll only */}
      <AnimatePresence>
        {showLogoLayer ? (
          <motion.div
            key="brand"
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center px-8 text-center"
          >
            <Image
              src="/logo/logo_vertical.PNG"
              alt="Solivance Electric"
              width={900}
              height={900}
              priority
              className="h-56 w-auto drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)] sm:h-72 lg:h-96"
            />
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="mt-7 h-px w-40 bg-gradient-to-r from-transparent via-[var(--onestop-gold)] to-transparent sm:w-56"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Progress bar */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5"
        animate={{ opacity: phase === 'playing' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full bg-[var(--onestop-gold)]"
          style={{ transformOrigin: '0 50%' }}
          animate={{ scaleX: phase === 'dim' ? 1 : progress }}
          transition={{ duration: 0.2, ease: 'linear' }}
        />
      </motion.div>

      {/* Skip */}
      <AnimatePresence>
        {phase !== 'dim' && phase !== 'exiting' ? (
          <motion.button
            key="skip"
            type="button"
            onClick={finish}
            aria-label="Skip intro"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="absolute right-4 top-4 inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md transition hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-6 sm:top-6"
          >
            Skip
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-80">
              <path d="M1 1l8 4-8 4V1z" fill="currentColor" />
            </svg>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
