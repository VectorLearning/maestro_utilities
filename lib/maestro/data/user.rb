module Maestro
  module Data
    class User < Model
      attribute :id,          Integer
      attribute :first_name,  String
      attribute :last_name,   String
      attribute :employee_id, Integer
      attribute :customer_id, Integer
      attribute :status,      String
      attribute :role,        String
    end
  end
end
