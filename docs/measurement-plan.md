# Plano de mensuração para busca e respostas de IA

Status: rascunho interno. Nenhuma integração ou propriedade externa foi alterada.

## Objetivos

1. Confirmar indexação técnica das páginas aprovadas.
2. Medir visibilidade para intenções de problema, categoria, avaliação e marca.
3. Verificar se respostas descrevem corretamente a LEED Digital e citam URLs relevantes.
4. Relacionar descoberta com tráfego e conversões sem atribuição exagerada.

## Plataformas

| Superfície | Método inicial | Evidência a registrar | Limitação |
|---|---|---|---|
| ChatGPT Search | bateria em sessão limpa, idioma pt-BR | resposta, links, captura, data | personalização e variação de modelo |
| Google AI Overviews/AI Mode | consultas aprovadas + Search Console quando acessível | presença, citações, consulta, país/dispositivo | relatórios podem não separar AI Overview |
| Gemini | bateria em sessão limpa | resposta, URLs citadas, descrição da entidade | respostas variam por conta e contexto |
| Copilot/Bing | consultas + Bing Webmaster Tools quando validado | resposta, citações, impressões/clicks disponíveis | conta ainda não confirmada |
| Perplexity | consultas em sessão limpa | fontes, ordem das citações, resposta | seleção de fontes muda entre execuções |

## Cadência proposta

- Baseline antes de publicação aprovada.
- Repetição semanal nas primeiras quatro semanas após indexação.
- Depois, ciclo mensal e após mudanças editoriais relevantes.
- Amostra fixa de prompts mais amostra exploratória separada.

## Métricas

- Cobertura técnica: URLs válidas, indexadas e sem erro de sitemap/canonical.
- Descoberta: proporção de prompts em que a marca ou URL aparece.
- Citação: domínio/URL citada, posição e adequação da página.
- Precisão: posicionamento, serviços e público descritos sem claims inventados.
- Tráfego: sessões e landing pages com referrers identificáveis; registrar `direct/none` como incerto.
- Conversão: chegada a `/contact/` e sucesso do formulário conforme tracking já existente, sem PII.

## Controle de qualidade

- Preservar respostas brutas e data/hora; não registrar apenas conclusões.
- Separar observação de inferência.
- Não comparar plataformas como se tivessem o mesmo índice ou método.
- Não afirmar atribuição de IA quando o referrer não permite comprovação.
- Revisar consentimento e possível duplicidade de tags antes de criar novos eventos.
