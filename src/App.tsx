import './App.css'
import { FadeIn, FadeInStagger, FadeInItem } from './components/FadeIn'
import { SplineScene } from './components/SplineScene'
import { Spotlight } from './components/Spotlight'
import { motion } from 'framer-motion'
import {
  Bot, Landmark, Megaphone, Settings, Terminal, Database, Palette,
  Shield, FileText, Plug, Layers, Activity, Unlock, ArrowRight,
} from 'lucide-react'

const agents = [
  { Icon: Bot, name: 'CEO', desc: 'Orchestrates all agents. Distributes tasks, consolidates results, reports.' },
  { Icon: Landmark, name: 'CFO', desc: 'Revenue, expenses, margins. Daily financial reports with cross-validation.' },
  { Icon: Megaphone, name: 'CMO', desc: 'Campaigns, channels, content. Creative analysis and performance.' },
  { Icon: Settings, name: 'COO', desc: 'Processes, improvements, operational efficiency.' },
  { Icon: Terminal, name: 'CTO', desc: 'Tech stack, data pipelines, landing pages.' },
  { Icon: Database, name: 'CDO', desc: 'Data quality, schemas, queries, integrity.' },
  { Icon: Palette, name: 'CDesO', desc: 'Visual audits, design system, consistency.' },
]

const infra = [
  { Icon: Shield, title: 'Data Isolation', desc: 'None of your data is shared.' },
  { Icon: FileText, title: 'Audit Logs', desc: 'Every agent decision logged.' },
  { Icon: Plug, title: 'Any Integration', desc: 'Works with your existing stack.' },
  { Icon: Layers, title: 'Semantic Layer', desc: 'Single source of truth.' },
  { Icon: Activity, title: 'Real-Time Alerts', desc: 'Problems caught early.' },
  { Icon: Unlock, title: 'No Lock-in', desc: 'You own everything.' },
]

function App() {
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
          <div className="text-[13px] font-semibold tracking-[0.12em] text-white/70 uppercase">LEED Digital</div>
          <a href="#contact" className="hidden md:flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer">
            Get in touch <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="min-h-screen relative overflow-hidden bg-black/[0.96]">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="flex flex-col md:flex-row min-h-screen max-w-[1200px] mx-auto">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-center px-6 md:px-10 py-20 md:py-0 relative z-10"
          >
            <p className="text-[11px] text-[#4d8eff] font-medium tracking-[0.2em] uppercase mb-6">AI Solutions Development</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-white leading-[0.95] mb-4">
              1 person.<br />7 AI agents.
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[0.95] mb-8">
              <span className="bg-gradient-to-r from-[#4d8eff] to-[#7aa8ff] bg-clip-text text-transparent">$100K/month</span>
              <br /><span className="text-white">in paid media.</span>
            </h2>
            <p className="text-[14px] text-[#666] max-w-md mb-2 leading-relaxed">
              This is how a real US marketing company operates.
            </p>
            <p className="text-base text-white font-medium mb-10">
              We build this for you too.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#proof" className="group px-6 py-3 bg-[#4d8eff] text-white font-medium rounded-lg transition-all hover:bg-[#5d96ff] shadow-[0_0_40px_rgba(77,142,255,0.15)] hover:shadow-[0_0_60px_rgba(77,142,255,0.25)] cursor-pointer text-[13px] flex items-center justify-center gap-2">
                See how it works <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#contact" className="px-6 py-3 text-white/60 hover:text-white font-medium rounded-lg transition-colors cursor-pointer text-[13px] border border-white/[0.08] hover:border-white/[0.15]">
                Talk to LEED
              </a>
            </div>
          </motion.div>

          {/* Right: Spline 3D */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex-1 relative min-h-[400px] md:min-h-0"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 rounded-full bg-white/30"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ PROBLEM ═══════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white leading-[1.05] max-w-2xl mb-16">
              You don't have a technology problem. <span className="text-[#333]">You have an operations problem.</span>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid sm:grid-cols-2 gap-3">
            {[
              { dot: '#ef4444', text: 'Your team spends hours building reports nobody uses to make decisions.' },
              { dot: '#f59e0b', text: "Decisions are made with yesterday's data — if not last week's." },
              { dot: '#f59e0b', text: 'Every new hire costs $5-10K/month and takes 3 months to deliver value.' },
              { dot: '#ef4444', text: "Your operation depends on 3 people who can't get sick at the same time." },
            ].map((item, i) => (
              <FadeInItem key={i}>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors flex items-start gap-4 cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: item.dot }} />
                  <p className="text-[14px] text-[#999] leading-relaxed">{item.text}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ═══════════════════ N1-N4 LEVELS ═══════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="mb-14">
            <p className="text-[13px] text-[#4d8eff] font-medium tracking-[0.2em] uppercase mb-4">Autonomy Framework</p>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white leading-[1.05]">
              Most companies use AI at Level 1.
            </h2>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-[#4d8eff] leading-[1.05]">
              We operate at Level 4.
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-4 gap-0 border border-white/[0.06] rounded-xl overflow-hidden">
              {[
                { n: '01', name: 'Assistance', desc: 'Responds when you ask', who: 'You decide everything', opacity: 'opacity-25' },
                { n: '02', name: 'Automation', desc: 'Executes repetitive tasks', who: 'You supervise', opacity: 'opacity-35' },
                { n: '03', name: 'Operations', desc: 'Decisions within rules', who: 'You intervene by exception', opacity: 'opacity-55' },
              ].map((l, i) => (
                <div key={i} className={`p-6 md:p-8 border-r border-white/[0.04] ${l.opacity}`}>
                  <div className="text-[10px] text-[#555] tracking-[0.2em] uppercase mb-4">Level {l.n}</div>
                  <h4 className="text-sm font-bold text-white mb-1">{l.name}</h4>
                  <p className="text-[11px] text-[#555] mb-3">{l.desc}</p>
                  <p className="text-[10px] text-[#444]">{l.who}</p>
                </div>
              ))}
              <div className="p-6 md:p-8 bg-[#4d8eff]/[0.06] border-l-2 border-[#4d8eff]/30 relative">
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#4d8eff] text-white text-[8px] font-bold uppercase rounded tracking-wider">Active</div>
                <div className="text-[10px] text-[#4d8eff] tracking-[0.2em] uppercase mb-4">Level 04</div>
                <h4 className="text-sm font-bold text-white mb-1">Autonomous</h4>
                <p className="text-[11px] text-[#4d8eff]/60 mb-3">Runs entire business areas</p>
                <p className="text-[10px] text-[#4d8eff]/40">You set the strategy</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-8 text-[13px] text-[#444] max-w-xl">
              The difference between using AI and operating with AI is the same difference between having an intern and having a C-level.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ PROOF — C-SYSTEM ═══════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-10 border-t border-white/[0.04]" id="proof">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="text-[13px] text-[#4d8eff] font-medium tracking-[0.2em] uppercase mb-4">Proof of Concept</p>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white leading-[1.05] mb-2">
              7 AI agents. One real company.
            </h2>
            <p className="text-lg text-[#444] mb-16 max-w-xl">
              C-System runs our US performance marketing operation. Not a prototype — in production since 2025.
            </p>
          </FadeIn>

          {/* Bento grid - asymmetric */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
              {/* Big metric */}
              <div className="col-span-2 row-span-2 rounded-xl bg-gradient-to-br from-[#4d8eff]/[0.08] to-transparent border border-[#4d8eff]/[0.12] p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] text-[#4d8eff] tracking-[0.15em] uppercase mb-2">Monthly Ad Spend</p>
                  <div className="text-[clamp(3rem,8vw,5rem)] font-black text-white tracking-tighter leading-none">$100K+</div>
                </div>
                <p className="text-[13px] text-[#555] mt-6">Managed entirely by AI agents — budget allocation, bid optimization, anomaly detection.</p>
              </div>
              {/* Metrics */}
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between">
                <p className="text-[10px] text-[#555] tracking-[0.15em] uppercase">Team Size</p>
                <div className="text-4xl font-black text-white mt-3">1<span className="text-[#333] text-2xl ml-1">vs 15</span></div>
              </div>
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between">
                <p className="text-[10px] text-[#555] tracking-[0.15em] uppercase">Task Reduction</p>
                <div className="text-4xl font-black text-white mt-3">90<span className="text-[#333] text-2xl">%</span></div>
              </div>
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between">
                <p className="text-[10px] text-[#555] tracking-[0.15em] uppercase">Monitoring</p>
                <div className="text-4xl font-black text-white mt-3">24/7</div>
              </div>
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between">
                <p className="text-[10px] text-[#555] tracking-[0.15em] uppercase">Reports</p>
                <div className="text-4xl font-black text-white mt-3">Daily</div>
              </div>
            </div>
          </FadeIn>

          {/* Agent cards */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 mt-2">
              {agents.map((agent, i) => (
                <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 hover:border-[#4d8eff]/20 transition-all group cursor-default">
                  <agent.Icon className="w-4 h-4 text-[#333] group-hover:text-[#4d8eff] mb-3 transition-colors" strokeWidth={1.5} />
                  <h5 className="font-bold text-white text-[11px] mb-1">{agent.name}</h5>
                  <p className="text-[9px] text-[#444] leading-snug">{agent.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="text-[13px] text-[#4d8eff] font-medium tracking-[0.2em] uppercase mb-4">Process</p>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white leading-[1.05] mb-2">
              From first conversation to AI operating.
            </h2>
            <p className="text-xl font-bold text-[#333] mb-16">Weeks, not months.</p>
          </FadeIn>
          <FadeInStagger className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', name: 'Diagnostic', time: '1–2 weeks', desc: "We map your operation. Identify where AI generates real ROI — not where it looks good on a PowerPoint. You get a plan with scope, timeline, and cost.", active: true },
              { num: '02', name: 'Build', time: '4–8 weeks', desc: 'We develop the agents, integrations, and workflows. You follow progress in real time. Nothing is a black box.', active: false },
              { num: '03', name: 'Operate', time: 'Ongoing', desc: 'AI goes into production. We monitor, adjust, expand. The operation improves over time because agents learn from your business data.', active: false },
            ].map((step, i) => (
              <FadeInItem key={i}>
                <div className={`rounded-xl p-7 md:p-8 h-full ${step.active ? 'bg-[#4d8eff]/[0.06] border border-[#4d8eff]/[0.15]' : 'bg-white/[0.02] border border-white/[0.05]'}`}>
                  <div className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-6 ${step.active ? 'text-[#4d8eff]' : 'text-[#444]'}`}>Step {step.num}</div>
                  <h4 className="text-xl font-black text-white mb-1">{step.name}</h4>
                  <p className={`text-[11px] font-semibold uppercase tracking-wider mb-4 ${step.active ? 'text-[#4d8eff]/60' : 'text-[#444]'}`}>{step.time}</p>
                  <p className="text-[13px] text-[#666] leading-relaxed">{step.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-[13px] text-[#444] max-w-xl">
              The scope can be a single API integration or a complete system with multiple agents. The diagnostic determines the right size for you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ INFRASTRUCTURE ═══════════════════ */}
      <section className="py-28 md:py-36 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[-0.03em] text-white leading-[1.05] mb-12">
              Built to run in production.<br /><span className="text-[#333]">Not in a demo.</span>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {infra.map((item, i) => (
              <FadeInItem key={i}>
                <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-5 hover:border-white/[0.1] transition-all group cursor-default">
                  <item.Icon className="w-4 h-4 text-[#333] group-hover:text-[#4d8eff] mb-3 transition-colors" strokeWidth={1.5} />
                  <h5 className="text-[11px] font-bold text-white mb-1">{item.title}</h5>
                  <p className="text-[10px] text-[#444] leading-relaxed">{item.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ═══════════════════ FOUNDER ═══════════════════ */}
      <section className="py-24 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-[600px] mx-auto text-center">
          <FadeIn>
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] mx-auto mb-4 flex items-center justify-center">
              <span className="text-sm font-bold text-[#444]">LB</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-0.5">Lucas Brinks</h3>
            <p className="text-[10px] text-[#4d8eff] font-medium uppercase tracking-[0.2em] mb-4">Founder</p>
            <p className="text-[13px] text-[#444]">Based in Brazil. Global operation.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-32 md:py-40 px-6 md:px-10 text-center relative border-t border-white/[0.04]" id="contact">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#4d8eff]/[0.04] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-2xl mx-auto relative z-10">
          <FadeIn>
            <h2 className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-black text-white mb-8 tracking-[-0.03em] leading-[1.05]">
              Your operation can run differently.
            </h2>
            <a href="#" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#4d8eff] text-white font-medium rounded-lg transition-all shadow-[0_0_40px_rgba(77,142,255,0.15)] hover:shadow-[0_0_60px_rgba(77,142,255,0.3)] hover:bg-[#5d96ff] cursor-pointer text-[15px] mb-6">
              Book a diagnostic <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <p className="text-[13px] text-[#444] max-w-sm mx-auto leading-relaxed">
              No commitment. 30 minutes. You walk away with a clear map of what AI can operate in your business.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8 px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto">
          <div className="text-[10px] font-medium text-[#333] mb-3 md:mb-0 uppercase tracking-[0.15em]">LEED Digital © 2025</div>
          <div className="flex gap-6 text-[11px] text-[#444]">
            <a href="#" className="hover:text-white transition-colors cursor-pointer">LinkedIn</a>
            <a href="mailto:info@leed.digital" className="hover:text-white transition-colors cursor-pointer">info@leed.digital</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
