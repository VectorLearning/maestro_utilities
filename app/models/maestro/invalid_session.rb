module Maestro
  class InvalidSession
    attr_reader :additional_data
    attr_reader :app_id
    attr_reader :email
    attr_reader :expires_at
    attr_reader :expires_at_epoch
    attr_reader :first_name
    attr_reader :last_name
    attr_reader :launch_url
    attr_reader :lms_data
    attr_reader :lms_id
    attr_reader :organization_id
    attr_reader :organization_name
    attr_reader :role
    attr_reader :token
    attr_reader :user_id

    def delete
      # NOOP
    end

    def valid?
      false
    end
  end
end
