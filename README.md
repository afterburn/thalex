# Thalex Assessment

## Assignment

Create a simplified cryptocurrency exchange order entry form and order book.

## Preface

Due to my inexperience with regard to trading I might have made some mistakes in some of the calculations.
I want to emphasize that this is something I will take a deep dive into if I am hired. Due to time restraints I could not implement everything I wanted to, so I've added a list of improvements to describe what that would look like.

## Installation

```shell
  npm install
```

## Usage

```shell
  npm start (wait until webpack build is finished before visiting http://localhost:8080)
```

## Improvements

1. Reduce CSS by implementing reusable classes.
2. Better separation between business logic and UI.
3. QoL improvements (e.g. automatically scrolling to where your order has been placed in the order book).
4. Improve performance by implementing custom list renderer instead of letting React handle it.
5. Implement custom depth chart rendering instead of relying on highcharts to better cater to crypto trader needs and improve performance.
6. Make the app responsive.
