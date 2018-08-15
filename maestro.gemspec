# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'maestro/version'

Gem::Specification.new do |spec|
  spec.name          = "maestro"
  spec.version       = Maestro::VERSION
  spec.authors       = ["Dev Team"]
  spec.email         = ["devteam@redvector.com"]

  spec.summary       = "A utility library to support Vector Solutions Maestro integrations."
  spec.homepage      = "https://www.github.com/VectorLearning/maestro_utilities"

  # Prevent pushing this gem to RubyGems.org by setting 'allowed_push_host', or
  # delete this section to allow pushing this gem to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = ""
  else
    raise "RubyGems 2.0 or newer is required to protect against public gem pushes."
  end

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler"
  spec.add_development_dependency "pg"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "rspec-rails"
  spec.add_development_dependency "webmock"

  spec.add_dependency "faraday"
  spec.add_dependency "rails"
  spec.add_dependency "react-rails"
  spec.add_dependency "virtus"
end
