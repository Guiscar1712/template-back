# 🧱 Arquitetura do Projeto

Este documento descreve a arquitetura utilizada no projeto **Template Backend Node.js**, baseado em princípios de **Clean Architecture** e boas práticas de separação de responsabilidades.

---

## 📂 Estrutura de Pastas

```
src/
│
├── controllers/     # Camada de entrada (interface HTTP)
├── domain/          # Regras de negócio e entidades
├── interfaces/      # Interfaces compartilhadas
├── providers/       # Serviços externos e configurações (ex: banco de dados)
├── repositories/    # Persistência de dados
└── server.ts        # Inicialização da aplicação
```

---

## 🧭 Visão Geral das Camadas

```
+------------------------+
|    Controllers (HTTP)  | <-- Entrada da requisição
+-----------+------------+
            |
            v
+-----------+------------+
|   Use Cases / Domain   | <-- Lógica de negócio (em breve)
+-----------+------------+
            |
            v
+-----------+------------+
|   Repositories Layer   | <-- Interação com o banco
+-----------+------------+
            |
            v
+-----------+------------+
| Providers / Services   | <-- Infraestrutura, como DB, filas, cache
+------------------------+
```

---

## 🧩 Camadas e Responsabilidades

### `controllers/`

Responsável por:

- Lidar com rotas e métodos HTTP
- Receber e repassar dados para a camada de domínio
- Retornar respostas padronizadas para o cliente

### `domain/`

Responsável por:

- Modelar as **entidades do sistema** com base nas regras de negócio
- Definir comportamentos (em breve) que pertencem ao domínio
- Utilizar TypeORM para mapear as entidades ao banco

### `interfaces/`

Responsável por:

- Armazenar contratos e tipos compartilhados entre camadas
- Permitir desacoplamento entre módulos

### `repositories/`

Responsável por:

- Implementar os métodos de acesso ao banco (ex: CRUD)
- Trabalhar com as entidades definidas na camada `domain`
- Permitir troca de implementações com base em interfaces

### `providers/`

Responsável por:

- Configuração e inicialização de serviços externos (ex: banco de dados, autenticação, cache, etc.)
- Servir como ponto de abstração para infraestrutura

---

## 🏗️ Dependência entre camadas

- Camada **controller** depende de **domain** e **interfaces**
- Camada **repositories** depende de **domain** e **providers**
- Nenhuma camada depende de controller (respeitando o fluxo unidirecional)

---

## 🧱 Possíveis melhorias futuras

- [ ] Adição de **casos de uso** (`useCases/`) entre `controllers` e `repositories` para isolar regras de negócio
- [ ] Criação de **DTOs** para entrada/saída de dados
- [ ] Middleware global para **tratamento de erros**
- [ ] Centralização de **validação de dados** (ex: class-validator)
- [ ] Inversão de dependência total com **InversifyJS**
- [ ] Logs estruturados e tracing com **OpenTelemetry**

---

## 📌 Observações

- O projeto está preparado para ser escalado, com possibilidade de adicionar outras interfaces além de HTTP (ex: filas, eventos, GraphQL).
- A estrutura visa facilitar **testes**, **manutenção**, e **reutilização** de código.
