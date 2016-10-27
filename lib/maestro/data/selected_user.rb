module Maestro
  module Data
    class SelectedUser < Model
      attribute :id,          Integer
      attribute :first_name,  String
      attribute :last_name,   String
      attribute :employee_id, Integer
      attribute :customer_id, Integer
    end
  end
end
