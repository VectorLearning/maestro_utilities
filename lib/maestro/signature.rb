require 'base64'
require 'openssl'

module Maestro
  class Signature
    HASH = 'sha256'

    attr_accessor :params
    attr_accessor :seed

    def self.valid?(params)
      Rails.logger.debug "REQUEST PARAMS: #{params}"
      Rails.logger.debug "VERIFICATION SIGNATURE: #{new(params.except(:signature)).signature}"
      Rails.logger.debug "TIME NOW: #{Time.now.to_i}"
      Rails.logger.debug "EXPIRED? #{params.fetch(:expires).to_i < Time.now.to_i}"
      Rails.logger.debug "SIGNATURES MATCH? #{new(params.except(:signature)).signature == params.fetch(:signature)}"
      return false if params.fetch(:expires).to_i < Time.now.to_i
      new(params.except(:signature)).signature == params.fetch(:signature)
    rescue KeyError
      false
    end

    def initialize(params, options={})
      self.params = params
      self.seed = options.fetch(:seed) { Maestro.config.seed }
    end

    def signature
      encode(digest(query_string))
    end

    def to_query
      params.merge(signature: signature).to_query
    end

  private

    def digest(text)
      digest = OpenSSL::Digest.new(HASH)
      OpenSSL::HMAC.digest(digest, seed, text)
    end

    def encode(value)
      Base64.urlsafe_encode64(value).chomp
    end

    def query_string
      params
        .to_query
        .split('&')
        .sort_by { |pair| pair.split('=').first }
        .join('&')
    end
  end
end
