---
title: Binging on the Laravel Security Docs - My Notes.
description: Laravel Security
category: laravel, secrity, authentication
---

# Binging on the Laravel Security Docs - My Notes.

## [Authentication](https://laravel.com/docs/8.x/authentication) Notes
### Cheat Codes
Read further down to understand these examples better:

- `$user = Auth::user();`
- `$id = Auth::id();`
- `$request->user()`
- `if (Auth::check())`
- `Auth::attempt(['email' => $email, 'password' => $password], $remember)`
- `redirect()->intended('dashboard');` / `Redirect::intended('dashboard');`
- `Auth::login($user, $remember = true);`
- `Auth::loginUsingId(1, $remember = true);`
- `Auth::logout();`
  - `$request->session()->invalidate();`
  - `$request->session()->regenerateToken();`
  - `redirect('/');`


**Links**
- Your application's authentication configuration file is located at `config/auth.php`.
- For a ready to go auth setup and full set of code examples to explore:
  - [Laravel Breeze](https://github.com/laravel/breeze)
  - E.g. How to implement [login](https://github.com/laravel/breeze/blob/1.x/stubs/App/Http/Controllers/Auth/AuthenticatedSessionController.php) from scratch

### Notes

Interact with currently logged in user object:
```php
use Illuminate\Support\Facades\Auth;

// Retrieve the currently authenticated user...
$user = Auth::user();

// Retrieve the currently authenticated user's ID...
$id = Auth::id();

```
Or via the Request object:

```php
use Illuminate\Http\Request;

// Remember, type-hinted classes will automatically be injected into your controller methods.
$request->user()

// Or utilise the Facase directly
use Illuminate\Support\Facades\Request;
Request::user();
```

Checking for logged in status:

```php
use Illuminate\Support\Facades\Auth;

if (Auth::check()) {
    // The user is logged in...
}
```

Logging in a user:

```php
Auth::attempt(['email' => $email, 'password' => $password], $remember)
// the docs encourage running $request->session()->regenerate(); following a successful login to prevent "session fixation" attacks.

// The second argument utilises the `remember_token` column on the User model to persist login.
```

Redirect a logged in user to the route they attempted to reach before being asked to login:

```php
redirect()->intended('dashboard');

// Or via the Facade
Redirect::intended('dashboard');

// 'dashboard' is a fallback path.
```

Explicitly login a particular user object, such as following registration:

```php
Auth::login($user, $remember = true);

// or via ID
Auth::loginUsingId(1, $remember = true);
```

Logging users out:
```php
public function logout(Request $request)
{
    Auth::logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/');
}
```

Methods available on any `Authenticatable` contract object (typically your User object):
```php
public function getAuthIdentifierName();
public function getAuthIdentifier();
public function getAuthPassword();
public function getRememberToken();
public function setRememberToken($value);
public function getRememberTokenName();
```

If implementing the User model manually, ensure it has the correct fields:
  - `password` field > 60 chars
  - `remember_token` > 100 chars
  
All Laravel built in authentication functionality are behind two Fascades:
  - `Auth`
  - `Session`

If you need API or SPA/OAuth authentication, Laravel recommends using the [Laravel Sanctum](https://laravel.com/docs/8.x/sanctum) library.

When requiring login before users can access specific routes via the `auth` middleware, you can provide a custom redirect route in: `app/Http/Middleware/Authenticate.php`

### Extras
Laravel also provides these features out of the box:

- [Basic HTTP Auth](https://laravel.com/docs/8.x/authentication#http-basic-authentication)
- [Capabilities to logout users across all devices](https://laravel.com/docs/8.x/authentication#invalidating-sessions-on-other-devices)
- [On demand password confirmation, to doubly secure protected areas of your app](https://laravel.com/docs/8.x/authentication#password-confirmation)

If you want to go a bit deeper and truly customise your Auth implementation, perhaps to support a niche database or authentication mechanism, the following sections are worth reading:

- [Adding Custom Guards](https://laravel.com/docs/8.x/authentication#adding-custom-guards)
- [Custom User Providers](https://laravel.com/docs/8.x/authentication#adding-custom-user-providers)
- [User Provider Contract](https://laravel.com/docs/8.x/authentication#the-user-provider-contract)
- [Authenticatable Contract](https://laravel.com/docs/8.x/authentication#the-authenticatable-contract)


## [Authorisation](https://laravel.com/docs/8.x/authorization) Notes

### Cheat Codes

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


### Gates
#### Notes

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

### Policies

Policies are authorization classes that can provide model or resource specific checks. Typically, a Policy will map directly to a Model class and reflect its method/action structure 1-to-1, so that when someone tries to `modelInstance->save()` a Policies corresponding `save` method will be called first to ensure that user may perform that action.

Policies can be utilised in much the same way as Gates, infact `Gate::allow()` / `Gate::authorize()` will use Policies when checking a users permissions for a particular action.

**TODO::** Whats the precedence for Gates vs Policies? If a Gate and a Policy exist for a particular Model/Action, will they both be used to authorize a user?

### Cheat Codes

```php
php artisan make:policy PostPolicy
php artisan make:policy PostPolicy --model=Post
```

Policies will be autodiscovered if they follow the `{{ $modelName }}Policy` naming convention.

Just like Gates, Policy methods may return a `Illuminate\Auth\Access\Response`.

The `$this->authorize('action', $modelInstance)` helper may be used to check a users permissions inside controllers.

### Extras:

- [Manually registering polcies]([https://link](https://laravel.com/docs/8.x/authorization#registering-policies))
  - Or use the `Gate::guessPolicyNamesUsing(function ($modelClass) { ... });` helper from the `AuthServiceProvider`.
- [How to handle Guest Users](https://laravel.com/docs/8.x/authorization#guest-users)
- [How to allow certain roles to bypass a Policy](https://laravel.com/docs/8.x/authorization#policy-filters)
- 