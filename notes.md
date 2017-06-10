---
layout: page
title: Notes
hero: /assets/images/hero-book-phone2.jpg
classes: notes
---

{% include lead.html content="I don&rsquo;t write much, but you&rsquo;ll find a collection of interesting bits gathered from around the web." %}

<div class="posts">
{% for post in site.posts %}
	<article class="post">

		<h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

		<div class="entry">
			{{ post.excerpt }}
		</div>

		<a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
	</article>
{% endfor %}
</div>
