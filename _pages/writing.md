---
layout: page
title: writing
permalink: /writing/
description: Posts I wrote for the Memgraph blog, from database internals to graph-powered AI.
nav: false
nav_order: 2
---

{% assign by_year = site.data.memgraph_posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in by_year %}

<h2 class="writing-year">{{ year.name }}</h2>
<ul class="writing-list">
  {% for post in year.items %}
    <li>
      <span class="writing-date">{{ post.date | date: '%b %d' }}</span>
      <a href="https://memgraph.com/blog/{{ post.slug }}" target="_blank" rel="noopener">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
{% endfor %}
