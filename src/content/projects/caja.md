---
title: Cajá
description: The Cajá programming language and command-line tools.
icon: /caja-logo48x48.svg
repo: https://github.com/caja-tech/caja-cli
draft: false
---

The Cajá language is designed to promote functional programming and was built to quickly create simple scripts that can be used as a prototype to validate a proof of concept.

## Declarative Business Rules

By using Cajá, teams are encouraged to describe business rules using a declarative model. This approach allows development and product teams to achieve a faster *build* -> *test* -> *validate* cycle. Instead of getting bogged down in implementation details and imperative control flows, developers can focus on *what* needs to be achieved, enabling rapid iteration and clearer communication of business requirements.

## Why Cajá?

- **Functional by Design:** Embraces functional programming principles to ensure predictable, side-effect-free, and testable code.
- **Rapid Prototyping:** Streamlines the process of turning ideas into functional scripts, making it the perfect tool for validating proofs of concept.
- **Faster Validation Cycles:** The declarative nature reduces overall complexity, ensuring that testing and validation take a fraction of the usual time.

---

## Installation

You can install the Cajá CLI globally using npm:

```bash
npm install -g @caja/cli
```

## Usage & Commands

### 1. Run a Script
Parse and evaluate a `.caja` script file to execute it.

```bash
caja run -f <file.caja>
```
- `-f, --file`: The path to the `.caja` script file.
- `-e, --export` (Optional): File name to export log values to (e.g., `data.csv`).

### 2. Encode a Script
Encode a `.caja` script file and its dependencies into a single base64-like token string.

```bash
caja encode -f <arquivo.caja>
```

### 3. Decode a Script
The `caja` CLI is able to receive a token and decode it back to the original `.caja` scripts.

```bash
caja decode [token]
```

---

## Use Cases

Cajá is best suited for scenarios where logic needs to be expressed clearly and validated quickly during a product development lifecycle. Here is an example of where Cajá fits perfectly.

### Financial Calculus: Portfolio P&L

Financial systems demand extreme precision, deterministic behavior, and clear auditability. Cajá's pure functions and immutable data pipelines are a perfect fit for this domain.

In this example, we define a `Loan` struct and calculate the compound interest for an entire portfolio. By isolating the math logic into a pure `calculate_pnl` function, it becomes trivial to map over the portfolio and reduce the results into a total Profit & Loss (P&L) figure.

Before running this example, ensure you have installed the `@caja/query` library:

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

# Pure function to calculate Profit & Loss (P&L) for a single loan
# Formula: A = P(1 + r)^t
let calculate_pnl = fn(loan: Loan) -> Number {
    let final_amount = loan.principal * math.pow(1 + loan.rate, loan.years)
    return final_amount - loan.principal
}

# Reducer to sum up all the P&L values
let sum_pnl = fn(current_pnl: Number, acc: Number) -> Number {
    return acc + current_pnl
}

# A portfolio of active loans
let portfolio: [Loan] = [
    Loan { id: "L001", principal: 10000.00, rate: 0.05, years: 5 },
    Loan { id: "L002", principal: 50000.00, rate: 0.035, years: 10 },
    Loan { id: "L003", principal: 2500.00, rate: 0.12, years: 2 }
]

# Pipeline to calculate total P&L for the entire portfolio
let total_portfolio_pnl = portfolio
    |> query.map(calculate_pnl)
    |> query.reduce(sum_pnl, 0)

return total_portfolio_pnl
```

---

### Revenue Calculation

In data-heavy applications, transforming arrays of records efficiently and declaratively is essential. Cajá makes this incredibly straightforward through the combination of **Pure Functions**, **Tail-Call Optimization (TCO)**, and the **Data-First Pipeline** (`|>`) operator.

In this example, we process a list of transactions to calculate the total valid revenue. We define small, predictable pure functions (`is_completed`, `get_amount`) and a tail-recursive function (`apply_discount`) to safely map over data without blowing up the call stack. Finally, we compose them all together into a clean, top-to-bottom pipeline that reads just like a sequence of business rules.

```caja
import array
import "@caja/query"

# Define custom types and structs
type Transaction struct {
    id String
    amount Number
    status String
}

# Pure functions for data transformation
let is_completed = fn(tx: Transaction) -> Boolean {
    return tx.status == "completed"
}

let get_amount = fn(tx: Transaction) -> Number {
    return tx.amount
}

let sum_amounts = fn(current: Number, acc: Number) -> Number {
    return acc + current
}

# Tail call optimized (TCO) recursion example
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

# Sample data
let transactions: [Transaction] = [
    Transaction { id: "tx_01", amount: 250.00, status: "completed" },
    Transaction { id: "tx_02", amount: 15.50, status: "pending" },
    Transaction { id: "tx_03", amount: 120.00, status: "completed" },
    Transaction { id: "tx_04", amount: 99.90, status: "failed" },
    Transaction { id: "tx_05", amount: 45.00, status: "completed" }
]

# Declarative data-first pipeline processing
let total_revenue = transactions
    |> query.filter(is_completed)
    |> query.map(get_amount)
    |> apply_discount(0.5)
    |> query.reduce(sum_amounts, 0)

return total_revenue
```

---

## Conclusion

Cajá was built to bridge the gap between complex business requirements and rapid, reliable software development. By adopting a declarative, functional approach, Cajá provides several key benefits:

- **Simplicity and Predictability:** Pure functions and immutable data structures prevent hidden side-effects, making your business logic easy to test and reason about.
- **Rapid Iteration:** The language's design is tailored for building prototypes and proofs of concept in a fraction of the time, dramatically shortening the *build* -> *test* -> *validate* cycles.
- **Declarative Power:** Features like the Data-First Pipeline (`|>`) and Tail-Call Optimization allow developers to write clean, top-to-bottom logic that reads exactly like a sequence of business rules.
- **Portable and Secure:** The ability to encode scripts into self-contained tokens ensures that your logic can be transported and executed reliably anywhere.

If you are looking for a straightforward, functionally-oriented language to express complex rules and quickly validate your ideas, give Cajá a try. Install the CLI today and start building!
