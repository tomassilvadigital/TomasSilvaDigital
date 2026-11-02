# Fase 3 — Google Analytics 4 e consentimento

Data: 02/11/2026

## Integração implementada

- ID GA4: `G-YH14QPT81E`.
- As páginas públicas carregam `css/consentimento.css` e `js/consentimento.js`.
- Sem consentimento analítico, o JavaScript **não descarrega** `gtag.js`.
- Aceitar ativa o carregamento do Google Analytics 4; rejeitar mantém a etiqueta desativada.
- A preferência fica em `localStorage` sob a chave `tsd_analytics_consent_v1`.
- O rodapé partilhado recebe uma ligação à política e um botão para reabrir as preferências.
- Se houver consentimento, são registados eventos sem dados pessoais: `click_orcamento` e `click_whatsapp`.
- O EmailJS e o formulário foram preservados; não são enviados nomes, emails, telefones ou mensagens para o GA4 por este script.
- A nova página `politica-privacidade.html` contém um texto inicial, **a rever antes da publicação** para confirmar práticas e requisitos legais concretos.

## Verificações manuais obrigatórias

1. Abrir o site com Live Server e limpar `localStorage` para testar a primeira visita.
2. No separador Network do navegador, confirmar que **antes de aceitar** não há pedidos a `googletagmanager.com/gtag/js` nem a `google-analytics.com/g/collect`.
3. Rejeitar, navegar entre páginas e confirmar que o GA4 continua sem carregar.
4. Através de **Preferências de privacidade** no rodapé, aceitar estatísticas e confirmar que o pedido a `gtag/js` aparece.
5. No GA4 → Relatórios → Tempo real, confirmar uma visita de teste **depois de aceitar** (pode demorar algum tempo).
6. Testar os cliques em «Pedir Orçamento» e «WhatsApp» com consentimento e verificar os eventos no DebugView/relatórios apropriados.
7. Rejeitar após aceitar e confirmar que, após o recarregamento, a etiqueta deixa de carregar.
8. Verificar navegação, EmailJS (envio real), versão mobile e todas as páginas.
9. Rever o texto de privacidade e condições aplicáveis antes de publicar.

## Limitações

A execução estática não valida a entrega de eventos no servidor Google nem substitui uma auditoria jurídica de proteção de dados. Não há pontuações Lighthouse depois destas alterações. Recursos externos não analíticos (p. ex. fontes, CDN e EmailJS) têm de ser avaliados separadamente.
