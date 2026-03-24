---
layout: post
title: What is the best data model for AI?
date: 2026-03-24 00:00:00
description: Exploring what data model is the most suited for LLM driven agents.
tags: LLMs, AI, data model
categories: AI
---

## Brain fog of data models

I quite recently discovered the [Bitter
Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) by Rich
Sutton. It opened my eyes in so many different ways, I would recommend reading
it. There are different points there, you will probably see something else, but
the bigger point for me is that any type of human sophistication (in technical
systems) usually loses to the general search/compute methods that scale to
infinity and are convex in nature, compared to the concave approach of human
sophistication. The most visual example is in the computer vision space where
you had a bunch of sophisticated math models like
[SIFT](https://en.wikipedia.org/wiki/Scale-invariant_feature_transform) that
were made to detect robust features to do something bigger, but were completely
replaced by convolutions in neural nets.

This brings me to something I have been thinking about for quite some time now.
As you are probably aware, there are a bunch of different data models
implemented in different database systems. The question is: **what data model is
the most suited for AI (LLM driven agents)?**. Thinking from perspective that
will introduce the least human sophistication and enable search and compute to
scale.

We are probably a few years away from AGI or the LLM bubble bursting (it will be
interesting to read this in a few years). That means we still need to somehow
manage the data models that are most common to humans and LLM driven agents.

I have been tinkering around the actual data model on the logical and
representation level (software), not the actual storage model (hardware). At the
point when AGI hits, who knows how data would be represented then, probably in
some synapse-style baked into the hardware. Who knows what the memory of that
system will look like, but I guess we won't abandon the current deterministic
computations in software on the data from databases since it is much superior to
the human brain in deterministic computation, and we still need a human-readable
format we use today.

## Shortest history of data models

An obvious start could be: what do we have currently in the store?

If you prefer the short history of how things evolved:

- Flat files (1950s and 1960s)
- Hierarchical Model and Network model (1960s and 1970s)
- Relational model (1970s)
- NoSQL key-value, document, object, graph (2000s)

Each of these periods was an era of discovery and adoption. In each of the
periods, some of the models showed their strengths and weaknesses, but it was
super early days for each of the data models. Graph was initially started in the
1960s and later revisited in the NoSQL era, but the relational model was the
prime winner so far.

The main reason is that it was the most suited for what was needed at the time:
a decent level of structure and rigidity to power the simpler businesses that
were starting to pop up. Pair that with the time we spent working, improving,
and breaking the relational model in the last 50 years, and it grew to be the
most reliable and widely adopted data model out there that most companies and
engineers use. The relational model scaled and it works today; it is not
outdated by any means. The most recent example is [OpenAI scaling ChatGPT to 800
million users via Postgres](https://openai.com/index/scaling-postgresql/).

It is important to know that network effects, serendipity, and human bias play
an important role in the development of technology. You won't pick a key-value
or a graph database if you haven't used it before or didn't have exposure to it.
Usually the choice is something that happens by accident, you find you need some
feature or the current system becomes too rigid, and then you go an pick
something from your mind. Think about this way if you just need to smack a nail
into the wood, you may pick the first rock you find on the ground, not the
hammer 30 meters away. Don't fool yourself that you are always picking the
optimal tool.

## Picking the optimal data model

Well, the obvious way we could start applying the bitter lesson is the level of
structure we have in our database systems. The more structure we need to
provide, the more the system is locked into our way of thinking about it. Think
about it this way: if you have a box you can write into, you have already
created the box and limited it to a box. Now ask yourself, how are you
envisioning AI?

Well, I am envisioning that it will be over some of my data that is completely
messy, and without me doing anything it will be able to reason and figure out
how we got to that point (scaling search and compute). Now this is what you
would ideally want in your daily life and in business, the data model that
learns as you go and can enable scalable search on the fly. The search is
important since you don't want to spend any resources you don't have.

What I described above is **flexibility** of the system to represent any data
point, relationship, or structure. So the data model needs to be flexible and
represent some **structure** at the same time.

If we take a look at the data systems, we would have the following structure and
flexibility:

| Data Model                | Structure           | Flexibility       |
| ------------------------- | ------------------- | ----------------- |
| Flat files                | Fragmented          | Not flexible      |
| Relational                | Structured          | Somewhat flexible |
| Object/Document/Key value | Somewhat Fragmented | Flexible          |
| Graph                     | Structured          | Flexible          |


Relational models can also be quite flexible, but the schema needs to be created
upfront. This means before putting data in you need to create the box, which
defeats the purpose of freely moving AI. In the example of OpenAI and scaling
Postgres, they are not allowed to change the schema. They can't even change the
box they have created to write into. I am not mocking here, I am impressed by
what they did, but it strikes the direct point I am making: the relational model
is not so flexible.

Object, Document and key value store are in the same bucket since their
capability to represent structure is limited.

Vectors in themselves are not in the table since I don't consider them a data
model. Rather, they are a compression or search index for some data. More on
that in the next blog.

You will probably notice that I am infinitely biased towards Graph data
structures because I work at [Memgraph](https://memgraph.com/), but that is not
the point here. The point is trying to find the best model to represent
**flexibility** of schema and **structure** between different things that happen
in life. Graph model seems to fit perfectly into this based on the metric I am
thinking about.

## Metric of data models

Tinkering about the data model is all about the **metric** that data model needs
to serve. My personal metrics are being able to represent **structure** and
**flexibility**. These two metrics in my mind are the most important ones.

Of course, implementing this into the transactional, scalable and robust systems
is a different challenge, but it should move us to the ideal system that holds
the data model designed natively for AI.

The opposite question can also be valid: what is the **metric** to evaluate the
capability of a data model?

Are there other metrics you would take into consideration?
