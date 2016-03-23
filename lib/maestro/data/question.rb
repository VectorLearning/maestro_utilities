module Maestro
  module Data
    class Question < Model
      attribute :answers,  Array[Answer]
      attribute :id,       Integer
      attribute :text,     String
    end
  end
end
