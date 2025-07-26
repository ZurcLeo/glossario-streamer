# 📚 Glossário Streamer

Seu guia completo para o sucesso no streaming. Uma plataforma web moderna construída com Next.js que organiza termos, estratégias e técnicas essenciais para streamers.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **Markdown** - Gerenciamento de conteúdo
- **Remark** - Processamento de markdown

## 📁 Estrutura do Projeto

```
glossario-streamer/
├── content/                    # Conteúdo em markdown
│   ├── terms/                 # Termos organizados por categoria
│   │   ├── seguranca/         # Termos de segurança
│   │   ├── monetizacao/       # Estratégias de monetização
│   │   ├── crescimento/       # Táticas de crescimento
│   │   └── ...
├── src/
│   ├── app/                   # App Router do Next.js
│   ├── components/            # Componentes React
│   ├── lib/                   # Utilitários e funções
│   └── types/                 # Definições TypeScript
└── public/                    # Assets estáticos
```

## 🛠️ Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Executar versão de produção
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📝 Adicionando Conteúdo

### Estrutura de um termo (.md):

```markdown
---
title: "Nome do Termo"
subtitle: "Descrição breve"
category: "categoria"
difficulty: "iniciante" | "intermediario" | "avancado"
tags: ["tag1", "tag2"]
keywords: ["palavra-chave1", "palavra-chave2"]
searchTerms: ["termo-busca1", "termo-busca2"]
priority: 85
featured: true
lastReviewed: "2024-01-15"
estimatedReadTime: "3 min"
relatedTerms: ["termo-relacionado1", "termo-relacionado2"]
---

# Título do Termo

> **TL;DR:** Resumo executivo do conceito.

## Conteúdo principal...
```

### Categorias disponíveis:
- `seguranca` - Diretrizes e práticas de segurança
- `monetizacao` - Estratégias de monetização
- `conteudo` - Técnicas de criação de conteúdo
- `comunidade` - Gestão e moderação
- `crescimento` - Táticas de crescimento
- `tecnico` - Configurações técnicas

## 🎯 Funcionalidades

- ✅ **Navegação por categorias** - Organize termos por área de interesse
- ✅ **Sistema de busca** - Encontre rapidamente qualquer termo
- ✅ **Termos relacionados** - Descubra conteúdo conectado
- ✅ **Níveis de dificuldade** - Conteúdo adequado para cada nível
- ✅ **Tags e filtros** - Múltiplas formas de descobrir conteúdo
- ✅ **Design responsivo** - Funciona em qualquer dispositivo
- ✅ **SEO otimizado** - Páginas estáticas para melhor performance

## 🚀 Deploy

### Vercel (recomendado):
```bash
npm install -g vercel
vercel --prod
```

## 📈 Roadmap

### Fase 1 ✅ (Implementado)
- [x] Estrutura básica do projeto
- [x] Sistema de conteúdo em markdown
- [x] Páginas de categoria e termos
- [x] Design responsivo
- [x] Navegação funcional

### Fase 2 📋 (Próxima)
- [ ] Sistema de busca avançado
- [ ] Filtros por tags e dificuldade
- [ ] Página de busca dedicada
- [ ] Analytics básico

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Adicione seu conteúdo seguindo o padrão estabelecido
4. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
5. Push para a branch (`git push origin feature/nova-feature`)
6. Abra um Pull Request

---

Feito com ❤️ para a comunidade de streamers brasileiros 🇧🇷
