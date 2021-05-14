# Session Auth Example

## Setup

```sh
bundle install
rails db:create db:migrate db:seed
npm install --prefix client
```

## Running the App

```sh
rake start
```

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

Add [buildpacks](https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app)
for Heroku to run:

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
