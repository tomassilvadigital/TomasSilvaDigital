# Fase 3 — Etapa 3: Performance

Esta atualização mantém o design existente e os ficheiros originais.

## Imagens WebP
As versões WebP são usadas nas tags <img>; as originais foram mantidas para compatibilidade e metadados de partilha.

| Imagem original | Antes | WebP | Redução |
|---|---:|---:|---:|
| contactos-mockup.jpg | 1609 KB | 80 KB | 95% |
| servicos-mockup.jpg | 1547 KB | 80 KB | 95% |
| portfolio-mockup.jpg | 1735 KB | 110 KB | 94% |
| website-pessoal-mockup.jpg | 1711 KB | 92 KB | 95% |
| trattoria-bella-italia-mockup.png | 1996 KB | 155 KB | 92% |

- O favicon foi reduzido para 96 × 96 píxeis sem eliminar o original.
- As imagens HTML recebem dimensões intrínsecas quando faltavam.
- As imagens não prioritárias recebem lazy loading e decoding async.
- Não foram removidos scripts nem CSS para evitar quebras de funcionalidades.
- Sem medição Lighthouse antes/depois: testar após publicação.
- É necessário confirmar manualmente no navegador a funcionalidade de todas as páginas e formulários.