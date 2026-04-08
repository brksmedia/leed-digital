import { useState } from 'react'
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn'
import { motion } from 'framer-motion'
import {
  Bot, Database, Layers, Activity, ArrowRight, ArrowUpRight,
  AlertTriangle, Unplug, FileX, Cog, Play, Volume2, VolumeX,
  Menu, X
} from 'lucide-react'
import { translations, type Lang } from '../i18n'

declare function gtag(...args: unknown[]): void

function getLangFromURL(): Lang {
  const params = new URLSearchParams(window.location.search)
  const keys = Array.from(params.keys())
  if (keys.includes('en-us')) return 'en'
  return 'pt'
}

const problemIcons = [Unplug, AlertTriangle, FileX, Cog]

const levelData = [
  { n: '01', accent: '#5a8abf', bg: 'rgba(59,107,158,0.06)' },
  { n: '02', accent: '#5aab8a', bg: 'rgba(59,158,122,0.06)' },
  { n: '03', accent: '#c49a4a', bg: 'rgba(196,154,74,0.06)' },
]

export function V2Homepage() {
  const [lang, setLang] = useState<Lang>(getLangFromURL)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [emailError, setEmailError] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [videoMuted, setVideoMuted] = useState(true)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const t = translations[lang]

  const scrollTo = (id: string) => {
    setMobileMenu(false)
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const navLinks = lang === 'pt'
    ? [
        { label: 'Problema', id: 'v2-problem' },
        { label: 'Framework', id: 'v2-levels' },
        { label: 'Sistema', id: 'v2-system' },
        { label: 'Processo', id: 'v2-process' },
        { label: 'Resultados', id: 'v2-proof' },
      ]
    : [
        { label: 'Problem', id: 'v2-problem' },
        { label: 'Framework', id: 'v2-levels' },
        { label: 'System', id: 'v2-system' },
        { label: 'Process', id: 'v2-process' },
        { label: 'Results', id: 'v2-proof' },
      ]

  return (
    <div className="min-h-screen bg-[#080808] relative overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* ═══════════════════ NAV ═══════════════════ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-0 w-full z-50 bg-[#080808]/80 backdrop-blur-2xl border-b border-white/[0.06]"
      >
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-[1200px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <a href="/v2" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-md bg-[#4d8eff] flex items-center justify-center">
                <span className="text-white text-[11px] font-extrabold tracking-tight">L</span>
              </div>
              <span className="text-[14px] font-bold tracking-[-0.02em] text-white/90 group-hover:text-white transition-colors">
                LEED<span className="text-white/40 font-normal ml-1">Digital</span>
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-[12px] text-white/40 hover:text-white/80 transition-colors cursor-pointer font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language */}
            <div className="flex gap-1 text-[11px] font-semibold">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded cursor-pointer transition-all ${lang === 'en' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('pt')}
                className={`px-2 py-1 rounded cursor-pointer transition-all ${lang === 'pt' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
              >
                PT
              </button>
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo('v2-contact')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#4d8eff] text-white text-[12px] font-semibold rounded-lg hover:bg-[#5d96ff] transition-colors cursor-pointer"
            >
              {t.nav.cta} <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white/60 hover:text-white cursor-pointer"
            >
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/[0.06] bg-[#080808]/95 backdrop-blur-2xl px-6 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer w-full text-left py-1"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('v2-contact')}
              className="block text-[13px] text-[#4d8eff] font-semibold cursor-pointer w-full text-left py-1"
            >
              {t.nav.cta}
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#4d8eff]/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-[#4d8eff]/[0.02] blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full px-6 md:px-10 max-w-[1200px] mx-auto pt-32 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[12px] text-[#4d8eff] font-semibold tracking-[0.2em] uppercase mb-6">
              {t.hero.label}
            </p>

            <h1
              className="text-[clamp(2.5rem,7vw,5.5rem)] tracking-[-0.035em] text-white leading-[1.0] mb-8"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {t.hero.headline}
            </h1>

            <p className="text-[17px] md:text-[19px] text-[#a0a0a0] max-w-lg mb-12 leading-[1.7] font-light">
              {t.hero.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo('v2-system')}
                className="group px-7 py-3.5 bg-[#4d8eff] text-white font-semibold rounded-lg transition-all hover:bg-[#5d96ff] shadow-[0_0_50px_rgba(77,142,255,0.15)] hover:shadow-[0_0_80px_rgba(77,142,255,0.25)] cursor-pointer text-[14px] flex items-center justify-center gap-2"
              >
                {t.hero.cta1} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('v2-contact')}
                className="px-7 py-3.5 text-white/60 hover:text-white font-semibold rounded-lg transition-all cursor-pointer text-[14px] border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.03]"
              >
                {t.hero.cta2}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
        </motion.div>
      </section>

      {/* ═══════════════════ PROBLEM ═══════════════════ */}
      <section className="py-20 md:py-40 px-6 md:px-10" id="v2-problem">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="text-[12px] text-[#c49a4a] font-semibold tracking-[0.2em] uppercase mb-4">
              {lang === 'pt' ? 'O Problema' : 'The Problem'}
            </p>
            <h2
              className="text-[clamp(2rem,4.5vw,3.8rem)] tracking-[-0.03em] text-white leading-[1.1] max-w-3xl mb-14 md:mb-20"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {t.problem.headline}
            </h2>
          </FadeIn>

          <FadeInStagger className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {t.problem.points.map((text, i) => {
              const Icon = problemIcons[i]
              return (
                <FadeInItem key={i}>
                  <div className="group p-6 md:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all hover:bg-white/[0.03] cursor-default">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/[0.08] flex items-center justify-center shrink-0 group-hover:bg-red-500/[0.12] transition-colors">
                        <Icon className="w-4.5 h-4.5 text-red-400/80" strokeWidth={1.5} />
                      </div>
                      <p className="text-[15px] text-[#b0b0b0] leading-[1.7] pt-1.5">{text}</p>
                    </div>
                  </div>
                </FadeInItem>
              )
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* ═══════════════════ LEVELS ═══════════════════ */}
      <section className="py-20 md:py-40 px-6 md:px-10 border-t border-white/[0.04]" id="v2-levels">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="mb-14 md:mb-20 md:text-right">
            <p className="text-[12px] text-[#4d8eff] font-semibold tracking-[0.2em] uppercase mb-4">{t.levels.label}</p>
            <h2
              className="text-[clamp(2rem,4.5vw,3.8rem)] tracking-[-0.03em] text-white leading-[1.1]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {t.levels.headline1}
            </h2>
            <h2
              className="text-[clamp(2rem,4.5vw,3.8rem)] tracking-[-0.03em] text-[#4d8eff] leading-[1.1]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {t.levels.headline2}
            </h2>
          </FadeIn>

          <FadeIn>
            {/* Desktop: horizontal grid. Mobile: vertical stack */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 md:border md:border-white/[0.06] md:rounded-2xl md:overflow-hidden">
              {t.levels.items.map((l, i) => (
                <div
                  key={i}
                  className="p-6 md:p-7 rounded-2xl md:rounded-none border border-white/[0.06] md:border-0 md:border-r md:border-white/[0.06] last:border-r-0"
                  style={{ background: levelData[i].bg }}
                >
                  <div className="text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold" style={{ color: levelData[i].accent }}>
                    Level {levelData[i].n}
                  </div>
                  <h4 className="text-[16px] font-bold text-white mb-2">{l.name}</h4>
                  <p className="text-[13px] text-[#999] mb-3 leading-relaxed">{l.desc}</p>
                  <p className="text-[11px] text-[#666] font-medium">{l.who}</p>
                </div>
              ))}

              {/* Level 4 — highlighted */}
              <div className="p-6 md:p-7 rounded-2xl md:rounded-none bg-[#4d8eff]/[0.06] border-2 border-[#4d8eff]/20 md:border-0 md:border-l-2 md:border-[#4d8eff]/30 relative">
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#4d8eff] text-white text-[9px] font-bold uppercase rounded-md tracking-wider">
                  {t.levels.badge}
                </div>
                <div className="text-[11px] text-[#4d8eff] tracking-[0.2em] uppercase mb-4 font-semibold">Level 04</div>
                <h4 className="text-[16px] font-bold text-white mb-2">{t.levels.l4.name}</h4>
                <p className="text-[13px] text-[#4d8eff]/70 mb-3 leading-relaxed">{t.levels.l4.desc}</p>
                <p className="text-[11px] text-[#4d8eff]/50 font-medium">{t.levels.l4.who}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-10 text-[14px] text-[#777] leading-relaxed md:text-right italic" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              "{t.levels.closing}"
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ SYSTEM ═══════════════════ */}
      <section className="py-20 md:py-40 px-6 md:px-10 border-t border-white/[0.04]" id="v2-system">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="text-[12px] text-[#4d8eff] font-semibold tracking-[0.2em] uppercase mb-4">{t.system.label}</p>
            <h2
              className="text-[clamp(2rem,4.5vw,3.8rem)] tracking-[-0.03em] text-white leading-[1.1] mb-3"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {t.system.headline}
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#888] mb-10 md:mb-16 max-w-2xl leading-relaxed">
              {t.system.sub}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            <FadeInStagger className="space-y-3 md:space-y-4 flex flex-col justify-between">
              {t.system.principles.map((item, i) => {
                const Icon = [Bot, Database, Activity, Layers][i]
                return (
                  <FadeInItem key={i}>
                    <div className="group flex gap-4 p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all hover:bg-white/[0.03] cursor-default">
                      <div className="w-10 h-10 rounded-xl bg-[#4d8eff]/[0.08] flex items-center justify-center shrink-0 group-hover:bg-[#4d8eff]/[0.12] transition-colors">
                        <Icon className="w-4.5 h-4.5 text-[#4d8eff]/80" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-[13px] text-[#999] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeInItem>
                )
              })}
            </FadeInStagger>

            <FadeIn delay={0.2}>
              <div
                className="rounded-2xl border border-white/[0.06] bg-white/[0.01] h-full min-h-[280px] md:min-h-[400px] overflow-hidden relative group"
              >
                <video
                  autoPlay
                  loop
                  muted={videoMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  src="/system-video-audio.mp4"
                />
                {/* Video overlay with controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] text-white/60 font-medium">
                    {lang === 'pt' ? 'Demo do sistema' : 'System demo'}
                  </span>
                  <button
                    onClick={() => setVideoMuted(!videoMuted)}
                    className="w-8 h-8 rounded-full bg-white/[0.15] hover:bg-white/[0.25] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {videoMuted
                      ? <VolumeX className="w-3.5 h-3.5 text-white" />
                      : <Volume2 className="w-3.5 h-3.5 text-white" />
                    }
                  </button>
                </div>
                {/* Initial play indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROCESS ═══════════════════ */}
      <section className="py-20 md:py-40 px-6 md:px-10 border-t border-white/[0.04]" id="v2-process">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="md:text-right mb-14 md:mb-20">
            <p className="text-[12px] text-[#4d8eff] font-semibold tracking-[0.2em] uppercase mb-4">{t.process.label}</p>
            <h2
              className="text-[clamp(2rem,4.5vw,3.8rem)] tracking-[-0.03em] text-white leading-[1.1] mb-3"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {t.process.headline}
            </h2>
            <p
              className="text-[clamp(1.2rem,2.5vw,1.8rem)] text-[#4d8eff]/60 font-light"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {t.process.sub}
            </p>
          </FadeIn>

          <FadeInStagger className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {t.process.steps.map((step, i) => (
              <FadeInItem key={i}>
                <div className={`rounded-2xl p-7 md:p-8 h-full ${i === 0 ? 'bg-[#4d8eff]/[0.06] border-2 border-[#4d8eff]/[0.15]' : 'bg-white/[0.02] border border-white/[0.06]'}`}>
                  <div className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-6 ${i === 0 ? 'text-[#4d8eff]' : 'text-[#666]'}`}>
                    Step {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-[22px] font-extrabold text-white mb-2 tracking-[-0.02em]">{step.name}</h4>
                  <p className={`text-[12px] font-semibold uppercase tracking-wider mb-5 ${i === 0 ? 'text-[#4d8eff]/60' : 'text-[#666]'}`}>
                    {step.time}
                  </p>
                  <p className="text-[14px] text-[#999] leading-[1.7]">{step.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          <FadeIn delay={0.2}>
            <p className="mt-10 text-[13px] text-[#777] leading-relaxed">
              {t.process.note}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ SOCIAL PROOF ═══════════════════ */}
      <section className="py-20 md:py-40 px-6 md:px-10 border-t border-white/[0.04] relative" id="v2-proof">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4d8eff]/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <FadeIn>
            <p className="text-[12px] text-[#c49a4a] font-semibold tracking-[0.2em] uppercase mb-4">
              {lang === 'pt' ? 'Na Pratica' : 'In Practice'}
            </p>
            <h2
              className="text-[clamp(2rem,4.5vw,3.8rem)] tracking-[-0.03em] text-white leading-[1.1] mb-6 max-w-2xl"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {lang === 'pt'
                ? 'Nao vendemos teoria. Operamos o que construimos.'
                : "We don't sell theory. We operate what we build."}
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#888] mb-14 md:mb-20 max-w-2xl leading-relaxed">
              {lang === 'pt'
                ? 'A LEED Digital opera seu proprio negocio com um sistema de 7 agentes AI autonomos. O mesmo framework que oferecemos aos clientes.'
                : 'LEED Digital operates its own business with a system of 7 autonomous AI agents. The same framework we offer to clients.'}
            </p>
          </FadeIn>

          <FadeInStagger className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-14 md:mb-20">
            {(lang === 'pt' ? [
              { metric: '7', label: 'Agentes AI', desc: 'Operando autonomamente em tempo real' },
              { metric: '24/7', label: 'Monitoramento', desc: 'Auto-deteccao de anomalias sem intervencao humana' },
              { metric: '3', label: 'Negocios', desc: 'Gerenciados simultaneamente pelo mesmo sistema' },
            ] : [
              { metric: '7', label: 'AI Agents', desc: 'Operating autonomously in real time' },
              { metric: '24/7', label: 'Monitoring', desc: 'Self-detecting anomalies without human intervention' },
              { metric: '3', label: 'Businesses', desc: 'Managed simultaneously by the same system' },
            ]).map((item, i) => (
              <FadeInItem key={i}>
                <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#c49a4a]/20 transition-colors cursor-default">
                  <div
                    className="text-[clamp(2.5rem,5vw,3.5rem)] font-light text-white mb-1 tracking-[-0.03em]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    {item.metric}
                  </div>
                  <h4 className="text-[14px] font-bold text-[#c49a4a] mb-2">{item.label}</h4>
                  <p className="text-[13px] text-[#888] leading-relaxed">{item.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          {/* Capabilities */}
          <FadeIn>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {(lang === 'pt' ? [
                { title: 'Briefing diario automatico', desc: 'CEO recebe relatorio financeiro + decisoes pendentes todas as manhas. Gerado por AI, nao por humano.' },
                { title: 'Alertas em tempo real', desc: 'Sistema monitora performance de campanhas e notifica o time quando metricas saem do normal. Sem ninguem verificando dashboards.' },
                { title: 'Integracao multi-plataforma', desc: 'ClickBank, Meta Ads, Taboola, Supabase, Slack — todos os dados centralizados e cruzados automaticamente.' },
                { title: 'Decisoes autonomas', desc: 'Agentes tomam decisoes operacionais dentro de regras. Escalam pro humano apenas quando necessario.' },
              ] : [
                { title: 'Automated daily briefing', desc: 'CEO receives financial report + pending decisions every morning. Generated by AI, not by a human.' },
                { title: 'Real-time alerts', desc: 'System monitors campaign performance and notifies the team when metrics deviate. No one checking dashboards.' },
                { title: 'Multi-platform integration', desc: 'ClickBank, Meta Ads, Taboola, Supabase, Slack — all data centralized and cross-referenced automatically.' },
                { title: 'Autonomous decisions', desc: 'Agents make operational decisions within rules. Escalate to humans only when necessary.' },
              ]).map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.015] border border-white/[0.05] hover:border-white/[0.1] transition-colors cursor-default">
                  <h4 className="text-[14px] font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-[13px] text-[#999] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section className="py-20 md:py-40 px-6 md:px-10 border-t border-white/[0.04]" id="v2-contact">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <FadeIn>
              <h2
                className="text-[clamp(2rem,4.5vw,3.8rem)] tracking-[-0.03em] text-white leading-[1.1] mb-5"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {t.contact.headline}
              </h2>
              <p className="text-[16px] text-[#999] leading-[1.7] mb-10 max-w-md">
                {t.contact.sub}
              </p>
              <div className="space-y-4">
                {t.contact.bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4d8eff]" />
                    <span className="text-[14px] text-[#999]">{b}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center min-h-[320px] text-center">
                  <div className="w-14 h-14 rounded-full bg-[#4d8eff]/[0.1] flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#4d8eff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[#4d8eff] text-[15px] font-medium mb-3">{t.contact.form.success}</p>
                  <button
                    onClick={() => window.open('https://wa.me/5511947276831?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20solu%C3%A7%C3%B5es%20de%20AI%20para%20meu%20neg%C3%B3cio.%20Acabei%20de%20enviar%20meus%20dados%20pelo%20site', '_blank')}
                    className="mt-4 px-5 py-2.5 text-[13px] text-white/60 hover:text-white border border-white/[0.1] hover:border-white/[0.2] rounded-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    {lang === 'pt' ? 'Falar no WhatsApp' : 'Chat on WhatsApp'} <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const data = new FormData(form)
                  const name = (data.get('name') as string || '').trim()
                  const email = (data.get('email') as string || '').trim()
                  if (!name || !email) return
                  if (!emailRegex.test(email)) { setEmailError(true); return }
                  setEmailError(false)
                  setFormStatus('sending')
                  try {
                    const res = await fetch('https://formspree.io/f/mwvwaypr', { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
                    if (!res.ok) throw new Error()
                    if (typeof gtag === 'function') {
                      gtag('event', 'conversion', { 'send_to': 'AW-16851840618/F-r4CKe8lZgcEOrcyuM-' })
                    }
                    setFormStatus('success')
                  } catch {
                    setFormStatus('error')
                  }
                }}>
                  <div>
                    <label className="text-[11px] text-[#888] uppercase tracking-[0.15em] block mb-2 font-semibold">{t.contact.form.name}</label>
                    <input type="text" name="name" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white text-[14px] placeholder-[#444] focus:border-[#4d8eff]/50 focus:outline-none transition-colors" placeholder={t.contact.form.namePlaceholder} />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#888] uppercase tracking-[0.15em] block mb-2 font-semibold">{t.contact.form.email}</label>
                    <input type="email" name="email" required className={`w-full bg-white/[0.03] border rounded-xl px-5 py-3.5 text-white text-[14px] placeholder-[#444] focus:outline-none transition-colors ${emailError ? 'border-red-500/60 focus:border-red-500' : 'border-white/[0.08] focus:border-[#4d8eff]/50'}`} placeholder={t.contact.form.emailPlaceholder} onChange={() => emailError && setEmailError(false)} />
                    {emailError && <p className="text-red-400 text-xs mt-1.5">{t.contact.form.invalidEmail}</p>}
                  </div>
                  <div>
                    <label className="text-[11px] text-[#888] uppercase tracking-[0.15em] block mb-2 font-semibold">{t.contact.form.message}</label>
                    <textarea rows={4} name="message" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white text-[14px] placeholder-[#444] focus:border-[#4d8eff]/50 focus:outline-none transition-colors resize-none" placeholder={t.contact.form.messagePlaceholder} />
                  </div>
                  {formStatus === 'error' && <p className="text-red-400 text-[13px]">{t.contact.form.error}</p>}
                  <button type="submit" disabled={formStatus === 'sending'} className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#4d8eff] text-white font-semibold rounded-xl transition-all shadow-[0_0_50px_rgba(77,142,255,0.15)] hover:shadow-[0_0_80px_rgba(77,142,255,0.3)] hover:bg-[#5d96ff] cursor-pointer text-[14px] disabled:opacity-50 disabled:cursor-not-allowed">
                    {formStatus === 'sending' ? t.contact.form.sending : t.contact.form.submit} {formStatus !== 'sending' && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-white/[0.04] py-12 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-6 h-6 rounded-md bg-[#4d8eff] flex items-center justify-center">
                  <span className="text-white text-[9px] font-extrabold tracking-tight">L</span>
                </div>
                <span className="text-[13px] font-bold tracking-[-0.02em] text-white/70">
                  LEED<span className="text-white/30 font-normal ml-1">Digital</span>
                </span>
              </div>
              <p className="text-[12px] text-[#555] max-w-xs leading-relaxed">
                {lang === 'pt'
                  ? 'Solucoes de AI para problemas reais de negocio.'
                  : 'AI solutions for real business problems.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              <div className="space-y-2">
                <p className="text-[10px] text-[#555] uppercase tracking-[0.15em] font-semibold mb-2">
                  {lang === 'pt' ? 'Contato' : 'Contact'}
                </p>
                <a href="mailto:info@leed.digital" className="block text-[12px] text-[#777] hover:text-white transition-colors cursor-pointer">info@leed.digital</a>
                <a href="https://wa.me/5511947276831" target="_blank" rel="noopener noreferrer" className="block text-[12px] text-[#777] hover:text-white transition-colors cursor-pointer">WhatsApp</a>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-[#555] uppercase tracking-[0.15em] font-semibold mb-2">
                  {lang === 'pt' ? 'Links' : 'Links'}
                </p>
                <a href="https://www.linkedin.com/company/leed-digital" target="_blank" rel="noopener noreferrer" className="block text-[12px] text-[#777] hover:text-white transition-colors cursor-pointer">LinkedIn</a>
                <button onClick={() => scrollTo('v2-contact')} className="block text-[12px] text-[#777] hover:text-white transition-colors cursor-pointer text-left">{lang === 'pt' ? 'Agendar diagnostico' : 'Book a diagnostic'}</button>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-[10px] text-[#444] uppercase tracking-[0.15em]">LEED Digital &copy; 2026</div>
            <div className="text-[10px] text-[#333]">
              {lang === 'pt' ? 'Sao Paulo, Brasil' : 'Sao Paulo, Brazil'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
