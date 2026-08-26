import assert from 'node:assert/strict'
import test from 'node:test'

test('envia ao Formspree injetado, dispara conversão somente no sucesso e nunca usa a rede global', async () => {
  const { FORM_ENDPOINT, ADS_CONVERSION_ID, submitContactForm } = await import('../src/lib/contact-form.mjs')
  const originalFetch = globalThis.fetch
  globalThis.fetch = () => {
    throw new Error('network access is forbidden in tests')
  }

  try {
    const calls = []
    const conversions = []
    const form = new FormData()
    form.set('name', 'Pessoa de teste')
    form.set('email', 'teste@example.com')
    form.set('message', 'Processo de teste')

    const result = await submitContactForm(form, async (...args) => {
      calls.push(args)
      return new Response('{}', { status: 200 })
    }, (id) => conversions.push(id))

    assert.equal(result, 'success')
    assert.equal(calls.length, 1)
    assert.equal(calls[0][0], FORM_ENDPOINT)
    assert.equal(calls[0][1].method, 'POST')
    assert.equal(calls[0][1].body, form)
    assert.deepEqual(calls[0][1].headers, { Accept: 'application/json' })
    assert.deepEqual(conversions, [ADS_CONVERSION_ID])

    const failedConversions = []
    await assert.rejects(
      submitContactForm(form, async () => new Response('{}', { status: 500 }), (id) => failedConversions.push(id)),
      /Form submission failed/,
    )
    assert.deepEqual(failedConversions, [])
  } finally {
    globalThis.fetch = originalFetch
  }
})
