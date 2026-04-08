import { useState } from 'react'
import './App.css'
import { FadeIn, FadeInStagger, FadeInItem } from './components/FadeIn'
import { SplineScene } from './components/SplineScene'
import { Spotlight } from './components/Spotlight'
import { motion } from 'framer-motion'
import { Bot, Database, Layers, Activity, ArrowRight } from 'lucide-react'
import { translations, type Lang } from './i18n'

const levelMeta = [
  { n: '01', bg: 'bg-[#0f1521]', accent: '#3b6b9e' },
  { n: '02', bg: 'bg-[#0f1a17]', accent: '#3b9e7a' },
  { n: '03', bg: 'bg-[#1a160f]', accent: '#c49a4a' },
]

const principleIcons = [Bot, Database, Activity, Layers]
const dotColors = ['#ef4444', '#f59e0b', '#f59e0b', '#ef4444']

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const t = translations[lang]

  return (
    <div className="min-h-screen bg-[#050505] text-[#888] relative overflow-x-hidden">

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-0 w-full z-50 bg-[#050505]/70 backdrop-blur-2xl border-b border-white/[0.04]"
      >
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-semibold tracking-[0.12em] text-white/70 uppercase">LEED Digital</span>
            <div className="flex gap-2 ml-2">
              <button
                onClick={() => setLang('en')}
                className={`text-xl cursor-pointer transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                title="English"
              >
                🇺🇸
              </button>
              <button
                onClick={() => setLang('pt')}
                className={`text-xl cursor-pointer transition-opacity ${lang === 'pt' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                title="Português"
              >
                🇧🇷
              </button>
            </div>
          </div>
          <a href="#contact" className="flex items-center gap-2 text-[12px] md:text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer">
            {t.nav.cta} <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="h-screen relative overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute top-0 right-[-15%] w-[90%] md:w-[70%] h-full z-0"
          style={{ maskImage: 'radial-gradient(ellipse 55% 65% at 85% 50%, black 35%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 55% 65% at 85% 50%, black 35%, transparent 100%)' }}
        >
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
        </motion.div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/90 via-black/60 to-transparent" style={{ pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 h-full flex flex-col justify-center pt-28 md:pt-0 px-6 md:px-10 max-w-[1200px] mx-auto pointer-events-none"
        >
          <div className="max-w-xl pointer-events-auto">
            <p className="text-[11px] text-[#4d8eff] font-medium tracking-[0.2em] uppercase mb-8 md:mb-6">{t.hero.label}</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white leading-[0.95] md:leading-[0.9] mb-10 md:mb-10">
              {t.hero.headline}
            </h1>
            <p className="text-base md:text-lg text-[#999] max-w-lg mb-12 md:mb-10 leading-relaxed">
              {t.hero.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-28 md:mt-0">
              <a onClick={(e) => { e.preventDefault(); const el = document.getElementById('proof'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 20; window.scrollTo({ top: y, behavior: 'smooth' }); }}} className="group px-6 py-3 bg-[#4d8eff] text-white font-medium rounded-lg transition-all hover:bg-[#5d96ff] shadow-[0_0_40px_rgba(77,142,255,0.15)] hover:shadow-[0_0_60px_rgba(77,142,255,0.25)] cursor-pointer text-[13px] flex items-center justify-center gap-2">
                {t.hero.cta1} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#contact" className="px-6 py-3 text-white/60 hover:text-white font-medium rounded-lg transition-colors cursor-pointer text-[13px] border border-white/[0.08] hover:border-white/[0.15]">
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </motion.div>

      </section>

      {/* ═══════════════════ PROBLEM ═══════════════════ */}
      <section className="py-14 md:py-36 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white leading-[1.05] max-w-2xl mb-10 md:mb-16">
              {t.problem.headline}
            </h2>
          </FadeIn>
          <FadeInStagger className="grid sm:grid-cols-2 gap-3">
            {t.problem.points.map((text, i) => (
              <FadeInItem key={i}>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors flex items-start gap-4 cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: dotColors[i] }} />
                  <p className="text-[14px] text-[#999] leading-relaxed">{text}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ═══════════════════ N1-N4 LEVELS ═══════════════════ */}
      <section className="py-14 md:py-36 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto text-right">
          <FadeIn className="mb-14">
            <p className="text-[13px] text-[#4d8eff] font-medium tracking-[0.2em] uppercase mb-4">{t.levels.label}</p>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white leading-[1.05]">
              {t.levels.headline1}
            </h2>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-[#4d8eff] leading-[1.05]">
              {t.levels.headline2}
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/[0.06] rounded-xl overflow-hidden text-left">
              {t.levels.items.map((l, i) => (
                <div key={i} className={`p-5 md:p-8 ${levelMeta[i].bg}`}>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-3 md:mb-4" style={{ color: levelMeta[i].accent }}>Level {levelMeta[i].n}</div>
                  <h4 className="text-sm font-bold text-white mb-1">{l.name}</h4>
                  <p className="text-[11px] text-[#888] mb-2 md:mb-3">{l.desc}</p>
                  <p className="text-[10px] text-[#666]">{l.who}</p>
                </div>
              ))}
              <div className="p-5 md:p-8 bg-[#4d8eff]/[0.06] border-t md:border-t-0 md:border-l-2 border-[#4d8eff]/30 relative">
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#4d8eff] text-white text-[8px] font-bold uppercase rounded tracking-wider">{t.levels.badge}</div>
                <div className="text-[10px] text-[#4d8eff] tracking-[0.2em] uppercase mb-3 md:mb-4">Level 04</div>
                <h4 className="text-sm font-bold text-white mb-1">{t.levels.l4.name}</h4>
                <p className="text-[11px] text-[#4d8eff]/60 mb-2 md:mb-3">{t.levels.l4.desc}</p>
                <p className="text-[10px] text-[#4d8eff]/40">{t.levels.l4.who}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-8 text-[13px] text-[#444] text-left">
              {t.levels.closing}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ HOW THE SYSTEM WORKS ═══════════════════ */}
      <section className="py-14 md:py-36 px-6 md:px-10 border-t border-white/[0.04]" id="proof">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="text-[13px] text-[#4d8eff] font-medium tracking-[0.2em] uppercase mb-4">{t.system.label}</p>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white leading-[1.05] mb-2">
              {t.system.headline}
            </h2>
            <p className="text-sm md:text-lg text-[#555] mb-6 md:mb-16">
              {t.system.sub}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            <FadeInStagger className="space-y-3 md:space-y-4 flex flex-col justify-between">
              {t.system.principles.map((item, i) => {
                const Icon = principleIcons[i]
                return (
                  <FadeInItem key={i}>
                    <div className="flex gap-4 p-4 md:p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors cursor-default">
                      <Icon className="w-5 h-5 text-[#4d8eff] mt-0.5 shrink-0" strokeWidth={1.5} />
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-[13px] text-[#666] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeInItem>
                )
              })}
            </FadeInStagger>

            <FadeIn delay={0.2}>
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.01] h-full min-h-[280px] md:min-h-[400px] overflow-hidden relative group cursor-pointer"
                onClick={(e) => {
                  const video = e.currentTarget.querySelector('video')
                  if (video) video.muted = !video.muted
                }}
              >
                <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/system-video-audio.mp4" />
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs">🔇</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROCESS ═══════════════════ */}
      <section className="py-14 md:py-36 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="text-right">
            <p className="text-[13px] text-[#4d8eff] font-medium tracking-[0.2em] uppercase mb-4">{t.process.label}</p>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white leading-[1.05] mb-2">
              {t.process.headline}
            </h2>
            <p className="text-xl font-bold text-[#333] mb-16">{t.process.sub}</p>
          </FadeIn>
          <FadeInStagger className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {t.process.steps.map((step, i) => (
              <FadeInItem key={i}>
                <div className={`rounded-xl p-7 md:p-8 h-full ${i === 0 ? 'bg-[#4d8eff]/[0.06] border border-[#4d8eff]/[0.15]' : 'bg-white/[0.02] border border-white/[0.05]'}`}>
                  <div className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-6 ${i === 0 ? 'text-[#4d8eff]' : 'text-[#444]'}`}>Step {String(i + 1).padStart(2, '0')}</div>
                  <h4 className="text-xl font-black text-white mb-1">{step.name}</h4>
                  <p className={`text-[11px] font-semibold uppercase tracking-wider mb-4 ${i === 0 ? 'text-[#4d8eff]/60' : 'text-[#444]'}`}>{step.time}</p>
                  <p className="text-[13px] text-[#666] leading-relaxed">{step.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-[13px] text-[#444]">
              {t.process.note}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section className="py-14 md:py-36 px-6 md:px-10 border-t border-white/[0.04]" id="contact">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <FadeIn>
              <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white leading-[1.05] mb-4">
                {t.contact.headline}
              </h2>
              <p className="text-[15px] text-[#666] leading-relaxed mb-8 max-w-md">
                {t.contact.sub}
              </p>
              <div className="space-y-4 text-[13px] text-[#555]">
                {t.contact.bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4d8eff]" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget
                const data = new FormData(form)
                fetch('https://formspree.io/f/mwvwaypr', { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
                window.open('https://wa.me/5511947276831?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20solu%C3%A7%C3%B5es%20de%20AI%20para%20meu%20neg%C3%B3cio.%20Acabei%20de%20enviar%20meus%20dados%20pelo%20site', '_blank')
              }}>
                <div>
                  <label className="text-[11px] text-[#555] uppercase tracking-[0.15em] block mb-2">{t.contact.form.name}</label>
                  <input type="text" name="name" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder-[#333] focus:border-[#4d8eff]/50 focus:outline-none transition-colors" placeholder={t.contact.form.namePlaceholder} />
                </div>
                <div>
                  <label className="text-[11px] text-[#555] uppercase tracking-[0.15em] block mb-2">{t.contact.form.email}</label>
                  <input type="email" name="email" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder-[#333] focus:border-[#4d8eff]/50 focus:outline-none transition-colors" placeholder={t.contact.form.emailPlaceholder} />
                </div>
                <div>
                  <label className="text-[11px] text-[#555] uppercase tracking-[0.15em] block mb-2">{t.contact.form.message}</label>
                  <textarea rows={4} name="message" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder-[#333] focus:border-[#4d8eff]/50 focus:outline-none transition-colors resize-none" placeholder={t.contact.form.messagePlaceholder} />
                </div>
                <button type="submit" className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#4d8eff] text-white font-medium rounded-lg transition-all shadow-[0_0_40px_rgba(77,142,255,0.15)] hover:shadow-[0_0_60px_rgba(77,142,255,0.3)] hover:bg-[#5d96ff] cursor-pointer text-[14px]">
                  {t.contact.form.submit} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8 px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto">
          <div className="text-[10px] font-medium text-[#333] mb-3 md:mb-0 uppercase tracking-[0.15em]">LEED Digital © 2026</div>
          <div className="flex gap-6 text-[11px] text-[#444]">
            <a href="https://www.linkedin.com/company/leed-digital" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">LinkedIn</a>
            <a href="mailto:info@leed.digital" className="hover:text-white transition-colors cursor-pointer">info@leed.digital</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
