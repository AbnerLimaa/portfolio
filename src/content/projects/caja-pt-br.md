---
title: Cajá
description: A linguagem de programação Cajá e ferramentas de linha de comando.
icon: /caja-logo48x48.svg
repo: https://github.com/caja-tech/caja-cli
draft: false
featured: true
---

A linguagem de programação Cajá foi projetada para promover a programação funcional e construída para rapidamente criar scripts simples que podem ser usados como protótipos com o objetivo de validar provas de conceito.

## Regras de Negócio Declarativas

Ao usar Cajá, as equipes são encorajadas a descrever regras de negócios usando um modelo declarativo. Essa abordagem permite que as equipes de desenvolvimento e produto alcancem um ciclo mais rápido de *build* -> *test* -> *validate*. Em vez de se perder em detalhes de implementação e fluxo de controle imperativo, os desenvolvedores podem focar em *o que* precisa ser alcançado, permitindo iterações rápidas e uma comunicação mais clara dos requisitos de negócios.

## Por que Cajá?

- **Funcional por Design:** Adota os princípios da programação funcional para garantir um código previsível, sem efeitos colaterais e testável.
- **Prototipagem Rápida:** Simplifica o processo de transformar ideias em scripts funcionais, tornando-a a ferramenta perfeita para validar provas de conceito.
- **Ciclos de Validação Mais Rápidos:** A natureza declarativa reduz a complexidade geral, garantindo que testes e validação levem uma fração do tempo habitual.

---

## Instalação

Você pode instalar o Cajá CLI globalmente usando npm:

```bash
npm install -g @caja/cli
```

## Uso & Comandos

### 1. Executar um Script
Analise e avalie um arquivo de script `.caja` para executá-lo.

```bash
caja run -f <arquivo.caja>
```
- `-f, --file`: O caminho para o arquivo de script `.caja`.
- `-e, --export` (Opcional): Nome do arquivo para exportar os valores de log (ex: `dados.csv`).

### 2. Codificar um Script
Codifique um arquivo de script `.caja` e suas dependências em uma única string de tokens baseada em base64.

```bash
caja encode -f <arquivo.caja>
```

### 3. Decodificar um Script
A CLI do `caja` é capaz de receber um token e decodificá-lo de volta para os scripts `.caja` originais.

```bash
caja decode [token]
```

---

## Casos de Uso

Cajá é mais recomendado para ser utilizado em cenários em que a lógica precisa ser expressa de forma clara e validada rapidamente durante o ciclo de vida de desenvolvimento de um produto. Aqui está um exemplo de onde Cajá se encaixa perfeitamente.

### Cálculo Financeiro: P&L de um Portfólio

Sistemas financeiros exigem precisão extrema, comportamento determinístico e auditabilidade clara. As funções puras e pipelines de dados imutáveis do Cajá são perfeitos para esse domínio.

Neste exemplo, definimos uma struct `Loan` e calculamos os juros compostos para um portfólio inteiro. Ao isolar a lógica matemática em uma função pura `calculate_pnl`, torna-se trivial mapear sobre o portfólio e reduzir os resultados em um valor total de Lucros e Perdas (P&L).

Antes de executar este exemplo, certifique-se de ter instalado a biblioteca `@caja/query`:

```bash
npm install @caja/query
```

```caja
import array
import math
import "@caja/query"

type Loan struct {
    id String
    principal Number
    rate Number
    years Number
}

# Função pura para calcular Lucros e Perdas (P&L) de um único empréstimo
# Fórmula: A = P(1 + r)^t
let calculate_pnl = fn(loan: Loan) -> Number {
    let final_amount = loan.principal * math.pow(1 + loan.rate, loan.years)
    return final_amount - loan.principal
}

# Redutor para somar todos os valores de P&L
let sum_pnl = fn(current_pnl: Number, acc: Number) -> Number {
    return acc + current_pnl
}

# Um portfólio de empréstimos
let portfolio: [Loan] = [
    Loan { id: "L001", principal: 10000.00, rate: 0.05, years: 5 },
    Loan { id: "L002", principal: 50000.00, rate: 0.035, years: 10 },
    Loan { id: "L003", principal: 2500.00, rate: 0.12, years: 2 }
]

# Pipeline para calcular o P&L total de todo o portfólio
let total_portfolio_pnl = portfolio
    |> query.map(calculate_pnl)
    |> query.reduce(sum_pnl, 0)

return total_portfolio_pnl
```

---

### Cálculo de Receita

Em aplicações baseadas em muitos dados, transformar arrays de registros de forma eficiente e declarativa é essencial. Cajá torna isso incrivelmente simples através da combinação de **Funções Puras**, **Otimização de Chamada de Cauda (TCO - Tail-Call Optimization)**, e o operador de **Pipeline Orientado a Dados** (`|>`).

Neste exemplo, processamos uma lista de transações para calcular a receita total. Nós definimos funções puras pequenas e previsíveis (`is_completed`, `get_amount`) e uma função com recursão pela cauda (`apply_discount`) para mapear os dados com segurança sem causar stack overflow. Finalmente, nós compomos tudo isso em um pipeline limpo e sequencial que é lido exatamente como uma sequência de regras de negócio.

```caja
import array
import "@caja/query"

# Define tipos e structs customizados
type Transaction struct {
    id String
    amount Number
    status String
}

# Funções puras para transformação de dados
let is_completed = fn(tx: Transaction) -> Boolean {
    return tx.status == "completed"
}

let get_amount = fn(tx: Transaction) -> Number {
    return tx.amount
}

let sum_amounts = fn(current: Number, acc: Number) -> Number {
    return acc + current
}

# Exemplo de recursão com Otimização de Chamada de Cauda (TCO)
private const _calculate_discount = fn(prices: [Number], discount_rate: Number, acc: [Number]) -> [Number] {
    if (array.len(prices) == 0) {
        return acc
    }
    
    let discounted = prices[0] * (1 - discount_rate)
    let next_acc = array.push(acc, discounted)
    
    return _calculate_discount(array.tail(prices), discount_rate, next_acc)
}

const apply_discount = fn(prices: [Number], discount_rate: Number) -> [Number] {
    return _calculate_discount(prices, discount_rate, [])
}

# Dados de exemplo
let transactions: [Transaction] = [
    Transaction { id: "tx_01", amount: 250.00, status: "completed" },
    Transaction { id: "tx_02", amount: 15.50, status: "pending" },
    Transaction { id: "tx_03", amount: 120.00, status: "completed" },
    Transaction { id: "tx_04", amount: 99.90, status: "failed" },
    Transaction { id: "tx_05", amount: 45.00, status: "completed" }
]

# Processamento de pipeline declarativo orientado a dados
let total_revenue = transactions
    |> query.filter(is_completed)
    |> query.map(get_amount)
    |> apply_discount(0.5)
    |> query.reduce(sum_amounts, 0)

return total_revenue
```

---

## Conclusão

Cajá foi construída para preencher a lacuna entre requisitos de negócio complexos e o desenvolvimento rápido e confiável de software. Ao adotar uma abordagem declarativa e funcional, Cajá oferece vários benefícios fundamentais:

- **Simplicidade e Previsibilidade:** Funções puras e estruturas de dados imutáveis evitam efeitos colaterais ocultos, tornando sua lógica de negócios fácil de testar e compreender.
- **Iteração Rápida:** O design da linguagem é adaptado para a construção de protótipos e provas de conceito com mais agilidade, encurtando drasticamente os ciclos de *build* -> *test* -> *validate*.
- **Poder Declarativo:** Recursos como o Pipeline Orientado a Dados (`|>`) e a Otimização de Chamada de Cauda (TCO) permitem que os desenvolvedores escrevam uma lógica limpa, de cima para baixo, que é lida exatamente como uma sequência de regras de negócio.
- **Portátil e Segura:** A capacidade de codificar scripts em tokens independentes garante que sua lógica possa ser transportada e executada de forma confiável em qualquer lugar.

Se você está procurando uma linguagem direta e declativa para expressar regras complexas e validar rapidamente suas ideias, experimente a Cajá. Instale a CLI hoje mesmo e comece a construir!
