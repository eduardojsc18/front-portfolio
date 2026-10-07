# Validação do cartão de apresentação

Validação local em 2026-10-06, no navegador Chromium do Codex. Viewports simuladas; não constitui teste em Safari físico.

Nos perfis pessoal e fisioterapia, foram verificadas 19 dimensões: 320×568, 359×640, 360×640, 375×600, 390×664, 414×736, 439×685, 600×800, 759×800, 760×800, 768×700, 999×768, 1000×768, 1199×800, 1200×800, 1440×900, 1920×1080, 667×375 e 844×390.

Os 38 cenários passaram após a conclusão de cada troca: sem overflow horizontal, controles dentro do cartão e da viewport, texto separado da área de retrato. Inspeção visual em 390×664 e 1440×900.

Servidor de falhas separado na porta 3002: retratos com 404 usam a foto original de reserva; todas as fotos com 404 ocultam a imagem quebrada e mantêm a troca e os contatos; resposta de retrato em 12 segundos aciona limite de 5 segundos e usa a reserva. Arquivos originais não foram removidos para esses testes.

Atualização do cabeçalho e interação: cabeçalho compacto, seletor de perfil discreto e arraste horizontal sobre o retrato. Os mesmos 38 cenários passaram novamente. Arraste para esquerda e direita confirmado; movimento vertical manteve o perfil. Confirmadas a cortina de abertura, a entrada escalonada dos elementos do topo e a revelação da seção sobre ao navegar até ela. O gesto usa Pointer Events com pan-y e pinch-zoom; validação física em Safari permanece pendente.

Reorganização das ações: redes com nomes no cabeçalho; navegação de perfis sublinhada junto à apresentação; WhatsApp como ação única na base do retrato móvel e junto ao texto no desktop. Os 38 cenários foram revalidados, incluindo ausência de sobreposição entre nome e redes no cabeçalho. Arraste confirmado nos dois sentidos após a reorganização.
