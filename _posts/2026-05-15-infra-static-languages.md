---
layout: post
title: The language debate is back!
date: 2026-05-15 18:00:00
description: Notes on the programming language debate and why we may increasingly favor statically typed and compiled languages.
tags: Infrastructure, Security, LLMs, Rust, Zig
categories: Infrastructure, Engineering
---

## The language debate and ego

The language debate was one of the most interesting debates engineers have had.
It is fascinating how much energy has gone into debating languages, and how
often that turns into an egoistic debate.

People devote their entire identities to the programming language they know and
are used to, and that is a very natural thing to do. The programming language
and ecosystem in which you work make you feel like a worthy member of a
particular community. Humans love to feel useful.

On the other side, there is an enemy growing inside: the ego. The human ego can
be a very fragile thing, and people are mostly unaware of it and the limits of
their thinking. Once someone criticizes a programming language, they feel
personally attacked. That is somewhat understandable, but it can turn a
technical discussion into a complete mess.

As soon as we get emotional about deterministic and machine things, we are
probably in an egoistic debate, not a language debate.

I obviously do not want to debate language, but rather the features it brings
to the table. Before that, the growing question today is this:

What is the programming language today?

## English, by Karpathy

Obviously, Andrej
Karpathy's [tweet](https://x.com/karpathy/status/1617979122625712128?s=20),
"The hottest new programming language is English", feels a bit like an
epiphany because it captures the direction.

As more and more code is written by LLMs and less and less by humans, a few
interesting things start to happen.

We are probably getting less attached to the programming language we are
spending our time in, and questioning our purpose and existence a bit more.
That means we will switch more easily and reconsider what is actually optimal.

On a more technical note, we get massive gains in prototyping and refactoring
in any language. Humans play a smaller role.

There are some technical differences in token spend, review time,
correctness, and so on, but I am thinking more about the bigger picture.

You can generate a million lines of code in a couple of hours and completely
refactor a whole codebase.

If you have a good test setup, solid coverage, and a benchmark harness, you
will immediately see the drawbacks or gains from that refactor.

I had been planning to write this blog and already had an initial draft ready,
but what happened with [Bun](https://github.com/oven-sh/bun/pull/30412), a
million changed lines in six days, a port from Zig to Rust, pushed me over the
edge to actually finish it.

The pros and cons of programming languages need to be completely reevaluated.

## Back to the language debate

If we start thinking about language features and comparisons, most of them are
probably obsolete because they were built around the human bottleneck.

One of the big distinctions is whether languages are compiled or interpreted.
Interpreted languages are usually easier to learn, handle more things for you,
and require less thinking. This was ideal when humans were writing the code and
needed to prototype fast.

If you ask an LLM for a comparison of statically typed and compiled languages
versus dynamic and interpreted languages, you would get something like this:

| Aspect          | Static / Compiled                | Dynamic / Interpreted              |
| --------------- | -------------------------------- | ---------------------------------- |
| **Performance** | Fast; compile-time optimizations | Slower; JIT can help               |
| **Dev Time**    | Slower; more boilerplate         | Fast prototyping; less ceremony    |
| **Ecosystem**   | Strong tooling & refactoring     | Vast libraries; beginner-friendly  |
| **Security**    | Compile-time bug detection       | Prone to runtime & injection risks |

_Static:_ C, C++, Rust, Go, Zig · _Dynamic:_ Python, JS, Ruby, PHP

Fast prototyping is critical. You usually sacrifice performance and security
for a faster pace and lower development time, and this leads to a more vibrant
ecosystem of tools built on top of a poor foundation. This was the default
because of project budgets, time, and engineers.

Keep in mind that I do not have anything against dynamically interpreted
languages.
I write Python all the time, but it is a liability.

## Predicting the unpredictable

As our world is quite unpredictable (LLMs were not a thing a few years ago), I
am going to make a prediction for the fun of it.

I think the future for any software is tied to statically typed and compiled
languages for specific platforms, since there is no longer a measurable benefit
in prototyping speed. The only argument I can think of against this is the
existing ecosystem and libraries. But think about it: refactoring something
into another language has basically become cheap.

I do not think dynamic languages will disappear. People and agents will
probably use them in some capacity.
