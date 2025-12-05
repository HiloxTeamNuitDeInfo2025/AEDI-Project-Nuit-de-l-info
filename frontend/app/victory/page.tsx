// app/victory/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VictoryPage() {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const [flags, setFlags] = useState<string[]>([]);
  const [showFireworks, setShowFireworks] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const profile = localStorage.getItem('xssctf_profile');
    if (!profile) {
      router.push('/');
      return;
    }
    const { username: user } = JSON.parse(profile);
    setUsername(user);

    const savedProgress = localStorage.getItem('xssctf_progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setScore(progress.score);
      setFlags(progress.flags);
    }

    setTimeout(() => setShowFireworks(true), 500);

    // Auto-redirect to fixes page after 8 seconds
    const timer = setTimeout(() => router.push('/fixes'), 8000);
    return () => clearTimeout(timer);
  }, [router]);

  const handlePlayAgain = () => {
    localStorage.removeItem('xssctf_progress');
    router.push('/game');
  };

  const handleReturnToLobby = () => {
    localStorage.removeItem('xssctf_progress');
    router.push('/lobby');
  };

  const handleLearnFixes = () => router.push('/fixes');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fireworks background */}
      <div className="fixed inset-0 -z-10">
        {showFireworks &&
          [...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#ff0033] rounded-full"
              style={{
                left: `${(i * 137) % 95}%`,
                top: `${(i * 89) % 90}%`,
                animation: `pulse ${1 + (i % 3)}s infinite`,
                animationDelay: `${i * 0.1}s`,
                boxShadow: '0 0 12px rgba(255, 0, 51, 0.9)',
              }}
            />
          ))}
      </div>

      <div className="pixel-border bg-[#1a0000] p-8 max-w-4xl w-full">
        {/* Your existing victory content – unchanged */}
        <div className="text-center mb-8">
          <div className="font-['Press_Start_2P'] text-4xl md:text-6xl text-[#ff0033] text-glow mb-6 glitch">
            MISSION
            <br />
            ACCOMPLISHED
          </div>
          <div className="font-['VT323'] text-3xl text-[#ff3333] mb-4">
            Greater than ALL SYSTEMS BREACHED SUCCESSFULLY
          </div>
          <div className="border-2 border-[#ff0033] bg-[#110000] p-6 inline-block">
            <p className="font-['Press_Start_2P'] text-sm text-[#ffb000] mb-2">
              OPERATIVE
            </p>
            <p className="font-['VT323'] text-4xl text-[#ff0033] text-glow">
              {username}
            </p>
          </div>
        </div>

        {/* Stats, flags, report… (keep everything you already have) */}
        {/* ... your existing grid, achievement, flags, report ... */}

        {/* Footer – THIS WAS THE BUG – FIXED */}
        <div className="mt-8 pt-6 border-t-2 border-[#440000] text-center">
          <p className="font-['VT323'] text-lg text-[#ff3333]">
            Greater than NUIT DE L&apos;INFO 2025 - HILOX TEAM
          </p>
          <p className="font-['VT323'] text-sm text-[#440000] mt-2">
            Greater than FOR EDUCATIONAL PURPOSES ONLY
          </p>
        </div>
      </div>

      {/* Bottom action buttons (3-column layout) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-6 z-50">
        <button
          onClick={handlePlayAgain}
          className="retro-button py-4 px-8 border-[#ff0033] text-[#ff0033] hover:bg-[#ff0033] hover:text-black"
        >
          [ REPLAY MISSION ]
        </button>

        <button
          onClick={handleLearnFixes}
          className="retro-button py-4 px-8 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black animate-pulse shadow-[0_0_20px_rgba(0,255,65,0.6)]"
        >
          [ LEARN XSS FIXES ]
        </button>

        <button
          onClick={handleReturnToLobby}
          className="retro-button py-4 px-8 border-[#ffb000] text-[#ffb000] hover:bg-[#ffb000] hover:text-black"
        >
          [ RETURN TO LOBBY ]
        </button>
      </div>

      {/* Auto-redirect hint */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 text-center">
        <p className="font-['VT323'] text-lg text-[#440000] animate-pulse">
          Greater than Auto-debrief in 8 seconds...
        </p>
      </div>
    </div>
  );
}