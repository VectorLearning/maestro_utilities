# Maestro Utilities

This gem provides a utility library to support Maestro integrations.

## Installation

Add this line to your application's Gemfile:

```ruby
gem "maestro", github: "VectorLearning/maestro-gem"
```

Execute in your terminal:

```sh
$ bundle
```

Configure Maestro in your application, such as in an initializer:

```ruby
Maestro.configure do |config|
  config.seed = 'my-seed' # Must match core Maestro application (See Jason)
end
```

# Usage

Reference classes such as:

```ruby
Maestro::Signature.new()
```

## Development

After checking out the repo, run `bin/setup` to install dependencies.

Then, run `bundle exec rspec spec` to run the tests. You can also run
`bin/console` for an interactive prompt that will allow you to
experiment.
