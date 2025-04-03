---
layout: post
title: How do LLMs reason?
date: 2025-04-04 00:00:00
description: Understanding what reasoning is and how LLMs can reason.
tags: LLMs, AI
categories: AI
---

## The mighty LLMs

We live in fascinating times of mighty LLMs that can help boost productivity and
help with day-to-day tasks. The speed of adoption of LLMs is a story that will
constantly be compared to everything that came before and after the LLMs. It is
essential to highlight and understand the fundamentals and flaws of this
technology.

Let's jump to the big question around LLMs that became quite
controversial, **can they reason?** My short answer is **no**. Let's dive into
why.

## Reasoning

To even talk about the reasoning, we would first have to define it and agree on
what reasoning is. Let's distill this into something we refer to as a typical
thinking process where you are presented with some information and can think
about that information and conclude something.

In the practical example, it would be something like this: **The S&P 500 sank
15% percent in the three months**.

Now, in your brain, you start to ponder that information and connect it to the
events that happened in that period. Some notable things that could pop into
your mind are the Trump tariffs, lower-than-expected BDP in the US economy,
global conflicts, etc.

In a pure form, this is reasoning about specific information in your brain. If I
follow up on the question and ask: "What will the stock market do tomorrow?" you
will probably start thinking hard about this.

In other words, you would read projections, news, and global tax and tariff
policies and invest time and effort into trying to answer this. You would
construct a thesis that works under different assumptions.

Usually, the more effort you invest, the higher the probability you will be
correct.

In a pure form, it is reasoning on the information you were given, had in your
memory or acquired over the web.

The nice thing about reasoning is that our brain is the ultimate reasoning
powerhouse (most of the time :D), and it runs on beer and bananas, it does not
require [1 Megawatt of electricity to be
trained](https://www.theverge.com/24066646/ai-electricity-energy-watts-generative-consumption)

## Reasoning and LLMs

LLMs **cannot** reason, they can **mimic** reasoning that sometimes works and
sometimes does not. You can call it primitive, low reasoning, or use any other
way to package it, but it is far away from your reasoning capabilities.

This starts with the basis of what LLMs actually are, they are a super capable
text predictor that has a lot of memory. Memory is constructed based on what
they have been trained on, and small "thinking memory" is the context you are
passing with your question.

Let's put this into practical example if your LLM was trained on this data:

```
We have different colors for objects: blue, red, green, purple, yellow, etc.
The ball can be red.
The ball can be blue.
The car can be purple.
The flag can be purple.
```

Now, if I ask: "What color can a ball be? Give me three answers."

The LLM computation will give a higher probability to the obvious answers:

```
1. The ball can be red.
2. The ball can be blue.
3. The Ball can be ...
```

The third answer would be some of the possible colors, because more objects are
purple and purple has a higher frequency, it would probably give the third
answer as purple. But we all know that it can be any color since it is not
specified.

If you want more details about this, one of the best explainers about why LLMs
is a text predictor, I would recommend jumping on the 3Blue1Brown channel and
watching a [series about neural
networks](https://youtu.be/aircAruvnKk?si=6akRbRcsc2nOE_G2), specifically about
the LLMs and transformers.

By design, they are not made to think but rather to predict the next word
(token, to be exact).

Well [OpenAI docs seem to suggest other
wise](https://platform.openai.com/docs/guides/reasoning?api-mode=chat).

This is a snippet from their docs page:

```
Reasoning models, like OpenAI o1 and o3-mini, are new large language models trained with reinforcement learning to perform complex reasoning.
Reasoning models think before they answer, producing a long internal chain of thought before responding to the user.
Reasoning models excel in complex problem solving, coding, scientific reasoning, and multi-step planning for agentic workflows.
```

The image from the same docs page illustrates this
process:
<img src="/assets/img/blog-how-llms-reasone/reasoning_flow.png" alt="reasoning" width="900" />

They are saying their models can perform complex reasoning.

Well, they do not reason. They generate a thesis on how to answer questions,
summarize that generation into reasoning and output, and chain this multiple
times, which improves the text generation and makes it more successful.
Something you will hear as **Chain of Thoughts**.

So, they are **mimicking** reasoning where you generate text related to the text
you are asking for to try to come up with a solution. It is like a person saying
the facts out loud when someone asks you a question or creates a theory about
something and uses theory construction to present the facts. At any step of the
process, you are hoping the theory won't go sideways.

If we go back to the LLM that was trained on ball colors:

```
Question asked: What color can a ball be?

Chain of thought:
The ball can be blue
The ball can be red

Output:

Therefore, the ball can be red or blue.
```

This would be a good Chain of Thoughts:

Here is how it could fail:

```

Question asked: What color can a ball be? Give me three answers
Chain of thought:

The ball can be blue
The ball can be red
The car can be purple.


Therefore, the ball can be blue, red, and, I guess, purple.


```

If you do not trust my examples, give a shot to your **reasoning** LLM, I got
this on ChatGPT with reasoning:

<img src="/assets/img/blog-how-llms-reasone/chat-gpt-reasoning.png" alt="chat-gpt-reasoning" width="900" />

If you do not trust me, one of the best men to describe this is [Yann
LeCunn](https://www.youtube.com/watch?v=N09C6oUQX5M), Chief AI Scientist at
Meta.

I admire the engineering behind modern LLMs and find them helpful. If you
provide the proper context, they won't hallucinate. That is why we, in
[Memgraph](https://memgraph.com/docs/ai-ecosystem) are focused on building cool
Graph and LLM-powered AI apps.

As they say, the harder it is to explain and argue how bad or incapable
technology is, the better it is. [Arthur C. Clarke's Third
Law](https://en.wikipedia.org/wiki/Clarke%27s_three_laws): "Any sufficiently
advanced technology is indistinguishable from magic."
