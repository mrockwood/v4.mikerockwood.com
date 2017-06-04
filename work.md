---
layout: default
title: Work
hero: /assets/img/hero-macbook-air2.jpg
classes: work
---

<p class="lead">I&rsquo;ve been building websites professionally for eight years. Here are some of my favorite projects.</p>

<div class="project-list project-list--work">
{% assign sorted = (site.work | sort: 'date') | reverse %}
{% for project in sorted %}
  {% unless project.preview %}
    {% include project.html project=project %}
  {% endunless %}
{% endfor %}
</div>
