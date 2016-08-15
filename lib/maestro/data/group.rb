module Maestro
  module Data
    class Group < Model
      attribute :id,          Integer
      attribute :name,        String
      attribute :category_id, Integer
    end
  end
end
