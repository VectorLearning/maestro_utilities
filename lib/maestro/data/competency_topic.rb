module Maestro
  module Data
    class CompetencyTopic < Model
      attribute :id,         Integer
      attribute :name,       String
      attribute :sub_topics, Array[self]
    end
  end
end
