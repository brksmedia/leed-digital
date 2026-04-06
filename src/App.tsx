import './App.css'
import { FadeIn, FadeInStagger, FadeInItem } from './components/FadeIn'
import { GridBackground } from './components/GridBackground'
import { HeroGlow } from './components/HeroGlow'
import { motion } from 'framer-motion'

const agents = [
  { icon: 'smart_toy', name: 'CEO', desc: 'Orchestrates all agents. Distributes tasks, consolidates results, reports.' },
  { icon: 'account_balance', name: 'CFO', desc: 'Revenue, expenses, margins. Daily financial reports with cross-validation.' },
  { icon: 'campaign', name: 'CMO', desc: 'Campaigns, channels, content. Creative analysis and performance.' },
  { icon: 'settings_suggest', name: 'COO', desc: 'Processes, improvements, operational efficiency.' },
  { icon: 'terminal', name: 'CTO', desc: 'Tech stack, data pipelines, landing pages.' },
  { icon: 'database', name: 'CDO', desc: 'Data quality, schemas, queries, integrity.' },
  { icon: 'palette', name: 'CDesO', desc: 'Visual audits, design system, consistency.' },
]

const metrics = [
  { value: '$100K+', label: 'Monthly ad spend' },
  { value: '30 min', label: 'Monitoring cycles' },
  { value: '90%', label: 'Manual task reduction' },
  { value: '1 vs 15', label: 'Person vs typical team' },
  { value: '24/7', label: 'Anomaly detection' },
  { value: 'Daily', label: 'Cross-validated reports' },
]

const painPoints = [
  { dot: 'bg-dot-red', text: 'Your team spends hours building reports nobody uses to make decisions.' },
  { dot: 'bg-dot-amber', text: "Decisions are made with yesterday's data — if not last week's." },
  { dot: 'bg-dot-amber', text: 'Every new hire costs $5-10K/month and takes 3 months to deliver value.' },
  { dot: 'bg-dot-red', text: "Your operation depends on 3 people who can't get sick at the same time." },
]

const levels = [
  { level: '01', name: 'Assistance', desc: 'Responds when you ask. You decide everything.', dim: 'opacity-35' },
  { level: '02', name: 'Automation', desc: 'Executes repetitive tasks on its own. You supervise.', dim: 'opacity-45' },
  { level: '03', name: 'Operations', desc: 'Makes decisions within defined rules. You intervene by exception.', dim: 'opacity-65' },
]

const steps = [
  { num: '01', name: 'Diagnostic', time: '1 to 2 weeks', desc: "We map your operation. Identify where AI generates real ROI — not where it looks good on a PowerPoint. You get a plan with scope, timeline, and cost.", accent: true },
  { num: '02', name: 'Build', time: '4 to 8 weeks', desc: 'We develop the agents, integrations, and workflows. You follow progress in real time. Nothing is a black box.', accent: false },
  { num: '03', name: 'Operate', time: 'Ongoing', desc: 'AI goes into production. We monitor, adjust, expand. The operation improves over time because agents learn from your business data.', accent: false },
]

const infra = [
  { icon: 'security', title: 'Data Isolation', desc: 'Data isolated per client — none of your data is shared.' },
  { icon: 'history_edu', title: 'Audit Logs', desc: 'Full log of every decision by every agent — auditable at any time.' },
  { icon: 'api', title: 'Any Integration', desc: 'Integrates with any API, database, or tool you already use.' },
  { icon: 'layers', title: 'Semantic Layer', desc: 'A single source of truth for the entire business.' },
  { icon: 'monitor_heart', title: 'Real-Time Monitoring', desc: 'Problems are detected before they become crises.' },
  { icon: 'lock_open', title: 'No Lock-in', desc: 'You own all the infrastructure. If you leave, you take everything.' },
]

function App() {
  return (
    <div className="min-h-screen bg-bg text-text-secondary relative">
      <GridBackground />

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-0 w-full z-50 bg-bg/60 backdrop-blur-2xl border-b border-border/40"
      >
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-6xl mx-auto">
          <div className="text-base font-black tracking-tight text-white uppercase">LEED Digital</div>
          <a href="#contact" className="hidden md:block bg-accent hover:bg-accent-dim text-white px-5 py-2 rounded-md font-semibold text-sm transition-colors">
            Talk to LEED
          </a>
        </div>
      </motion.nav>

      {/* HERO */}
      <header className="pt-40 md:pt-52 pb-28 md:pb-36 px-6 md:px-8 max-w-5xl mx-auto text-center relative">
        <HeroGlow />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.04em] text-white leading-[0.92] mb-8">
            1 person. 7 AI agents.
            <br />
            <span className="text-accent">$100K/month</span> in paid media.
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-3 leading-relaxed">
            This is how a real US marketing company operates.
          </p>
          <p className="text-xl md:text-2xl text-white font-bold mb-14">
            We build this for you too.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <a href="#proof" className="group px-8 py-4 bg-accent text-white font-semibold rounded-md transition-all shadow-[0_0_30px_rgba(77,142,255,0.2)] hover:shadow-[0_0_40px_rgba(77,142,255,0.35)] hover:scale-[1.02]">
            See how it works
          </a>
          <a href="#contact" className="px-8 py-4 bg-transparent border border-border text-white font-semibold rounded-md hover:bg-surface-high hover:border-border/80 transition-all">
            Talk to LEED
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-sm text-text-muted tracking-wide"
        >
          AI solutions development — from a single API integration to a full operating system.
        </motion.p>
      </header>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-8"><div className="border-t border-border/30" /></div>

      {/* PROBLEM */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-white leading-[1.05] mb-4">
              You don't have a technology problem.
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-text-muted/50 leading-tight">
              You have an operations problem.
            </p>
          </FadeIn>
          <FadeInStagger className="space-y-3">
            {painPoints.map((item, i) => (
              <FadeInItem key={i}>
                <div className="p-5 bg-surface/80 rounded-lg border border-border/60 flex items-start gap-4 hover:border-border transition-colors">
                  <div className={`w-2 h-2 rounded-full ${item.dot} mt-2 shrink-0`} />
                  <p className="text-white/90 text-sm font-medium leading-relaxed">{item.text}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* REFRAME N1-N4 */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-14">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] mb-3">
              Most companies use AI at Level 1.
            </h2>
            <p className="text-2xl md:text-3xl font-black text-accent">We operate at Level 4.</p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {levels.map((item, i) => (
              <FadeInItem key={i}>
                <div className={`p-6 bg-surface border border-border/50 rounded-lg ${item.dim} hover:opacity-70 transition-opacity`}>
                  <div className="text-[10px] font-bold text-text-muted mb-3 tracking-[0.2em] uppercase">Level {item.level}</div>
                  <h4 className="text-lg font-black text-white mb-2">{item.name}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </FadeInItem>
            ))}
            <FadeInItem>
              <div className="p-7 bg-surface border-2 border-accent/60 rounded-lg relative shadow-[0_0_60px_rgba(77,142,255,0.06)] hover:shadow-[0_0_80px_rgba(77,142,255,0.1)] transition-shadow">
                <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-accent text-white text-[9px] font-black uppercase rounded tracking-wider">We are here</div>
                <div className="text-[10px] font-black text-accent mb-3 tracking-[0.2em] uppercase">Level 04</div>
                <h4 className="text-xl font-black text-white mb-2">Autonomous Management</h4>
                <p className="text-xs text-accent/70 leading-relaxed">Runs entire areas of the business. You set the strategy.</p>
              </div>
            </FadeInItem>
          </FadeInStagger>
          <FadeIn delay={0.3}>
            <p className="mt-10 text-text-secondary text-sm max-w-3xl italic">
              The difference between using AI and operating with AI is the same difference between having an intern and having a C-level.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-8"><div className="border-t border-border/30" /></div>

      {/* PROOF — C-SYSTEM */}
      <section className="py-24 md:py-32 px-6 md:px-8" id="proof">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-[-0.03em]">
              7 AI agents running a real company.
              <br />
              <span className="text-accent">24 hours. 7 days.</span>
            </h2>
            <p className="text-text-secondary mb-14 text-sm">
              C-System runs our own US performance marketing company. Not a prototype. In production.
            </p>
          </FadeIn>

          {/* Agents */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-px bg-border/20 border border-border/50 rounded-lg overflow-hidden mb-px">
              {agents.map((agent, i) => (
                <div key={i} className="bg-bg p-5 hover:bg-surface transition-colors group">
                  <span className="material-symbols-outlined text-accent/60 group-hover:text-accent mb-3 text-xl transition-colors">{agent.icon}</span>
                  <h5 className="font-black text-white text-xs mb-1.5">{agent.name}</h5>
                  <p className="text-[10px] text-text-muted leading-snug">{agent.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Metrics */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border/20 border border-border/50 border-t-0 rounded-b-lg overflow-hidden mb-12">
              {metrics.map((m, i) => (
                <div key={i} className="bg-surface/60 p-6 hover:bg-surface transition-colors">
                  <div className="text-2xl md:text-3xl font-black text-accent mb-1">{m.value}</div>
                  <p className="text-[10px] text-text-muted uppercase font-semibold tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-white text-sm font-medium">
              This is not a pitch deck slide. This is the operation running the business today.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-[-0.03em] mb-3">
              From first conversation to AI operating.
            </h2>
            <p className="text-2xl md:text-3xl font-black text-text-muted/50 mb-16">Weeks, not months.</p>
          </FadeIn>
          <FadeInStagger className="grid md:grid-cols-3 gap-10 md:gap-12">
            {steps.map((step, i) => (
              <FadeInItem key={i}>
                <div className="group">
                  <div className={`w-12 h-12 ${step.accent ? 'bg-accent shadow-[0_0_20px_rgba(77,142,255,0.2)]' : 'bg-surface-higher border border-border'} text-white font-black flex items-center justify-center mb-6 rounded-lg text-lg group-hover:scale-105 transition-transform`}>
                    {step.num}
                  </div>
                  <h4 className="text-xl font-black text-white mb-2">{step.name}</h4>
                  <p className="text-[11px] text-accent font-semibold mb-3 uppercase tracking-wider">{step.time}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
          <FadeIn delay={0.3}>
            <p className="mt-14 text-sm text-text-muted max-w-2xl">
              The scope can be a single API integration or a complete system with multiple agents. The diagnostic determines the right size for you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-8"><div className="border-t border-border/30" /></div>

      {/* INFRASTRUCTURE */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-12 tracking-[-0.02em]">
              Built to run in production. Not in a demo.
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {infra.map((item, i) => (
              <FadeInItem key={i}>
                <div className="p-6 bg-surface/60 border border-border/40 rounded-lg hover:border-accent/30 hover:bg-surface transition-all group">
                  <span className="material-symbols-outlined text-accent/50 group-hover:text-accent mb-3 transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  <h5 className="text-sm font-black text-white mb-2">{item.title}</h5>
                  <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-24 md:py-32 px-6 md:px-8 max-w-3xl mx-auto text-center">
        <FadeIn>
          <div className="w-24 h-24 rounded-full bg-surface border border-border mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl font-black text-text-muted">LB</span>
          </div>
          <h3 className="text-2xl font-black text-white mb-1">Lucas Brinks</h3>
          <p className="text-xs text-accent font-semibold uppercase tracking-[0.2em] mb-6">Founder, LEED Digital</p>
          <p className="text-sm text-text-muted">Based in Brazil. Global operation.</p>
        </FadeIn>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 md:py-36 px-6 md:px-8 text-center relative" id="contact">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/4 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-10 tracking-[-0.03em] leading-[1.05]">
              Your operation can run differently.
              <br />
              Let us show you how.
            </h2>
            <a href="#" className="inline-block px-10 py-4 bg-accent text-white font-semibold text-lg rounded-md transition-all shadow-[0_0_30px_rgba(77,142,255,0.2)] hover:shadow-[0_0_50px_rgba(77,142,255,0.35)] hover:scale-[1.02] mb-6">
              Book a diagnostic
            </a>
            <p className="text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
              No commitment. 30 minutes. You walk away with a clear map of what AI can operate in your business.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-10 px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <div className="text-xs font-black text-white/60 mb-4 md:mb-0 uppercase tracking-wider">LEED Digital</div>
          <div className="flex gap-6 text-xs text-text-muted">
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="mailto:info@leed.digital" className="hover:text-accent transition-colors">info@leed.digital</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
