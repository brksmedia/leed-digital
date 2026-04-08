import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react'

declare function gtag(...args: unknown[]): void

type FormData = Record<string, string | string[]>

type Field = {
  name: string
  label: string
  type: string
  required: boolean
  placeholder?: string
  options?: string[]
}

type Step = {
  title: string
  subtitle: string
  fields: Field[]
}

const STEPS: Step[] = [
  {
    title: 'Sobre voce',
    subtitle: 'Informacoes de contato',
    fields: [
      { name: 'nome', label: 'Nome completo', type: 'text', required: true, placeholder: 'Seu nome' },
      { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'seu@empresa.com' },
      { name: 'whatsapp', label: 'WhatsApp', type: 'tel', required: true, placeholder: '+55 (11) 99999-9999' },
      { name: 'empresa', label: 'Nome da empresa', type: 'text', required: true },
    ],
  },
  {
    title: 'O negocio',
    subtitle: 'Contexto da operacao',
    fields: [
      { name: 'descricao', label: 'O que a empresa faz?', type: 'textarea', required: true, placeholder: 'Descreva em 1-2 frases' },
      { name: 'pessoas', label: 'Quantas pessoas na operacao?', type: 'radio', required: true, options: ['1-5', '6-20', '21-50', '50+'] },
      { name: 'faturamento', label: 'Faixa de faturamento mensal', type: 'radio', required: false, options: ['Ate R$50k', 'R$50k - R$200k', 'R$200k - R$1M', 'R$1M+', 'Prefiro nao dizer'] },
    ],
  },
  {
    title: 'Ferramentas',
    subtitle: 'Maturidade tecnologica',
    fields: [
      { name: 'ferramentas', label: 'Quais ferramentas/sistemas usam no dia a dia?', type: 'checkbox', required: true, options: ['Planilhas (Google Sheets / Excel)', 'ERP (SAP, Omie, Bling, etc)', 'CRM (HubSpot, Pipedrive, etc)', 'Automacao (n8n, Zapier, Make)', 'Sistema proprio', 'WhatsApp como ferramenta de trabalho', 'Outro'] },
      { name: 'dados', label: 'Onde moram os dados mais importantes?', type: 'radio', required: true, options: ['Planilhas', 'Banco de dados', 'Sistema do fornecedor', 'Na cabeca de alguem', 'Espalhado em varios lugares'] },
      { name: 'integracoes', label: 'As integracoes entre sistemas sao automaticas ou manuais?', type: 'radio', required: true, options: ['Tudo automatico', 'Maioria automatico', 'Metade e metade', 'Maioria manual', 'Tudo manual'] },
    ],
  },
  {
    title: 'O problema',
    subtitle: 'Onde doi',
    fields: [
      { name: 'repetitiva', label: 'Qual a tarefa mais repetitiva que consome tempo da equipe?', type: 'textarea', required: true },
      { name: 'perda', label: 'Onde voces perdem dinheiro por erro, atraso ou retrabalho?', type: 'textarea', required: true },
      { name: 'dependencia', label: 'Tem algum processo que depende de UMA pessoa especifica?', type: 'radio', required: true, options: ['Sim, varios', 'Sim, um ou dois', 'Nao'] },
      { name: 'tentativa', label: 'Ja tentaram resolver com alguma ferramenta ou consultoria?', type: 'radio', required: true, options: ['Sim, funcionou parcialmente', 'Sim, nao funcionou', 'Nao, nunca tentamos'] },
    ],
  },
  {
    title: 'Decisao',
    subtitle: 'Timing e prioridade',
    fields: [
      { name: 'urgencia', label: 'De 1 a 10, quao urgente e resolver isso?', type: 'rating', required: true },
      { name: 'decisor', label: 'Quem decide a contratacao?', type: 'radio', required: true, options: ['Eu decido sozinho', 'Eu + socio/diretor', 'Preciso aprovar com diretoria'] },
      { name: 'budget', label: 'Tem budget separado pra esse tipo de investimento?', type: 'radio', required: false, options: ['Sim', 'Ainda nao mas consigo alocar', 'Nao no momento'] },
    ],
  },
]

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
}

function RatingField({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            value === n
              ? 'bg-[#4d8eff] text-white shadow-[0_0_20px_rgba(77,142,255,0.3)]'
              : value > 0 && n <= value
                ? 'bg-[#4d8eff]/20 text-[#4d8eff] border border-[#4d8eff]/30'
                : 'bg-white/[0.03] border border-white/[0.08] text-[#555] hover:border-white/[0.15] hover:text-white/60'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  )
}

export function Assessment() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<FormData>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const totalSteps = STEPS.length
  const current = STEPS[step]
  const progress = ((step + 1) / totalSteps) * 100

  const updateField = (name: string, value: string | string[]) => {
    setData(prev => ({ ...prev, [name]: value }))

  }

  const toggleCheckbox = (name: string, option: string) => {
    const current = (data[name] as string[]) || []
    const updated = current.includes(option)
      ? current.filter(o => o !== option)
      : [...current, option]
    updateField(name, updated)
  }

  const canProceed = () => {
    const requiredFields = current.fields.filter(f => f.required)
    return requiredFields.every(f => {
      const val = data[f.name]
      if (!val) return false
      if (typeof val === 'string') return val.trim() !== ''
      return val.length > 0
    })
  }

  const next = () => {
    if (step < totalSteps - 1) {
      setDirection(1)
      setStep(s => s + 1)
    }
  }

  const prev = () => {
    if (step > 0) {
      setDirection(-1)
      setStep(s => s - 1)
    }
  }

  const submit = async () => {
    setStatus('sending')
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        formData.append(k, Array.isArray(v) ? v.join(', ') : v)
      })
      formData.append('_subject', `Triagem LEED — ${data.empresa || 'Lead'}`)
      const res = await fetch('https://formspree.io/f/mwvwaypr', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error()
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', { send_to: 'AW-16851840618/F-r4CKe8lZgcEOrcyuM-' })
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-[#4d8eff]/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#4d8eff]" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">Recebemos suas respostas</h2>
          <p className="text-[#666] text-sm leading-relaxed mb-8">
            Vamos analisar e retornar pelo WhatsApp em ate 24 horas com os proximos passos.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#4d8eff] text-sm hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao site
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#4d8eff]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="fixed top-0 w-full z-50 bg-[#050505]/70 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-[700px] mx-auto">
          <a href="/" className="text-[13px] font-semibold tracking-[0.12em] text-white/70 uppercase hover:text-white transition-colors">
            LEED Digital
          </a>
          <span className="text-[11px] text-[#444] uppercase tracking-[0.15em]">
            {step + 1} / {totalSteps}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-white/[0.04]">
          <motion.div
            className="h-full bg-[#4d8eff]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Form content */}
      <div className="pt-28 pb-32 px-6 max-w-[560px] mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Step header */}
            <div className="mb-10">
              <span className="text-[10px] text-[#4d8eff] uppercase tracking-[0.2em] font-medium">{current.subtitle}</span>
              <h1 className="text-[28px] md:text-[36px] font-semibold text-white mt-2 tracking-tight">{current.title}</h1>
            </div>

            {/* Fields */}
            <div className="space-y-8">
              {current.fields.map(field => (
                <div key={field.name}>
                  <label className="text-[11px] text-[#555] uppercase tracking-[0.15em] block mb-3">
                    {field.label}
                    {field.required && <span className="text-[#4d8eff]/60 ml-1">*</span>}
                  </label>

                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={(data[field.name] as string) || ''}
                      onChange={e => updateField(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder-[#333] focus:border-[#4d8eff]/50 focus:outline-none transition-colors"
                    />
                  )}

                  {field.type === 'email' && (
                    <input
                      type="email"
                      value={(data[field.name] as string) || ''}
                      onChange={e => updateField(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder-[#333] focus:border-[#4d8eff]/50 focus:outline-none transition-colors"
                    />
                  )}

                  {field.type === 'tel' && (
                    <input
                      type="tel"
                      value={(data[field.name] as string) || ''}
                      onChange={e => updateField(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder-[#333] focus:border-[#4d8eff]/50 focus:outline-none transition-colors"
                    />
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      rows={3}
                      value={(data[field.name] as string) || ''}
                      onChange={e => updateField(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder-[#333] focus:border-[#4d8eff]/50 focus:outline-none transition-colors resize-none"
                    />
                  )}

                  {field.type === 'radio' && field.options && (
                    <div className="space-y-2">
                      {field.options.map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => updateField(field.name, opt)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                            data[field.name] === opt
                              ? 'bg-[#4d8eff]/10 border border-[#4d8eff]/40 text-white'
                              : 'bg-white/[0.02] border border-white/[0.06] text-[#666] hover:border-white/[0.12] hover:text-[#999]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {field.type === 'checkbox' && field.options && (
                    <div className="space-y-2">
                      {field.options.map(opt => {
                        const checked = ((data[field.name] as string[]) || []).includes(opt)
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleCheckbox(field.name, opt)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all cursor-pointer flex items-center gap-3 ${
                              checked
                                ? 'bg-[#4d8eff]/10 border border-[#4d8eff]/40 text-white'
                                : 'bg-white/[0.02] border border-white/[0.06] text-[#666] hover:border-white/[0.12] hover:text-[#999]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                              checked ? 'bg-[#4d8eff] border-[#4d8eff]' : 'border-white/[0.15]'
                            }`}>
                              {checked && <Check className="w-3 h-3 text-white" />}
                            </div>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {field.type === 'rating' && (
                    <RatingField
                      value={Number(data[field.name]) || 0}
                      onChange={v => updateField(field.name, String(v))}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 w-full bg-[#050505]/80 backdrop-blur-2xl border-t border-white/[0.04]">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-[560px] mx-auto">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-2 text-[13px] text-[#555] hover:text-white transition-colors cursor-pointer disabled:opacity-0 disabled:cursor-default"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          {step < totalSteps - 1 ? (
            <button
              onClick={next}
              disabled={!canProceed()}
              className="group flex items-center gap-2 px-6 py-3 bg-[#4d8eff] text-white text-[13px] font-medium rounded-lg transition-all shadow-[0_0_30px_rgba(77,142,255,0.15)] hover:shadow-[0_0_50px_rgba(77,142,255,0.25)] hover:bg-[#5d96ff] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Proximo <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!canProceed() || status === 'sending'}
              className="group flex items-center gap-2 px-6 py-3 bg-[#4d8eff] text-white text-[13px] font-medium rounded-lg transition-all shadow-[0_0_30px_rgba(77,142,255,0.15)] hover:shadow-[0_0_50px_rgba(77,142,255,0.25)] hover:bg-[#5d96ff] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {status === 'sending' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
              ) : (
                <>Enviar <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
              )}
            </button>
          )}
        </div>
        {status === 'error' && (
          <p className="text-red-400 text-xs text-center pb-3">Algo deu errado. Tente novamente.</p>
        )}
      </div>
    </div>
  )
}
