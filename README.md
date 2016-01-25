# Maestro Utilities

This gem provides a utility library to support Maestro integrations.

## Installation

Add this line to your application's Gemfile:

```ruby
gem "maestro_utilities", github: "VectorLearning/maestro_utilities"
```

Add this line to your applications/s application.rb file:

```ruby
require 'maestro_utilities'
```

Add an ENV variable for 'MAESTRO_SEED' matching the core Maestro application. (See Jason)

And then execute:

    $ bundle

# Usage

Reference classes such as:

```ruby
MaestroUtilities::Signature.new()
```

## Development

After checking out the repo, run `bin/setup` to install dependencies.

Add an ENV variable to your profile (ex. ~/.zshrc.local), such as:

export MAESTRO_SEED=SOME_SECURE_SEED

Then, run `bundle exec rspec spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.
