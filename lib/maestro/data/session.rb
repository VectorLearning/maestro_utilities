module Maestro
  module Data
    class Session < Model
      # Macro to create convenience methods for accessing parts of lms_data
      # attribute.
      def self.lms_data_attribute attribute
        define_method(attribute) do
          lms_data[attribute.to_s]
        end
      end

      attribute :app_id,            String
      attribute :expires_at,        Time
      attribute :expires_at_epoch,  Integer
      attribute :launch_url,        String
      attribute :lms_data,          Hash
      attribute :lms_id,            String
      attribute :token,             String

      lms_data_attribute :email
      lms_data_attribute :first_name
      lms_data_attribute :last_name
      lms_data_attribute :role
      lms_data_attribute :user_id

      def initialize attributes={}
        super
        @valid = attributes.fetch(:valid, false)
      end

      def valid?
        @valid
      end
    end
  end
end
