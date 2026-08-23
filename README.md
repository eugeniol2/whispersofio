# NASA Explorer

Um dashboard para explorar os dados públicos da NASA — fotos astronômicas, rastreamento de eventos naturais em tempo real, imagens dos rovers em Marte, asteroides próximos à Terra e o acervo histórico de mídia da NASA — construído com Next.js, TypeScript e React Query sobre APIs reais da NASA.

> Nome do repositório: `whispersofio`

---

## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [APIs e Integrações](#apis-e-integrações)
- [Stack Técnica](#stack-técnica)
- [Como Rodar](#como-rodar)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Arquitetura](#arquitetura)
- [Notas de Engenharia](#notas-de-engenharia)
- [Interface](#interface)
- [Limitações Conhecidas](#limitações-conhecidas)

---

## Sobre

O NASA Explorer exibe dados ao vivo de várias APIs abertas da NASA por trás de uma interface escura e consistente. Todas as telas estão ligadas a uma fonte de dados real — não há dado de exemplo por trás dos visuais.

O projeto também serve como demonstração de prática full-stack: arquitetura baseada em features, uma camada de dados tipada construída sobre React Query, proteção da chave de API e cache de respostas no servidor via Route Handlers do Next.js, e o hábito de verificar o comportamento de APIs de terceiros contra os serviços reais antes de construir em cima delas.

Todas as telas são renderizadas no servidor com os dados já embutidos e revalidação incremental, então chegam ao navegador prontas — sem spinner e sem nenhuma requisição após a hidratação.

---

## Funcionalidades

### Dashboard
- Estatísticas ao vivo de eventos na Terra, asteroides próximos e imagens de Marte — cada uma resolve de forma independente, então uma fonte com falha nunca bloqueia as demais
- Foto Astronômica do Dia em destaque, imagem ou vídeo
- Atividade recente de eventos na Terra, com cada linha levando à sua própria página de detalhes
- Miniaturas das APODs recentes

### Foto Astronômica do Dia (APOD)
- Navegação por data (limitada ao intervalo do acervo) ou sorteio de uma entrada aleatória
- Suporte a imagens, vídeos `mp4` diretos e embeds do YouTube
- Link para a resolução máxima, cópia de link para compartilhar e acesso à página original da APOD
- Estatísticas do acervo derivadas do feed ao vivo

### Eventos na Terra
- Eventos naturais ao vivo da NASA EONET — incêndios florestais, tempestades, vulcões, enchentes e mais
- Filtros de aplicação instantânea por status, categoria, número de linhas e intervalo de tempo
- Categorias sem eventos correspondentes se ocultam automaticamente
- Nomes de lugares via geocodificação reversa quando a NASA não fornece descrição
- Páginas de detalhe por evento com histórico de posição, fontes, compartilhamento por link e rastreamento de tempestades ao vivo

### Mars Rover
- Imagens brutas do Curiosity e do Perseverance, direto do feed oficial das missões
- Seletor de sol que já abre no sol mais recente com imagens disponíveis de cada rover
- Filtro por câmera ou por posição da câmera (esquerda / direita / céu)
- Painel com dados da missão, combinando informações ao vivo do feed com fatos históricos

### Asteroides Próximos
- Aproximações nos próximos 1, 3 ou 7 dias
- Distâncias em distâncias lunares, com um diagrama posicionando a Terra, a órbita da Lua e o asteroide
- Filtro por classificação de risco e ordenação por distância, diâmetro ou velocidade
- Observabilidade por asteroide: magnitude aparente real, equipamento necessário para vê-lo e de quais latitudes ele é visível

### Biblioteca de Mídia
- Acervo de imagens e vídeos da NASA, navegável por missão ou busca livre
- A busca é aplicada conforme você digita, com debounce
- Visualização detalhada com a descrição completa, palavras-chave e o registro original da NASA

---

## APIs e Integrações

| Fonte | Usada para | Exige chave |
| --- | --- | --- |
| [NASA APOD](https://api.nasa.gov/#apod) | Foto Astronômica do Dia, acervo e estatísticas | Sim |
| [NASA EONET](https://eonet.gsfc.nasa.gov/docs/v3) | Rastreamento de eventos naturais ao vivo | Não |
| [NASA NeoWs](https://api.nasa.gov/#NeoWS) | Aproximações de asteroides próximos à Terra | Sim |
| [NASA Mars Raw Images](https://mars.nasa.gov/) | Imagens do Curiosity e do Perseverance | Não |
| [NASA Image & Video Library](https://images.nasa.gov/) | Acervo histórico de mídia | Não |
| [JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) | Magnitude aparente e posição no céu dos asteroides | Não |
| [BigDataCloud](https://www.bigdatacloud.com/) | Geocodificação reversa para localizar eventos | Não |
| [zoom.earth](https://zoom.earth/) | Links de rastreamento de tempestades, verificados antes de aparecer | Não |

Apenas os endpoints de `api.nasa.gov` exigem chave, e essas chamadas são feitas exclusivamente no servidor.

---

## Stack Técnica

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 15 (App Router, Turbopack) |
| Linguagem | TypeScript |
| Interface | React 19, Material UI v6, Emotion |
| Dados | TanStack React Query v5, com prefetch no servidor e hidratação |
| Renderização | Server Components + ISR, com streaming de carregamento |
| Fonte | Nunito via `next/font` |
| Ferramentas | Yarn, ESLint, Prettier |

---

## Como Rodar

### Pré-requisitos

- Node.js 18.18 ou superior
- Yarn (o projeto usa `yarn.lock` — instalar com npm reescreve o lockfile)

### 1. Instale as dependências

```bash
yarn install
```

### 2. Configure a chave da API da NASA

Pegue uma chave gratuita em [api.nasa.gov](https://api.nasa.gov/) e crie um arquivo `.env.local` na raiz do projeto:

```bash
NASA_API_KEY=sua_chave_aqui
```

A variável **não** leva o prefixo `NEXT_PUBLIC_` de propósito. Ela é lida apenas dentro dos Route Handlers do servidor, então a chave nunca chega ao bundle do navegador.

Sem uma chave, a aplicação usa a `DEMO_KEY` da NASA, limitada a cerca de 30 requisições por hora.

### 3. Suba o servidor de desenvolvimento

```bash
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Scripts Disponíveis

| Script | Descrição |
| --- | --- |
| `yarn dev` | Sobe o servidor de desenvolvimento (Turbopack) |
| `yarn build` | Build de produção |
| `yarn start` | Serve o build de produção |
| `yarn lint` | Roda o ESLint |

---

## Arquitetura

Roteamento, telas e acesso a dados ficam separados:

```
src/
├── app/                    roteamento — cada página faz prefetch e hidrata sua tela
│   ├── <rota>/page.tsx     Server Component: semeia as queries e entrega hidratadas
│   ├── <rota>/loading.tsx  esqueleto transmitido enquanto o servidor trabalha
│   └── api/                route handlers que guardam a chave e fazem cache
├── features/               uma pasta por tela
│   └── EarthEvents/
│       ├── index.tsx
│       ├── EventDetail/
│       └── components/
├── services/api/           uma pasta por integração
│   ├── <nome>/requests.ts  funções tipadas usadas pelo navegador
│   ├── <nome>/queries.ts   hooks do React Query
│   ├── <nome>/server.ts    busca no servidor, compartilhada com o route handler
│   ├── client.ts           cliente da NASA, somente servidor
│   ├── endpoints.ts        URLs base externas, centralizadas
│   ├── prefetch.ts         monta o estado desidratado das páginas
│   ├── queryKeys.ts        fábrica de chaves do React Query
│   └── serverCache.ts      cache em memória usado no servidor
├── components/             UI compartilhada
├── utils/                  helpers puros compartilhados
└── theme/                  tema do MUI
```

Cada módulo em `services/api/<nome>` expõe funções de request tipadas e hooks do React Query, então toda feature busca dados da mesma forma, independentemente da origem.

Onde existe `server.ts`, a mesma função serve o route handler e o Server Component — a página nunca chama a própria API por HTTP, e ambos compartilham o cache. O resultado é que as telas chegam ao navegador já renderizadas, sem nenhuma requisição depois da hidratação.

---

## Notas de Engenharia

Alguns problemas que vale destacar, porque moldaram a implementação:

**As requisições se acumulavam em filtragem rápida.** Trocar filtros rapidamente deixava requisições antigas em andamento, o que acabava atingindo os limites de taxa das APIs. Hoje o `AbortSignal` percorre todas as chamadas, então requisições substituídas são canceladas em vez de continuarem rodando.

**Uma API externa foi aposentada no meio do projeto.** A Mars Photo API, mantida pela comunidade, foi arquivada e agora retorna 404 em todos os endpoints. A tela de Marte foi migrada para o feed de imagens brutas da própria NASA. Esse feed ignora parâmetros de paginação quando um sol é informado e devolve o sol inteiro, então o resultado é cortado no servidor.

**Magnitude aparente não é magnitude absoluta.** A NeoWs publica a magnitude absoluta (`H`), que descreve o objeto, e não o quão brilhante ele parece da Terra. Estimar o brilho só a partir de `H` e da distância errava por 3,4 magnitudes — cerca de 23× — porque ignora o ângulo de fase. Os dados de observabilidade vêm do JPL Horizons.

**Mídia precisa ser medida antes de ser exibida.** A APOD serve versões web e em resolução máxima que diferem em cerca de 14×, e seus vídeos `mp4` não têm miniatura, enquanto o servidor envia o arquivo inteiro em vez de responder só com os metadados. Por isso os vídeos têm o tamanho verificado no servidor, e apenas os pequenos viram prévia com um quadro real.

**O gargalo do Mars Rover não era o volume de dados.** A tela demorava a abrir, e a hipótese natural era limitar o número de imagens. A medição mostrou outra coisa: um sol vazio de 0,2 KB leva os mesmos ~7,5s que um de 365 KB. O custo é latência por requisição, não banda — e sondar em paralelo piora, porque o feed serializa (3 requisições simultâneas levaram 71s contra 24s sequenciais). A solução foi reduzir requisições, não dados: o `/info` passou a devolver as fotos que já baixara ao procurar o sol, e as respostas do feed passaram a ser cacheadas em disco. Após reiniciar o servidor, a rota caiu de 8,5s para 0,033s.

**SSR não deixa o dado mais rápido, muda onde se espera.** Com prefetch no servidor as telas chegam prontas, mas se a fonte estiver fria o usuário encara uma tela parada em vez de um spinner. Por isso cada rota tem um `loading.tsx`: o esqueleto é transmitido na hora e o conteúdo entra em seguida. Pelo mesmo motivo, a estatística de eventos do dashboard ficou deliberadamente fora do prefetch — contar todos os eventos abertos do EONET leva cerca de 75s, tempo que não pode entrar na renderização de uma página.

---

## Interface

- Navegação no cabeçalho, centralizada, com a página ativa destacada e menu compacto em telas menores
- Tela de carregamento própria: um planeta girando em CSS e mensagens que se alternam enquanto o servidor busca os dados
- Atalhos fixos para GitHub e LinkedIn na lateral, ocultos em telas pequenas para não cobrir o conteúdo
- Tema escuro único, com o design system definido no tema do MUI

---

## Limitações Conhecidas

- O grid "NASA API Collections" do dashboard é uma lista de navegação estática, não dados buscados
- A estatística de eventos na Terra é a única chamada feita pelo navegador, por causa do custo da consulta no EONET
- Todo o conteúdo vindo da NASA é em inglês, então a interface segue o mesmo idioma por consistência
- Não há suíte de testes automatizados
- Não há deploy configurado

---

## Aviso

Este é um projeto educacional independente, sem afiliação ou endosso da NASA. Todos os dados e imagens pertencem à NASA e aos seus respectivos provedores.
