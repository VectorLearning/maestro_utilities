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
      @expires_at       = attributes['expires_at']
      @expires_at_epoch = attributes['expires_at_epoch']
      @lms_id           = attributes['lms_id']
      @token            = attributes['token']
      @lms_data         = attributes['lms_data']
    end

    attr_reader :api_key
    attr_reader :app_id
    attr_reader :expires_at
    attr_reader :expires_at_epoch
    attr_reader :lms_id
    attr_reader :token
    attr_reader :lms_data

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
