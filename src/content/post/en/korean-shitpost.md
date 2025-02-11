---
title: "AI Final for the LOLs"
description: "Exploring LSTMs and GPT Transformers"
publishDate: "03 March 2019"
language: "en"
tags: ["software"]
---

For my AI class final, I built two AI bots to infiltrate DCinside forums. One
running on basic LSTM, another powered by KoGPT 2.0. The results were pure
chaos - but also revealed fascinating insights into neural language models.

# Getting the Data: Adventures in Web Scraping

First things first: I needed data. A lot of it. I built a scraper using Scrapy
to collect posts from DCinside. The tricky part wasn't just grabbing the
content - it was avoiding bans and handling Korean text encoding properly.
DCinside has some interesting anti-bot measures, so I had to rotate user agents
and add random delays between requests to fly under the radar.

The scraper's architecture was pretty straightforward: start from the gallery
list, navigate through thread pages, and collect both posts and their comment
chains. I also grabbed metadata like post timing and user interactions. After
about two weeks of running (and occasionally tweaking when DCinside caught on),
I had a decent dataset of over 100k posts and 500k comments.

# Building the Bot: Flask + Celery

The bot runs on Flask, with Celery handling the async tasks. I chose Celery with
RabbitMQ as the message broker because text generation can take a few seconds,
and I didn't want to block the main thread. Here's the basic setup:

```python
from flask import Flask, request, jsonify
from celery import Celery
from bot_tasks import generate_response

app = Flask(__name__)
celery = Celery('bot', broker='amqp://localhost')

@app.route('/bot/reply', methods=['POST'])
def generate_bot_reply():
    post_data = request.json

    # Queue the generation task with Celery
    task = generate_response.delay(
        post_data['content'],
        post_data['context']
    )

    return jsonify({'task_id': task.id})

@app.route('/bot/status/<task_id>')
def check_status(task_id):
    task = generate_response.AsyncResult(task_id)

    if task.ready():
        return jsonify({
            'status': 'completed',
            'result': task.get()
        })

    return jsonify({'status': task.status})

# Celery task definition
@celery.task
def generate_response(content, context):
    # Randomly sleep 1-3 seconds to seem more human
    time.sleep(random.uniform(1, 3))

    if use_kogpt:
        response = kogpt_model.generate(content, context)
    else:
        response = lstm_model.generate(content, context)

    return {'response': response}
```

The bot watches for new posts, queues up response generation, and posts replies
when they're ready. To avoid being too obvious, I added random delays between
seeing a post and responding. Celery made it easy to handle multiple
conversations simultaneously and retry failed generations.

# The Models: LSTM vs KoGPT

The LSTM was my first attempt. Built it with two stacked LSTM layers (256 units
each) and trained it from scratch on the DCinside data. The results were...
special:

> Anonymous | XX LoL World Cup SKT looks like they'll win

> Reply: For real lol

> Reply: An old person talking about LoL instead of soccer in the soccer gallery

Original Korean:

> ㅇㅇ | XX 롤드컵 SKT 우승각이다

> Reply: ㄹㅇㅋㅋ

> Reply: 해축갤에서 축구보다 롤얘기하는 틀딱이네

The LSTM could form basic sentences but often lost the plot entirely. It would
mix up gaming terms, forget what it was talking about mid-post, and generally
write like a drunk freshman.

Then I tried KoGPT 2.0, which was a whole different story. After fine-tuning it
on DCinside data for about 5 epochs, the results were surprisingly good:

> Anonymous | How to play LoL on PS5.jpg

> 1. Sell the PS5
> 2. Buy a computer
> 3. Play League
> 4. Regret it

> Reply: Can we skip step 3 and go straight to 4?

Original Korean:

> 1. PS5 판다
> 2. 컴퓨터 산다
> 3. 롤한다
> 4. 후회한다

> ㅇㅇ | PS5로 롤하는 방법.jpg

> Reply: 3번 생략하고 4번으로 직행 가능?

The transformer architecture in KoGPT was much better at maintaining context and
understanding the weird cultural nuances of DCinside. It picked up on posting
styles, learned to use forum-specific formatting, and even started incorporating
current memes:

> Anonymous | How to see CSAT questions in advance.

> Take the exam again next year

Original Korean:

> ㅇㅇ | 수능 문제 미리보는 방법

> 재수한다

# The Technical Nitty-Gritty

Working with Korean text was its own challenge. I had to handle Unicode
normalization, deal with forum-specific formatting (like the ㅇㅇ| prefix for
anonymous posts), and preserve special characters like ㅋㅋㅋ (hahaha) and ㅠㅠ
(crying emoticon, similar to T_T) that are crucial for the forum's tone and
informal Korean conversation in general.

The KoGPT model needed some special handling too. I added custom tokens for
forum structure and modified the position embeddings to better handle reply
chains. Generation settings were tuned through trial and error - too high a
temperature and it went completely off the rails, too low and it got boring.

Deployment was interesting - I had to set up proper rate limiting and monitoring
because these models can get resource-hungry. The Flask app runs behind Gunicorn
with 4 workers, and RabbitMQ handles the message queue for the Celery tasks. I
also set up Flower (Celery's monitoring tool) to keep an eye on task processing
and failure rates.

# What I Learned

The biggest takeaway wasn't about the technical stuff - it was about how AI
models can learn cultural patterns. KoGPT didn't just learn Korean; it learned
DCinside Korean, which is practically its own dialect. It picked up on inside
jokes, learned the right way to time posts for maximum impact, and even started
mimicking the subtle differences between different forum sections.

It also raised some interesting ethical questions. Most users couldn't tell
KoGPT's posts from human ones, which is both cool and a bit concerning. I ended
up adding a small delay to responses and some randomization to make it feel more
natural - turns out instant, perfect responses are actually a dead giveaway that
something's not human.

# Future Plans

I've been thinking about improving the system by adding better context awareness
and maybe some classifier guidance to maintain consistent posting styles. The
current setup works, but it could be smarter about when and how it engages with
threads.

There's also room for better metrics. Right now, I'm mostly judging success by
engagement stats and manual review, but there might be better ways to measure
how "DCinside authentic" a post is.

This project started as a fun experiment for a class but taught me a ton about
practical AI deployment, Korean NLP, and the weird world of internet culture.
While the LSTM's posts were mainly good for laughs, KoGPT showed just how far
language models have come - even if we're just using them to shitpost about
League of Legends.
