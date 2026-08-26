import { type SyntheticEvent, useState } from 'react'
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react'
import { FORM_ENDPOINT, submitContactForm } from '../lib/contact-form.mjs'

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const projectOptions = [
  'Um processo que precisa de um sistema',
  'Um sistema existente que precisa evoluir',
  'Um processo que pode usar agentes de IA',
  'Integrações e dados desconectados',
  'Ainda estamos definindo o problema',
]

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault()
    const form = event.currentTarget
    setSubmitState('sending')

    try {
      await submitContactForm(new FormData(form), window.fetch.bind(window), (conversionId) => {
        window.gtag?.('event', 'conversion', { send_to: conversionId })
      })
      form.reset()
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <div className="contact-form-panel">
      <div className="contact-form-heading">
        <div>
          <span>BRIEFING / 01</span>
          <h2>Fale sobre o projeto</h2>
        </div>
        <p>* campos obrigatórios</p>
      </div>

      {submitState === 'success' ? (
        <div className="contact-form-result" role="status">
          <span className="contact-result-icon"><Check aria-hidden="true" /></span>
          <p className="contact-kicker">CONTEXTO RECEBIDO</p>
          <h2>Agora temos um ponto de partida.</h2>
          <p>Vamos usar o email informado para combinar o próximo passo.</p>
          <button type="button" onClick={() => setSubmitState('idle')}>Enviar outro contexto</button>
        </div>
      ) : (
        <form className="contact-form" method="post" action={FORM_ENDPOINT} onSubmit={handleSubmit} aria-busy={submitState === 'sending'}>
          <input className="contact-honeypot" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="contact-field">
            <label htmlFor="contact-name">Nome *</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Email profissional *</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-company">Empresa</label>
            <input id="contact-company" name="company" type="text" autoComplete="organization" />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-project">Em que ponto você está?</label>
            <select id="contact-project" name="project_stage" defaultValue="">
              <option value="" disabled>Selecione uma opção</option>
              {projectOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">O que precisa funcionar melhor? *</label>
            <textarea id="contact-message" name="message" rows={6} maxLength={1200} placeholder="Conte como o processo funciona hoje, onde ele trava e o que você gostaria de mudar." required />
          </div>
          <button className="contact-submit" type="submit" disabled={submitState === 'sending'}>
            {submitState === 'sending' ? <><LoaderCircle className="contact-spinner" aria-hidden="true" /> Enviando</> : <>Enviar contexto <ArrowUpRight aria-hidden="true" /></>}
          </button>
          {submitState === 'error' && <p className="contact-form-error" role="alert">Não foi possível enviar agora. Tente novamente ou fale com a gente por email.</p>}
          <p className="contact-form-note">Os dados serão processados pelo Formspree apenas para entregar sua mensagem e permitir nossa resposta sobre este projeto.</p>
        </form>
      )}
    </div>
  )
}
