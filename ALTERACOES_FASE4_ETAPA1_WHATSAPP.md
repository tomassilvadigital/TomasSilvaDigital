# Fase 4 — Etapa 1: botão WhatsApp flutuante

## Ficheiros alterados / criados
- `components/footer.html` — botão único no componente partilhado; reutiliza o número já usado em `contacto.html` (`351933728322`).
- `js/layout.js` — carrega os estilos do botão e Font Awesome quando não estiver presente (página de Política de Privacidade).
- `css/whatsapp-flutuante.css` — botão circular verde, responsivo, com hover, foco e redução de movimento.

## Comportamento
- Abre WhatsApp num novo separador, com mensagem pré-preenchida.
- Não substitui os botões de contacto já existentes.
- Oculta-se enquanto o painel de consentimento estiver visível.
- Surge nas páginas que carregam o rodapé partilhado (não em 404.html nem nos ficheiros de verificação Google).

## Verificações
- Links e número comparados com os presentes em `contacto.html`.
- Verificação de sintaxe JavaScript e integridade do ZIP.
- Testes visuais em navegadores/dispositivos reais devem ser efetuados após copiar os ficheiros.

## Instalação
Copiar a pasta `TomasSilvaDigital` sobre a pasta do projeto, preservando `.git` e todos os outros ficheiros. Usar Live Server (ou GitHub Pages) para carregar componentes partilhados via fetch.
