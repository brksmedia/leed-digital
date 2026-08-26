export const FORM_ENDPOINT = 'https://formspree.io/f/mwvwaypr'
export const ADS_CONVERSION_ID = 'AW-16851840618/F-r4CKe8lZgcEOrcyuM-'

/**
 * @param {FormData} formData
 * @param {typeof fetch} fetchImpl
 * @param {(conversionId: string) => void} [onConversion]
 * @returns {Promise<'success'>}
 */
export async function submitContactForm(formData, fetchImpl, onConversion = () => {}) {
  const response = await fetchImpl(FORM_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) throw new Error('Form submission failed')
  onConversion(ADS_CONVERSION_ID)
  return 'success'
}
