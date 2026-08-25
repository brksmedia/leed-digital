import { type FormEvent, useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  LoaderCircle,
  Mail,
  MessageCircle,
} from 'lucide-react'
import './contact-page.css'

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const projectOptions = [
  'Um processo que precisa de um sistema',
  'Um sistema existente que precisa evoluir',
  'Integrações e dados desconectados',
  'Ainda estamos definindo o problema',
]

export function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  useEffect(() => {
    const previousTitle = document.title
    const previousLang = document.documentElement.lang

    document.title = 'Contato | LEED Ponto Digital'
    document.documentElement.lang = 'pt-BR'

    return () => {
      document.title = previousTitle
      document.documentElement.lang = previousLang
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setSubmitState('sending')

    try {
      const response = await fetch('https://formspree.io/f/mwvwaypr', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Form submission failed')

      window.gtag?.('event', 'conversion', {
        send_to: 'AW-16851840618/F-r4CKe8lZgcEOrcyuM-',
      })
      form.reset()
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <div className="contact-page">
      <header className="contact-header">
        <a className="contact-logo" href="/" aria-label="LEED, página inicial">
          LEED<span>.</span>
        </a>
        <p>SOFTWARE SOB MEDIDA</p>
        <a className="contact-back" href="/">
          <ArrowLeft aria-hidden="true" />
          Voltar ao início
        </a>
      </header>

      <main>
        <section className="contact-main" aria-labelledby="contact-title">
          <aside className="contact-index" aria-hidden="true">
            <span>01</span>
            <p>CONTATO / 2026</p>
          </aside>

          <div className="contact-content">
            <header className="contact-intro">
              <p className="contact-kicker">NOVO PROJETO / CONTATO</p>
              <h1 id="contact-title">
                Conte o que precisa <span>funcionar melhor.</span>
              </h1>
              <p>
                Mostre como o trabalho acontece hoje, onde ele trava e o que precisa
                ganhar clareza. Respondemos em até um dia útil.
              </p>
              <i aria-hidden="true" />
            </header>

            <div className="contact-layout">
              <div className="contact-form-panel">
            <div className="contact-form-heading">
              <div>
                <span>BRIEFING / 01</span>
                <h3>Fale sobre o projeto</h3>
              </div>
              <p>* campos obrigatórios</p>
            </div>

            {submitState === 'success' ? (
              <div className="contact-form-result" role="status">
                <span className="contact-result-icon"><Check aria-hidden="true" /></span>
                <p className="contact-kicker">CONTEXTO RECEBIDO</p>
                <h3>Agora temos um ponto de partida.</h3>
                <p>Vamos responder pelo email informado para combinar o próximo passo.</p>
                <button type="button" onClick={() => setSubmitState('idle')}>
                  Enviar outro contexto
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
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
                    {projectOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">O que precisa funcionar melhor? *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    maxLength={1200}
                    placeholder="Conte como o processo funciona hoje, onde ele trava e o que você gostaria de mudar."
                    required
                  />
                </div>

                <button className="contact-submit" type="submit" disabled={submitState === 'sending'}>
                  {submitState === 'sending' ? (
                    <><LoaderCircle className="contact-spinner" aria-hidden="true" /> Enviando</>
                  ) : (
                    <>Enviar contexto <ArrowUpRight aria-hidden="true" /></>
                  )}
                </button>

                {submitState === 'error' && (
                  <p className="contact-form-error" role="alert">
                    Não foi possível enviar agora. Tente novamente ou fale com a gente por email.
                  </p>
                )}

                <p className="contact-form-note">
                  Usaremos seus dados apenas para responder sobre este projeto.
                </p>
              </form>
            )}
              </div>

              <aside className="contact-sidebar" aria-labelledby="channels-title">
                <section>
                  <p className="contact-kicker">CONTATO DIRETO</p>
                  <h2 id="channels-title">Prefere falar sem formulário?</h2>

                  <a className="contact-direct-link" href="mailto:info@leed.digital">
                    <span className="contact-direct-icon"><Mail aria-hidden="true" /></span>
                    <span>
                      <small>EMAIL</small>
                      <strong>info@leed.digital</strong>
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>

                  <a
                    className="contact-direct-link"
                    href="https://wa.me/5511947276831?text=Ol%C3%A1%2C%20quero%20conversar%20sobre%20um%20sistema%20sob%20medida."
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="contact-direct-icon"><MessageCircle aria-hidden="true" /></span>
                    <span>
                      <small>WHATSAPP</small>
                      <strong>Iniciar conversa</strong>
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </section>

                <section className="contact-next-steps">
                  <p className="contact-kicker">DEPOIS DO ENVIO</p>
                  <ol className="contact-steps" aria-label="Próximos passos">
                    <li><span>01</span> Lemos o contexto</li>
                    <li><span>02</span> Recortamos o problema</li>
                    <li><span>03</span> Marcamos uma conversa</li>
                  </ol>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="contact-footer">
        <a className="contact-logo contact-logo-footer" href="/" aria-label="LEED, página inicial">
          LEED<span>.</span>
        </a>
        <p>SÃO PAULO, BR</p>
        <p>© 2026 LEED PONTO DIGITAL</p>
      </footer>
    </div>
  )
}
