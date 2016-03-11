module Maestro
  class InvalidSession
    attr_reader :api_key
    attr_reader :app_id
    attr_reader :created_at
    attr_reader :email
    attr_reader :expires_at
    attr_reader :expires_at_epoch
    attr_reader :first_name
    attr_reader :last_name
    attr_reader :launch_urls
    attr_reader :lms_id
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
