// app/fixes/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function XSSFixesPage() {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Glitch effect on title (safe, no hydration issues)
  useEffect(() => {
    if (!titleRef.current) return;
    const el = titleRef.current;
    const glitch = () => {
      el.style.transform = `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`;
      setTimeout(() => (el.style.transform = ''), 150);
    };
    const interval = setInterval(glitch, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-black">
      {/* Green matrix-style background sparks (deterministic = no hydration mismatch) */}
      <div className="fixed inset-0 -z-10 opacity-50">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"
            style={{
              left: `${(i * 137) % 95}%`,
              top: `${(i * 89) % 90}%`,
              animationDelay: `${i * 0.15}s`,
              boxShadow: '0 0 20px #00ff41',
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="pixel-border bg-[#001a00] p-10 max-w-6xl w-full border-4 border-[#00ff41] shadow-[0_0_30px_rgba(0,255,65,0.4)]">
        
        {/* Title with glitch */}
        <h1
          ref={titleRef}
          className="font-['Press_Start_2P'] text-4xl md:text-6xl text-[#00ff41] text-glow text-center mb-8 glitch leading-tight"
        >
          DEBRIEF:<br />XSS COUNTERMEASURES
        </h1>

        <p className="font-['VT323'] text-2xl text-[#00ff41] text-center mb-12">
          Greater than NOW LEARN HOW TO PATCH WHAT YOU JUST BROKE
        </p>

        {/* Fixes Sections */}
        <div className="grid gap-8 mb-12 font-['VT323'] text-lg">
          {/* Fix 1 */}
          <section className="border-2 border-[#00ff41] bg-[#001100] p-6">
            <h2 className="font-['Press_Start_2P'] text-xl text-[#00ff41] mb-4">
              01 // REACT AUTO-ESCAPING (THE #1 FIX)
            </h2>
            <pre className="bg-black p-5 rounded border border-[#004400] overflow-x-auto text-sm text-[#00ff41]">
{`// DANGEROUS - NEVER DO THIS
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// CORRECT - REACT ESCAPES AUTOMATICALLY
<div>{userInput}</div>`}
            </pre>
          </section>

          {/* Fix 2 */}
          <section className="border-2 border-[#00ff41] bg-[#001100] p-6">
            <h2 className="font-['Press_Start_2P'] text-xl text-[#00ff41] mb-4">
              02 // SANITIZE WITH DOMPURIFY
            </h2>
            <pre className="bg-black p-5 rounded border border-[#004400] overflow-x-auto text-sm text-[#00ff41]">
{`npm install dompurify isomorphic-dompurify

import DOMPurify from 'isomorphic-dompurify';

const cleanHTML = DOMPurify.sanitize(dirtyInput);
<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />`}
            </pre>
          </section>

          {/* Fix 3 */}
          <section className="border-2 border-[#00ff41] bg-[#001100] p-6">
            <h2 className="font-['Press_Start_2P'] text-xl text-[#00ff41] mb-4">
              03 // CONTENT SECURITY POLICY (CSP)
            </h2>
            <pre className="bg-black p-5 rounded border border-[#004400] overflow-x-auto text-sm text-[#00ff41]">
{`// next.config.js or middleware.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self'; object-src 'none';"
  }
]`}
            </pre>
          </section>

          {/* Fix 4 */}
          <section className="border-2 border-[#00ff41] bg-[#001100] p-6">
            <h2 className="font-['Press_Start_2P'] text-xl text-[#00ff41] mb-4">
              04 // ESCAPE ON BACKEND TOO
            </h2>
            <pre className="bg-black p-5 rounded border border-[#004400] overflow-x-auto text-sm text-[#00ff41]">
{`// Never trust the frontend alone!
const safe = input
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');`}
            </pre>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
          <button
            onClick={() => router.push('/game')}
            className="retro-button py-5 px-10 border-[#ff0033] text-[#ff0033] hover:bg-[#ff0033] hover:text-black transition-all"
          >
            [ REPLAY MISSION ]
          </button>

          <button
            onClick={() => router.push('/lobby')}
            className="retro-button py-5 px-10 border-[#ffb000] text-[#ffb000] hover:bg-[#ffb000] hover:text-black transition-all shadow-[0_0_20px_rgba(255,176,0,0.5)]"
          >
            [ RETURN TO LOBBY ]
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-[#004400] text-center">
          <p className="font-['VT323'] text-2xl text-[#00ff41]">
            Greater than KNOWLEDGE IS THE ULTIMATE EXPLOIT
          </p>
          <p className="font-['VT323'] text-lg text-[#006600] mt-3">
            NUIT DE L'INFO 2025 — HILOX TEAM
          </p>
        </div>
      </div>
    </div>
  );
}