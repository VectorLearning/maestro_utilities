require 'maestro/connection'

module Maestro
  class Session
    def self.fetch token
      response = Maestro.connection.patch do |request|
        request.url '/v1/sessions'
        request.headers['Content-Type'] = 'application/json'
        request.body = JSON.generate({
          session: {
            token: token
          }
        })
      end

      if response.success?
        new(JSON.parse(response.body.presence || '{}'))
      else
        InvalidSession.new
      end
    end

    def initialize attributes
      @api_key          = attributes['api_key']
      @app_id           = attributes['app_id']
      @created_at       = attributes['created_at']
      @email            = attributes['email']
      @expires_at       = attributes['expires_at']
      @expires_at_epoch = attributes['expires_at_epoch']
      @first_name       = attributes['first_name']
      @last_name        = attributes['last_name']
      @launch_urls      = attributes['launch_urls']
      @lms_id           = attributes['lms_id']
      @role             = attributes['role']
      @token            = attributes['token']
      @user_id          = attributes['user_id']
    end

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
      Maestro.connection.delete do |request|
        request.url '/v1/sessions'
        request.headers['Content-Type'] = 'application/json'
        request.body = JSON.generate({
          session: {
            token: token
          }
        })
      end
    end

    def valid?
      true
    end
  end
end
