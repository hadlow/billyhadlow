---
layout: '../../layouts/Post.astro'
title: 'How I got a free ad on milliondollarhomepage.com'
description: 'A few years ago I got my hands on an ad on milliondollarhomepage.com for free, and it was super simple'
pubDate: '2024-12-27'
tags: ["milliondollarhomepage", "python", "internet-culture"]
---

![screenshot of my ad on milliondollarhomepage](https://raw.githubusercontent.com/hadlow/freemusicandmovies/refs/heads/main/ad.png)

A few years ago I got my hands on an ad on milliondollarhomepage.com for free. How? I scanned each domain on the site, checking to see if that domain is dead or not. If so, I could then manually check if the domain is available.

If you're unfamiliar with milliondollarhomepage.com, here's the [Wikipedia link](https://en.wikipedia.org/wiki/The_Million_Dollar_Homepage).

> The Million Dollar Homepage is a website conceived in 2005 by Alex Tew, a student from Wiltshire, England, to raise money for his university education. The home page consists of a million pixels arranged in a 1000 × 1000 pixel grid; the image-based links on it were sold for $1 per pixel in 10 × 10 blocks.

To make this easier, I wrote a simple Python script:

```python
import requests
import re
import httplib2
from bs4 import BeautifulSoup, SoupStrainer

http = httplib2.Http()
status, response = http.request('http://www.milliondollarhomepage.com/')

domains = []

f = open("domains.txt", "a")

for link in BeautifulSoup(response, parse_only=SoupStrainer('area')):
    if link.has_attr('href'):
        domain = re.search("^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)", link['href']).group()
        domain = domain.replace("http://", "")
        domain = domain.replace("https://", "")
        domain = domain.replace("www.", "")

        if domain not in domains:
            try:
                r = requests.head(link['href'])
            except requests.ConnectionError:
                domains.append(domain)
                f.write(domain + "\n")
                print(domain)

f.close()
```

This is some very rough python code, but it serves it purpose. Also, I don't see why the domains for the ads will ever change, given the site is so old now. So I've got the [list here](https://github.com/hadlow/mdh-domains/blob/main/domains.txt) of all the domains.

As you can see from the screenshot above, I managed to get a teeny ad next to the big "Free hosting" ad. The domain for this is [freemusicandmovies.com](freemusicandmovies.com). I don't have anything interesting on the website and I don't intend on doing anything with it; this was just a fun experiment and a way to own a small piece of internet history.

You can view the full repo [here](https://github.com/hadlow/mdh-domains).
