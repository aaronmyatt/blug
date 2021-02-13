---
title: Laravel Events Docs Notes
category: laravel
tags: laravel, digging deeper, events
---

# Binging on Docs: Laravel [Events](https://laravel.com/docs/8.x/events)

## Cheat Codes

```php
php artisan event:generate
php artisan make:event PodcastProcessed
php artisan make:listener SendPodcastNotification --event=PodcastProcessed
```

```php
Event::listen()
Event::listen(queueable(function(){}));
Event::listen(queueable(function(){})->onConnection('redis')->onQueue('podcasts')->delay(now()->addSeconds(10))->catch());

use App\Events\YourEvent;
YourEvent::dispatch($model);
```

```php
// Async
use Illuminate\Contracts\Queue\ShouldQueue;
class YourListener implements ShouldQueue
public $afterCommit = true;
public $tries = 5;
public $connection = 'sqs';
public $queue = 'listeners';
public $delay = 60;
public function shouldQueue(YourEvent $event){}
public function failed(YourEvent $event){}
public function retryUntil()
{
    return now()->addMinutes(5);
}
```

## Events & Listeners

### Notes

Events and their corresponding listeners can be registered in the `App\Providers\EventServiceProvider` `protected $listen=[]` property.

Events and Listeners may also be registered in the `App\Providers\EventServiceProvider` `boot()` method using the `Event` facade.

To conveniently listen for multiple events, checkout [Wildcard Listeners](https://laravel.com/docs/8.x/events#wildcard-event-listeners).

To autodiscover Listeners (and their `handle()` method type hinted events), add the following to the `App\Providers\EventServiceProvider`:

```php
public function shouldDiscoverEvents()
{
    return true;
}
```

**Though don't forget to `event:clear` and `event:cache` in production.**

Events, generally defined in the `/app/Events` directory, are plain old PHP classes that will be passed to a Listener classes `handle()` method.

Similarly, Listeners, generally defined in `/app/Listeners`, are plain classes that are expected to implement a `handle()` method.

To listen for multiple events explictly, [Subscriber](https://laravel.com/docs/8.x/events#event-subscribers) classes may also be registered in the `EventServiceProvider`, under the `protected $subscribe = [];`

To resolve events asynchronously, using something like Redis, the `ShouldQueue` (`use Illuminate\Contracts\Queue\ShouldQueue;`) contract should be implemented on the Listener.

**Naturally a [Queue](https://laravel.com/docs/8.x/queues) must be configred for async functionality.**

There are a variety of options for conditionally handling queued tasks, managing when they are performed and interacting directly with the queue, [read more here](https://laravel.com/docs/8.x/events#queued-event-listeners).


