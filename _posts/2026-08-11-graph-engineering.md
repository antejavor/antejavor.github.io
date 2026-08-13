---
layout: post
title: Graph engineering
date: 2026-08-13 00:00:00
description: Deciphering graph engineering
tags: LLMs, AI, Graphs, Knowledge-graphs
categories: AI, Graphs
---

# Graph engineering move

For the past few years I have been working a lot with graphs. Having some skin
in the game around graphs helps you understand the bigger picture when
particular trends appear. Right now, the latest trend is what gets called
**"[graph engineering](https://x.com/steipete/status/2078277297791189132?s=20)"**, a term popularized by [Peter Steinberger](https://en.wikipedia.org/wiki/Peter_Steinberger_(programmer)), the author of OpenClaw.

The latest premise is that we may be transitioning from loops to graphs.

The idea is simple if we look at it from one perspective: through the lens of
time, and through how we have become used to working with LLMs.

# Moving in a straight line

In the early stages of LLM development, problem solving was mostly linear.

You moved through time toward a solution like this:

```
---> LLM ---> Prompt ---> LLM ---> Prompt---> .... And to eternity, or until the problem is solved
```


This is how the initial versions of what we now call a harness looked.

Initially, it was just a single prompt: you put some text into the LLM, and the
LLM returned the most probable continuation, which often led to a correct
solution. Early versions of harnesses had sliding windows, so only a few
previous messages were kept in context.

After a few interactions, the beginning of the conversation had completely moved
out of the context window.
 
You were the person pushing the LLM toward a solution. The two of you followed a
single thread of work together. It was the bare bones era of 2023. The autonomy
of work was still mostly in your hands.

The work was not glamorous and automatic. It meant you were making the decisions and
doing the quality control yourself. The model was useful, but it was like a
very confused intern with great self-esteem.

# Moving in a loop

The limitation of the line is that you have to make the line work and push the
line further. You need to guide the LLM toward the solution.

In the meantime, LLMs gained access to tools and MCP servers, which gave them
hands to operate more autonomously. This meant the LLM was now mostly capable of
solving smaller tasks from start to finish.

That also meant you were the bottleneck in accessing their potential output.
This is where loops come in.

Obviously, if you are moving in a loop, there is some circular condition that
keeps repeating.

There is a start state and an end state, so it is not a perfect circle. It is
closer to a state machine that your LLM moves through until it decides it has
completed the task and breaks the loop.

So it is a state machine with a fairly rigid structure that predefines the
states, something like this:

<img src="/assets/img/blog-graph-engineering/agentic-loop-dark.svg" alt="agentic
loop" width="900" />

[This picture is from the Anthropic Claude agentic loop
docs](https://code.claude.com/docs/en/how-claude-code-works#the-agentic-loop)


At this stage, an interesting dynamic appears. The two of you are no longer
really collaborating in the same way. The model is trying to find the solution
to your problem, and you step in only when needed while it mostly runs on its
own inside the loop. You are no longer the bottleneck for every step of the
process.

The LLM, or agent if you prefer that term, is actively trying to solve the
problem posed by your question. This means the agent has taken some autonomy
from you, or more precisely, you have delegated it.

It is autonomous in the way any semi-automatic machine is autonomous: once
started, it can run through a sequence without further supervision, but it still
depends on someone else to guide it correctly, define success, and clean up when
it does something stupid. Think of an automatic lawn mower, except it is not
really autonomous, only semi-automatic.

So the nature of work changes. You stop manually advancing every step of the
line and start managing boundaries around what it can do. This already shows
how powerful loops are.

The typical harness today has a loop. You can also configure different loops and
tasks to run on a schedule. For example, every hour it could check which PRs
were assigned to you and review them in a semi-supervised way with the tools
you gave it.

# Moving in a graph

One of the biggest changes happens when you drop fixed structures such as a
state machine and move into the domain of graphs. Graphs are strong causality
engines because they can represent states that do not yet exist and remain
unknown until the future unfolds. Thinking about the lawn mower for a moment,
imagine it wandering into your neighbor's yard and either getting you paid or
getting smashed to pieces. You do not know the outcome in advance.

I have written before about why I think the graph model is the most natural fit
for these kinds of AI workloads in [What is the best data model for
AI?](/blog/2026/best-data-model-for-AI/).

This matters for the nature of the agentic AI world. If you think about a
current LLM as operating token by token, it can take wildly different directions
if you change just a few tokens. Each of those directions can be intentional,
shaped by you as the composer and coordinator trying to steer the model
elsewhere.

Each of those directions is a particular version of the path. At any point, you
could have chosen a different route by changing only a few tokens. This yields a
graph of traces, changes, and internal thoughts that can be biased toward a
particular better solution.


Now imagine an army of LLMs running in loops, solving different problems while
cooperating with one another in graph space.

That means you have a subgraph of loops running to solve a particular task, and
then those loops create new subgraphs, potentially without end.

Something small like this:

```
           [Goal]
          /  |   \
         /   |    \
    [Loop A][Loop B][Loop C]
      /   \      \      \
     /     \      \      \
 [Loop A1][Loop A2][Loop B1][Loop C1]
     /   \     ...    ...      ...
    /     \          
...      ...  

```

This is where autonomy of work stops being partial to your hands and starts
becoming an organizational problem. Once many agents can branch, delegate, and
recombine, the human is no longer supervising individual steps. The human is
supervising a system of evolving components and failures that
happily produce more of themselves. You can model that system only with a graph.

If the graph is specifically organizing context for agents to consume, update,
and act on, then it also overlaps with what I called a [context
graph](/blog/2026/context-graph/).

In that world, your job is less about doing the work directly and more about
deciding which work deserves autonomy at all. Some tasks benefit from branching,
while some of them will fail flat on their face.


All of this happens while you are out drinking a macchiato and wondering whether
your future of work is in jeopardy because at that point you have a self-problem
solving army of agents working on a graph.







