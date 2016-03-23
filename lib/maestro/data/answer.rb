module Maestro
  module Data
    class Answer < Model
      attribute :correct,  Boolean, default: false
      attribute :text,     String
    end
  end
end
