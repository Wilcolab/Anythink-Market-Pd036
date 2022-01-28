# Anythink Market Backend

The Anythink Market backend is Ruby web app written with [Ruby On Rails](https://rubyonrails.org/)

## Getting started

If you don't have it, install ruby 2.7 using:
`rvm install 2.7.0` (granted you're using rvm...)

Install dependencies by running `bundle install`

To start the app use: `./start.sh` from the backend directory.

Make sure your DB is up and running.

## Dependencies

- [acts_as_follower](https://github.com/tcocca/acts_as_follower) - For implementing followers/following
- [acts_as_taggable](https://github.com/mbleigh/acts-as-taggable-on) - For implementing tagging functionality
- [Devise](https://github.com/plataformatec/devise) - For implementing authentication
- [Jbuilder](https://github.com/rails/jbuilder) - Default JSON rendering gem that ships with Rails, used for making reusable templates for JSON output.
- [JWT](https://github.com/jwt/ruby-jwt) - For generating and validating JWTs for authentication

## Folders

- `app/models` - Contains the database models for the application where we can define methods, validations, queries, and relations to other models.
- `app/views` - Contains templates for generating the JSON output for the API
- `app/controllers` - Contains the controllers where requests are routed to their actions, where we find and manipulate our models and return them for the views to render.
- `config` - Contains configuration files for our Rails application and for our database, along with an `initializers` folder for scripts that get run on boot.
- `db` - Contains the migrations needed to create our database schema.

## FAQ

_Q_: I'm getting this error:

```
ActiveRecord::ConnectionNotEstablished
connection to server on socket "/tmp/.s.PGSQL.5432" failed: No such file or directory
Is the server running locally and accepting connections on that socket?
```

_A_: make sure you have postgres install and running: See article https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/

I had an old version of postgresql install so I had to update it:

```
brew services stop postgresql
brew postgresql-upgrade-database
brew services start postgresql
```

You can see the running proceses by running: `brew services list` (make sure postgresql doesn't have an error)

_Q_: `connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL: database "yourname" does not exist`

_A_: I needed to create the DB, so I ran `rake db:create` but got this error:

```
no implicit conversion of nil into String
Couldn't create '' database. Please check your configuration.
rake aborted!
TypeError: no implicit conversion of nil into String
```

To fix this I went into `database.yml` and added this on line 6:

```
database: anything
```

then ran `rake db:create` and it worked

_Q_: trying to run app and getting this message in the browser: `API server is up and running, please use the frontend app to interact with the system`.

_A_: The FE and the BE apps are running on the same port. Once I started the BE app I restarted the FE app in a different port (you will be prompted in the console to do so)
