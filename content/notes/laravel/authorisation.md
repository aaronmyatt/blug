---
title: Laravel Authorisation Docs Notes
description: Laravel Authorisation
category: laravel, security, authorisation
---

# Binging on Docs: Laravel [Authorisation](https://laravel.com/docs/8.x/authorization)

## Cheat Codes

- `$this->authorize()`
- `@can @elsecan @endcan`
- `@cannot @elsecannot @endcannot`
- `@unless @endunless` 
- `@canany([...], $modelInstance) @elsecanany @endcanany`
- `$user->can()` / `$user->cannot()`

**Gates**
- `Gate::define()`
- `Gate::allows()`
- `Gate::forUser()`
- `Gate::any()` / `Gate::none()`
- `Gate::check()`
- `Gate::inspect()`
- `Gate::authorize()`
- `Gate::before()` / `Gate::after()`

**Policies**

For the most part, calling a Gate check will utilise corresponding Policy if it exists.

- `php artisan make:policy PostPolicy`
- `php artisan make:policy PostPolicy --model=Post`


## Gates
### Notes

Gates are checks that require a simple callback to determine if a user is permitted to perform the action behind the Gate.

Adding new Gates can be done within the `AuthServiceProvider` `boot` method.

```php
use Illuminate\Support\Facades\Gate;

// Callback
Gate::define('update-post', function (User $user, Post $post) {
    return $user->id === $post->user_id;
});

// Classes array
Gate::define('update-post', [PostPolicy::class, 'update']);
```

Gate checks can be sprinkled throughout controllers in a variety of ways:

```php
// no need to explicitly pass a $user, Laravel handles that
if (! Gate::allows('update-post', $post)) {
    abort(403);
}

if (Gate::forUser($user)->allows('update-post', $post)) {
    // The user can update the post...
}

// You can also check multiple Gates
if (Gate::any(['update-post', 'delete-post'], $post)) {
    // The user can update or delete the post...
}

if (Gate::none(['update-post', 'delete-post'], $post)) {
    // The user can't update or delete the post...
}
```

For convenience you can use `Gate::authorize` to automatcally throw a `403` error if the user does not permitted by a particular Gate.

An array of additional params can be passed to Gates to provide additional context:

```php
Gate::define('create-post', function (User $user, Category $category, $pinned) { ... });

// usage
if (Gate::check('create-post', [$category, $pinned])) {
    // The user can create the post...
}
```

Gate definitions may return a `Illuminate\Auth\Access\Response`, e.g.

- `Response::allow()`
- `Response::deny('You must be an administrator.');`

`Gate::inspect()` will automatically respect the response object, while `Gate::allow()` will simply return a Boolean.

`Gate::before()` and `Gate::after()` may be leveraged to perform actions before and after checks have been performed.

## Policies

Policies are authorization classes that can provide model or resource specific checks. Typically, a Policy will map directly to a Model class and reflect its method/action structure 1-to-1, so that when someone tries to `modelInstance->save()` a Policies corresponding `save` method will be called first to ensure that user may perform that action.

Policies can be utilised in much the same way as Gates, infact `Gate::allow()` / `Gate::authorize()` will use Policies when checking a users permissions for a particular action.

**TODO::** Whats the precedence for Gates vs Policies? If a Gate and a Policy exist for a particular Model/Action, will they both be used to authorize a user?

Policies will be autodiscovered if they follow the `{{ $modelName }}Policy` naming convention.

Just like Gates, Policy methods may return a `Illuminate\Auth\Access\Response`.

The `$this->authorize('action', $modelInstance)` helper may be used to check a users permissions inside controllers.

## Extras:

- [Manually registering polcies]([https://link](https://laravel.com/docs/8.x/authorization#registering-policies))
  - Or use the `Gate::guessPolicyNamesUsing(function ($modelClass) { ... });` helper from the `AuthServiceProvider`
- [How to handle Guest Users](https://laravel.com/docs/8.x/authorization#guest-users)
- [How to allow certain roles to bypass a Policy](https://laravel.com/docs/8.x/authorization#policy-filters)