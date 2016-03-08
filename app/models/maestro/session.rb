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
      @app_id           = attributes['app_id']
      @expires_at       = attributes['expires_at']
      @expires_at_epoch = attributes['expires_at_epoch']
      @lms_host         = attributes['lms_host']
      @lms_id           = attributes['lms_id']
      @token            = attributes['token']
      @lms_data         = attributes['lms_data']

      attributes.fetch('lms_data', {}).each do |key, value|
        method = "#{key}="
        send(method, value) if respond_to?(method)
      end
    end

    attr_accessor :additional_data
    attr_accessor :app_id
    attr_accessor :email
    attr_accessor :expires_at
    attr_accessor :expires_at_epoch
    attr_accessor :first_name
    attr_accessor :last_name
    attr_accessor :launch_url
    attr_accessor :lms_data
    attr_accessor :lms_id
    attr_accessor :organization_id
    attr_accessor :organization_name
    attr_accessor :role
    attr_accessor :token
    attr_accessor :user_id

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
