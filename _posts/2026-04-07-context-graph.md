---
layout: post
title: The Context Graph
date: 2026-04-14 00:00:00
description: Notes on how to think about the context graph.
tags: AI, graphs, knowledge
categories: AI
---


# Agentic harnesses and prompting

Turns out that a lot of manual work has moved toward using LLMs to drive parts
of our daily workflows. At some point in your work you are probably using them,
because they are highly effective and, frankly, addictive. If you are not, you
are probably in some state of Nirvana, and I am not sure why you should be
reading this blog.

Your work starts by opening your terminal, favorite agentic IDE, or a GUI like
CoWork. I am assuming you are using some SoTA model wrapped in an [agentic
harness](https://www.anthropic.com/engineering/harness-design-long-running-apps).
If you are doing this in the web interface, you are probably about a year behind
what is currently possible. I know that sounds a bit like AI-bro advice, but I
mean it.

The key is that the LLM running your prompts has access to tools, skills, and
MCP servers it can operate on. That means it has hands to perform tasks for you.
Good, now we get to the fun part: the LLM doing some work for you. Jake has sent
you a message, you have seen the start of it and a link inside, and you decide
that the agent should deal with it:

> Take a look at the message Jake sent to the infra channel. There is a link in
> the message. Review it and do as much work as you can autonomously.

The big question is: how should the agent think about this task?

## Context engineering

The agent operates purely on context. It is like a working memory it can
process, and that memory is highly limited, so it needs to stay lean and
optimized. You have given the agent a task through a prompt it needs to
interpret, but there is not much context in it. So the question is: what is the
context in this case?

It is actually:

- Infra channel
- Message and message content
- Link and link context
- Review task
- Permission to operate autonomously

That is the context **you see from the prompt** you have written. There is also
a system prompt and more, which goes under the topic of [prompt
engineering](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview),
and I will not go into that rabbit hole here, but it is important that different
levels of prompts exist.
  
Now the question becomes: what **context is not visible from your prompt**? As
an employee in a company, you probably carry a lot of context based on the
current state of the company, so the task sounds easy to you. Here are some
examples of what is not visible:

- Who are you inside the organization, what are your role, responsibilities,
  actions you can take? (roles, actions)
- What is Jake's role, responsibilities, and actions he can take? (roles,
  actions)
- What is driving Jake's message? (decision)
- How does the task contribute to company goals, metrics, or the unit as a
  whole? (impact)

That is the kind of context that can be captured, and it goes into the topic of
[context
engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
because it is exactly the context that is currently missing from your prompt.


The question is: where are you getting that context from, and how are you
retrieving it?

## Context graphs

At this point in time there are several approaches you can take to solve this
problem of retrieval, but if we are talking about enterprise knowledge bases,
that knowledge is stored in multiple places and formats, and the question is how
all of it connects under a single umbrella.

[As I have discussed before, it turns out that the graph model is great for
modeling](/blog/2026/best-data-model-for-AI/) in the AI space due to its flexibility and its ability to represent
structure.

A **context graph** for me is a **knowledge graph** organized specifically for
agents to consume. So it is an AI-first graph solution to a given problem and a
use case.

## Context graph use cases

Use cases are already appearing everywhere, but in my current state of mind,
here are some examples with short descriptions:

- **Agent Memory graphs** -> What is the work the agent has done prior to this?
  What do agents already know about this problem?
- **Agent Decision trees/traces** -> Storing, retrieving, and evolving decision
  traces. What were the decisions and why?
- **Agent Actions graphs** -> What actions can the agent take, what is the right
  action to take, and what responsibility or ability is attached to that action?
- **Agent Code graphs** -> How are source files and components composed
  together, and what are their dependencies?
- **Skills graphs** -> What skills need to evolve or be used to solve a
  particular problem?
- **Agent entity/ontology/data graphs** -> What is the actual data or problem
  the agent is working on, and what problem is it trying to solve relative to
  organizational data?
- ...

Obviously this list can keep going, so in my mind there is no single context
graph use case. It is really about the application of graph models and graph
algorithms to solve context-engineering problems.

## Technical challenges and ambiguity

We are still mostly operating in single-player mode, where you run agents toward
a goal using graph data, memory, tools, and components that are mostly local to
you. The harder problem is making this work in an environment where multiple
agents, teams, and systems are operating at the organizational level
(multiplayer environment) at the same time. That is where context graphs become
much more interesting, and much harder to build.

Turns out from time to time we really like to explain some theoretical concept
with different names, which introduces ambiguity. The reason usually comes from
the background of the author, or from the fact that the theory itself stands on
shaky legs, so people reuse the same theory in conjecture while trying to fit it
to the actual narrative they are working through.

Thinking about GraphRAG, I see context graphs as the broader framing. GraphRAG
usually describes a retrieval pattern: use graph structure to improve retrieval
and generation. A context graph is a wider operational concept that also covers
memory, actions, constraints, and provenance.

That is why I think **context graph** is the more useful term for the workloads
we are starting to face. The point is not just to retrieve better context. The
point is to organize the environment around the agent in a way that makes
reasoning and action more reliable and efficient.


Some of the sources I came across while thinking about context graphs before
writing this blog, but I find them missing the bigger picture:

- [Context Graph](https://arxiv.org/abs/2406.11160)
- [Context Graphs: AI's Trillion-Dollar
  Opportunity](https://foundationcapital.com/ideas/context-graphs-ais-trillion-dollar-opportunity)

