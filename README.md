# Erika Queiroz

Portfólio estático em HTML, CSS e JavaScript. Sem Nuxt, Vue, Tailwind ou dependências de execução.

- `src/index.html`: página e metadados.
- `src/assets/css/site.css`: estilos das seções.
- `src/assets/css/opening.css`: apresentação, retrato e controles integrados.
- `src/assets/js/profiles.js`: textos e mensagens dos dois perfis.
- `src/assets/js/site.js`: troca de perfis, animações e revelação das seções.
- `src/img/portraits`: retratos da Erika.
- `src/favicon`: identidade e ícones da página.

## Desenvolvimento

Com Node.js instalado, rode `npm run dev` e abra http://127.0.0.1:3001/. Não é necessário instalar pacotes. O servidor é apenas uma prévia local.

## Verificação e publicação

`npm run check` verifica a sintaxe do JavaScript. `npm run build` copia os arquivos para `dist`, sem compilador ou bundler. Publique `src` diretamente ou a cópia em `dist` em uma hospedagem estática. Nenhum servidor Node é necessário em produção.

Conteúdo, contatos e serviços funcionam sem JavaScript. A troca de perfis e as animações são melhorias progressivas. As fotos carregam antes de confirmar uma troca; pedidos antigos são descartados para evitar misturar conteúdo e retrato.

Os links das lojas ainda precisam ser fornecidos. WhatsApp e e-mail foram preservados do projeto anterior. Os retratos e os prompts estão documentados em `docs/retratos.md`.

O perfil de fisioterapia tem formação e registro, áreas de atuação, procedimentos e atendimento domiciliar. A formação é apresentada como graduação em Fisioterapia e especialização em Ortopedia, sem instituição ou ano. `?perfil=fisioterapia` abre o perfil clínico diretamente.
