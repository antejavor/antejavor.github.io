---
layout: post
title: I have walked a bitter lesson
date: 2026-11-24 00:00:00
description: "Rich Sutton's Bitter Lesson, from the engineer who kept building the clever thing."
tags: LLMs, AI
categories: AI
---

## The lesson

In 2019, Rich Sutton wrote a short essay called
[The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html).
His observation, after 70 years of AI research: general methods that leverage
computation beat methods that leverage human knowledge. Every time. Chess,
Go, speech recognition, vision. Researchers encode what they know, it helps in
the short term, and then scale overtakes it.

It is called bitter because the clever, hand-crafted work is what we are proud
of, and it is the first thing to be washed away.

## I walked it

I read the essay years ago and nodded along. Then I kept doing the opposite.

I built the elaborate pipeline: the hand-written rules, the carefully tuned
prompt chains, the retrieval step with its twelve heuristics, the guardrails
for every failure mode I had seen. It worked. I was proud of it.

Then a new model came out and the same task worked with a single prompt and
half the code. The scaffolding I had spent weeks on was not only unnecessary,
it was now getting in the model's way.

That happened once, then twice. Reading a lesson is not the same as walking it.

## What I take from it

- **Build for the next model, not this one.** If a piece of scaffolding exists
  only to work around a model's weakness, assume it has an expiry date.
- **Keep the harness thin.** Give the model good tools and good context, and
  stay out of the way of its reasoning.
- **Invest in what scales.** Data, evaluation, and clean interfaces keep their
  value as models improve. Clever workarounds do not.
- **Measure, then delete.** Re-run your evals on every new model and remove
  whatever no longer earns its place.

## The sweet part

The bitter lesson is only bitter if your identity is tied to the clever part.
If it is tied to solving the problem, then every model that makes your old
code obsolete is a gift. There are bigger problems waiting behind it.
