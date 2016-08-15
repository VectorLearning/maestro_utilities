module Maestro
  module Data
    class Category < Model
      attribute :id,   Integer
      attribute :name, String

      attribute :groups, Array[Group]
    end
  end
end
