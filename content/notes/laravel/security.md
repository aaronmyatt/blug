---
title: Binging on the Laravel Security Docs - My Notes.
description: Laravel Security
category: laravel, secrity, authentication
---

# Binging on the Laravel Security Docs - My Notes.

**Links**
- Your application's authentication configuration file is located at `config/auth.php`.
- For a ready to go auth setup and full set of code examples to explore:
  - [Laravel Breeze](https://github.com/laravel/breeze)
  - E.g. How to implement [login](https://github.com/laravel/breeze/blob/1.x/stubs/App/Http/Controllers/Auth/AuthenticatedSessionController.php) from scratch

**Cheat Codes**

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


## [Authentication](https://laravel.com/docs/8.x/authentication) Notes

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

