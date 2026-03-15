---
title: "Series vs Parallel — When and Why"
stage: 3
stageSlug: "circuits"
lessonNumber: 4
description: "Compare series and parallel circuits and learn when to use each."
keyTerms: ["series-circuit", "parallel-circuit"]
difficulty: "intermediate"
estimatedMinutes: 7
draft: false
---

## Why This Matters

Real electrical systems rarely use only series or only parallel. Engineers choose — and often combine — both types based on what the system needs. Understanding the trade-offs helps you make smart design decisions and diagnose problems faster.

## Head-to-Head Comparison

| Feature | Series | Parallel |
|---|---|---|
| **Current** | Same through all components | Divides among branches |
| **Voltage** | Divides among components | Same across all branches |
| **One component fails** | Entire circuit stops | Other branches keep working |
| **Adding components** | Increases total resistance | Decreases total resistance |
| **Wiring complexity** | Simpler (one loop) | More complex (multiple branches) |

### Advantages of Series

- Simpler wiring — fewer connections.
- Useful when you *want* components to share voltage (e.g., dividing voltage between LEDs with a resistor).
- Easy to ensure the same current flows through every component.

### Disadvantages of Series

- One failure kills the whole circuit.
- Adding more components reduces the voltage (and often the brightness or performance) of each one.

### Advantages of Parallel

- Each component gets full voltage.
- One failure does not affect the rest.
- Easy to add or remove branches without disturbing existing ones.

### Disadvantages of Parallel

- More wiring and connections.
- Total current from the source increases with each added branch, which can overload the supply.

## Real Applications

### Series: Battery Packs

When you stack batteries end-to-end in a flashlight, you wire them in series. A series connection adds their voltages: two 1.5 V AA batteries in series give 3 V. This is how battery packs in power tools, e-bikes, and electric cars achieve higher voltages.

### Parallel: Home Wiring

Every circuit in your breaker panel feeds outlets and lights in parallel. That way each device gets the full line voltage and operates independently.

### Combination Circuits

Many real devices use **combination (series-parallel) circuits**. For example, a string of modern Christmas lights may use series groups wired in parallel. Inside your computer, resistors, capacitors, and chips are connected in complex series-parallel networks. You will explore combination circuits more in later stages.

## Real World Example

An electric vehicle battery pack is a great example of both types at work. Individual cells are connected in series to raise the voltage (e.g., hundreds of cells adding up to 400 V or more) and in parallel to increase capacity (so the car can drive farther on one charge).

## Common Beginner Mistake

Beginners sometimes wire LEDs in parallel without individual resistors, expecting them to share current evenly. In practice, slight manufacturing differences mean one LED hogs more current and burns out, which then shifts even more current to the survivors. The fix: give each LED its own series resistor.

## Key Terms

- **Series Circuit** — Components connected end-to-end sharing the same current.
- **Parallel Circuit** — Components connected across the same two points sharing the same voltage.

## Exercise

You are designing a portable reading light powered by a 3 V battery. You want two LEDs that each need 1.5 V to light up. Should you wire the LEDs in series or parallel? Why?

<details><summary>Show Answer</summary>

Wire them in **series**. In series the voltage divides: each LED gets 1.5 V from the 3 V source, which is exactly what they need. Wiring them in parallel would put the full 3 V across each LED, likely damaging them (unless you add resistors to limit the voltage).

</details>

## Recap

- **Series** is best when you want to divide voltage or ensure equal current.
- **Parallel** is best when each component needs full voltage and independent operation.
- Real devices often use **combination circuits** that mix both.
- Always consider what happens when a component fails — that often guides the choice.
