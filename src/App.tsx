import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-bg text-text-secondary">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-bg/70 backdrop-blur-xl border-b border-border/50">
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-6xl mx-auto">
          <div className="text-lg font-black tracking-tight text-white">LEED Digital</div>
          <a href="#contact" className="hidden md:block bg-accent text-white px-5 py-2 rounded-md font-bold text-sm hover:opacity-90 transition-opacity">
            Talk to LEED
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-44 pb-28 px-6 md:px-8 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] mb-8">
          1 person. 7 AI agents.<br />
          <span className="text-accent">$100K/month</span> in paid media.
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-4">
          This is how a real US marketing company operates.
        </p>
        <p className="text-xl md:text-2xl text-white font-bold mb-12">
          We build this for you too.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a href="#proof" className="px-8 py-4 bg-accent text-white font-bold rounded-md hover:opacity-90 transition-opacity shadow-[0_0_24px_rgba(77,142,255,0.25)]">
            See how it works
          </a>
          <a href="#contact" className="px-8 py-4 bg-transparent border border-border text-white font-bold rounded-md hover:bg-surface transition-colors">
            Talk to LEED
          </a>
        </div>
        <p className="text-sm text-text-muted">
          AI solutions development — from a single API integration to a full operating system.
        </p>
      </header>

      {/* PROBLEM */}
      <section className="py-24 px-6 md:px-8 bg-surface">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-4">
              You don't have a technology problem.
            </h2>
            <p className="text-2xl md:text-4xl font-black tracking-tight text-text-muted leading-tight">
              You have an operations problem.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { dot: 'bg-dot-red', text: 'Your team spends hours building reports nobody uses to make decisions.' },
              { dot: 'bg-dot-amber', text: "Decisions are made with yesterday's data — if not last week's." },
              { dot: 'bg-dot-amber', text: 'Every new hire costs $5-10K/month and takes 3 months to deliver value.' },
              { dot: 'bg-dot-red', text: "Your operation depends on 3 people who can't get sick at the same time." },
            ].map((item, i) => (
              <div key={i} className="p-5 bg-surface-high rounded-md border border-border flex items-start gap-4">
                <div className={`w-2.5 h-2.5 rounded-full ${item.dot} mt-1.5 shrink-0`} />
                <p className="text-white text-sm font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFRAME N1-N4 */}
      <section className="py-28 px-6 md:px-8 max-w-6xl mx-auto">
        <div className="mb-14">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
            Most companies use AI at Level 1.
          </h2>
          <p className="text-2xl md:text-3xl font-black text-accent">We operate at Level 4.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { level: '01', name: 'Assistance', desc: 'Responds when you ask. You decide everything.', dim: 'opacity-40' },
            { level: '02', name: 'Automation', desc: 'Executes repetitive tasks on its own. You supervise.', dim: 'opacity-50' },
            { level: '03', name: 'Operations', desc: 'Makes decisions within defined rules. You intervene by exception.', dim: 'opacity-75' },
          ].map((item, i) => (
            <div key={i} className={`p-6 bg-surface border border-border rounded-md ${item.dim}`}>
              <div className="text-[10px] font-bold text-text-muted mb-3 tracking-widest uppercase">Level {item.level}</div>
              <h4 className="text-lg font-black text-white mb-2">{item.name}</h4>
              <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
          <div className="p-7 bg-surface border-2 border-accent rounded-md relative shadow-[0_0_40px_rgba(77,142,255,0.06)]">
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-accent text-white text-[9px] font-black uppercase rounded-sm tracking-wider">We are here</div>
            <div className="text-[10px] font-black text-accent mb-3 tracking-widest uppercase">Level 04</div>
            <h4 className="text-xl font-black text-white mb-2">Autonomous Management</h4>
            <p className="text-xs text-accent/80 leading-relaxed">Runs entire areas of the business. You set the strategy.</p>
          </div>
        </div>
        <p className="mt-10 text-text-secondary text-sm max-w-3xl">
          The difference between using AI and operating with AI is the same difference between having an intern and having a C-level.
        </p>
      </section>

      {/* PROOF — C-SYSTEM */}
      <section className="py-24 px-6 md:px-8 bg-surface" id="proof">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            7 AI agents running a real company.<br />
            <span className="text-accent">24 hours. 7 days.</span>
          </h2>
          <p className="text-text-secondary mb-12 text-sm">
            C-System runs our own US performance marketing company. Not a prototype. In production.
          </p>

          {/* Agents */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-px bg-border/30 border border-border rounded-md overflow-hidden mb-px">
            {[
              { icon: 'smart_toy', name: 'CEO', desc: 'Orchestrates all agents. Distributes tasks, consolidates results, reports.' },
              { icon: 'account_balance', name: 'CFO', desc: 'Revenue, expenses, margins. Daily financial reports with cross-validation.' },
              { icon: 'campaign', name: 'CMO', desc: 'Campaigns, channels, content. Creative analysis and performance.' },
              { icon: 'settings_suggest', name: 'COO', desc: 'Processes, improvements, operational efficiency.' },
              { icon: 'terminal', name: 'CTO', desc: 'Tech stack, data pipelines, landing pages.' },
              { icon: 'database', name: 'CDO', desc: 'Data quality, schemas, queries, integrity.' },
              { icon: 'palette', name: 'CDesO', desc: 'Visual audits, design system, consistency.' },
            ].map((agent, i) => (
              <div key={i} className="bg-bg p-5">
                <span className="material-symbols-outlined text-accent mb-3 text-xl">{agent.icon}</span>
                <h5 className="font-black text-white text-xs mb-1">{agent.name}</h5>
                <p className="text-[10px] text-text-muted leading-snug">{agent.desc}</p>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border/30 border border-border border-t-0 rounded-b-md overflow-hidden mb-10">
            {[
              { value: '$100K+', label: 'Monthly ad spend' },
              { value: '30 min', label: 'Monitoring cycles' },
              { value: '90%', label: 'Manual task reduction' },
              { value: '1 vs 15', label: 'Person vs typical team' },
              { value: '24/7', label: 'Anomaly detection' },
              { value: 'Daily', label: 'Cross-validated reports' },
            ].map((m, i) => (
              <div key={i} className="bg-surface-high p-6">
                <div className="text-2xl md:text-3xl font-black text-accent mb-1">{m.value}</div>
                <p className="text-[10px] text-text-muted uppercase font-bold tracking-wide">{m.label}</p>
              </div>
            ))}
          </div>

          <p className="text-white text-sm font-medium">
            This is not a pitch deck slide. This is the operation running the business today.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 px-6 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          From first conversation to AI operating.
        </h2>
        <p className="text-2xl md:text-3xl font-black text-text-muted mb-16">Weeks, not months.</p>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { num: '01', name: 'Diagnostic', time: '1 to 2 weeks', desc: "We map your operation. Identify where AI generates real ROI — not where it looks good on a PowerPoint. You get a plan with scope, timeline, and cost.", accent: true },
            { num: '02', name: 'Build', time: '4 to 8 weeks', desc: 'We develop the agents, integrations, and workflows. You follow progress in real time. Nothing is a black box.', accent: false },
            { num: '03', name: 'Operate', time: 'Ongoing', desc: 'AI goes into production. We monitor, adjust, expand. The operation improves over time because agents learn from your business data.', accent: false },
          ].map((step, i) => (
            <div key={i}>
              <div className={`w-12 h-12 ${step.accent ? 'bg-accent' : 'bg-surface-higher border border-border'} text-white font-black flex items-center justify-center mb-5 rounded-md text-lg`}>
                {step.num}
              </div>
              <h4 className="text-xl font-black text-white mb-3">{step.name}</h4>
              <p className="text-xs text-text-muted mb-2 font-bold uppercase tracking-wider">{step.time}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm text-text-muted max-w-2xl">
          The scope can be a single API integration or a complete system with multiple agents. The diagnostic determines the right size for you.
        </p>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="py-24 px-6 md:px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 tracking-tight">
            Built to run in production. Not in a demo.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: 'security', title: 'Data Isolation', desc: 'Data isolated per client — none of your data is shared.' },
              { icon: 'history_edu', title: 'Audit Logs', desc: 'Full log of every decision by every agent — auditable at any time.' },
              { icon: 'api', title: 'Any Integration', desc: 'Integrates with any API, database, or tool you already use.' },
              { icon: 'layers', title: 'Semantic Layer', desc: 'A single source of truth for the entire business.' },
              { icon: 'monitor_heart', title: 'Real-Time Monitoring', desc: 'Problems are detected before they become crises.' },
              { icon: 'lock_open', title: 'No Lock-in', desc: 'You own all the infrastructure. If you leave, you take everything.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-surface-high border border-border rounded-md hover:border-accent/40 transition-colors">
                <span className="material-symbols-outlined text-accent mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                <h5 className="text-sm font-black text-white mb-2">{item.title}</h5>
                <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-28 px-6 md:px-8 max-w-3xl mx-auto text-center">
        <div className="w-24 h-24 rounded-full bg-surface-higher border border-border mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl font-black text-text-muted">LB</span>
        </div>
        <h3 className="text-2xl font-black text-white mb-1">Lucas Brinks</h3>
        <p className="text-xs text-accent font-bold uppercase tracking-widest mb-6">Founder, LEED Digital</p>
        <p className="text-sm text-text-muted">Based in Brazil. Global operation.</p>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-6 md:px-8 text-center bg-surface" id="contact">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">
            Your operation can run differently.<br />Let us show you how.
          </h2>
          <a href="#" className="inline-block px-10 py-4 bg-accent text-white font-bold text-lg rounded-md hover:opacity-90 transition-opacity shadow-[0_0_24px_rgba(77,142,255,0.25)] mb-6">
            Book a diagnostic
          </a>
          <p className="text-sm text-text-muted max-w-lg mx-auto">
            No commitment. 30 minutes. You walk away with a clear map of what AI can operate in your business.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <div className="text-sm font-black text-white mb-4 md:mb-0">LEED Digital</div>
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
