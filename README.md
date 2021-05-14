# Session Auth Example

This app uses a Rails API and React frontend that can be deployed to a single domain.

The goal of this app is to build use Rails built-in session features to authenticate
users making requests to the Rails API. The key requirement is:

- Frontend and backend must be on the same domain. Since most modern browsers
  now enforce [`SameSite` cookies][`samesite` explained],
  session cookies will only work for our app if it is on the same domain.

Optionally (since this adds a fair amount of complexity):

- The app should also use Rails CSRF tokens for protection against Cross-Site
  Request Forgery attacks. `SameSite` cookies offer a [good degree of protection
  against CSRF attacks][`samesite` owasp], but as an extra layer of protection,
  we can also use
  [CSRF tokens to safeguard browsers that aren't enforcing `SameSite` cookies][`samesite` and csrf].

For ease of deployment, both projects are contained in the same repository. All
React code is in the `/client` directory.

## Setup

```sh
bundle install
rails db:create db:migrate db:seed
npm install --prefix client
```

## Running the App in Development

Run this command:

```sh
rake start
```

To run React and Rails in development, this app uses the [`foreman`][`foreman`]
gem. Configuration for running in development is in the `Procfile.dev` file. For
convenience, there is a Rake task in `lib/tasks/start.rake` to run `foreman`.

In development, requests from the React app are
[proxied][create-react-app proxy], so you can write something like this (without
using a domain):

```js
fetch("/api/me").then((r) => r.json());
```

Since our deployed app will run on the same domain, this is a good way to
simulate a similar environment in development. It also helps avoid CORS issues.

## Deploying

Install Heroku CLI (if you don't already have it):

```sh
brew tap heroku/brew && brew install heroku
```

Login:

```sh
heroku login
```

Create new Heroku app:

```sh
heroku apps:create
```

Add [buildpacks][buildpacks] for Heroku to run:

- Rails app on Ruby
- React app on Node

```sh
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
```

Deploy:

```sh
git push heroku main
```

## Code Explanations

### Cookies/Sessions Setup

By default, when generating a new Rails app in API mode, the middleware for
cookies and sessions isn't included. We can add it back in (and specify the
`SameSite` policy for our cookies for protection):

```rb
# config/application.rb

# Adding back cookies and session middleware
config.middleware.use ActionDispatch::Cookies
config.middleware.use ActionDispatch::Session::CookieStore

# Use SameSite=Strict for all cookies to help protect against CSRF
config.action_dispatch.cookies_same_site_protection = :strict
```

We also need to include helpers for sessions/cookies in our controllers:

```rb
# app/controllers/application_controller.rb

class ApplicationController < ActionController::API
  include ActionController::Cookies
end
```

Now, we can set a session cookie for users when they log in:

```rb
def create
  user = User.find_by(username: params[:username]).authenticate(params[:password])
  session[:user_id] = user.id
  render json: user
end
```

You should include cookies when making any requests to the API. Here's how to
include cookies with `fetch`:

```js
fetch("/api/me", {
  credentials: "include",
});
```

Or with `axios`:

```js
axios.get("/api/me", {
  withCredentials: true,
});

// or, to enable for all requests:
// axios.defaults.withCredentials = true;
```

### Deploying Setup Explained

We'll deploy our frontend and backend to Heroku on one single app. There are a
couple key pieces to this configuration. First, the
[`Procfile`][`procfile`]:

```txt
web: bundle exec rails s
release: bin/rake db:migrate
```

This gives Heroku instructions on commands to run on **release** (run our
migrations), and **web** (run rails server).

Second, the `package.json` file in the **root** directory (not the one in the
**client** directory):

```json
{
  "name": "session-auth-example",
  "description": "Build scripts for Heroku",
  "engines": {
    "node": ">= 14"
  },
  "scripts": {
    "build": "npm install --prefix client && npm run build --prefix client",
    "clean": "rm -rf public",
    "deploy": "cp -a client/build/. public/",
    "heroku-postbuild": "npm run clean && npm run build && npm run deploy"
  }
}
```

The [`heroku-postbuild`][`heroku-postbuild`] script will run when our app has
been deployed. This will build the production version of our React app.

### React Router

For our deployed app, we need non-API requests to pass through to our React
application. Otherwise, routes that would normally be handled by React Router
will be handled by Rails instead.

Setup routes fallback:

```rb
# config/routes.rb
get '*path', to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
```

Add controller action:

```rb
class FallbackController < ActionController::Base

  def index
    render file: 'public/index.html'
  end
end
```

Note: this controller must inherit from `ActionController::Base` instead of
`ApplicationController`, since `ApplicationController` inherits from
`ActionController::API`. API controllers can't render HTML. Plus, we don't need
any of the auth logic in this controller.

[`samesite` explained]: https://web.dev/samesite-cookies-explained/
[`samesite` owasp]: https://owasp.org/www-community/SameSite
[`samesite` and csrf]: https://security.stackexchange.com/questions/121971/will-same-site-cookies-be-sufficent-protection-against-csrf-and-xss
[`foreman`]: https://github.com/ddollar/foreman
[create-react-app proxy]: https://create-react-app.dev/docs/proxying-api-requests-in-development/
[buildpacks]: https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app
[`procfile`]: https://devcenter.heroku.com/articles/procfile
[`heroku-postbuild`]: https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process
