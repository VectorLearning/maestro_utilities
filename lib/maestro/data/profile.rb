module Maestro
  module Data
    class Profile < Model
      attribute :email,       String
      attribute :first_name,  String
      attribute :id,          String
      attribute :last_name,   String
      attribute :role,        String
    end
  end
end
