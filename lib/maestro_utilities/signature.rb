require 'base64'
require 'openssl'

module MaestroUtilities
  class MaestroUtilities::Signature
    HASH = 'sha256'
    SEED = ENV['MAESTRO_SEED']

    attr_accessor :params
    attr_accessor :seed

    def self.valid?(params)
      Rails.logger.info "REQUEST PARAMS: #{params.except(:signature) if defined?(Rails)}"
      Rails.logger.info "WITHIN TIMEOUT? #{params.fetch(:expires).to_i < Time.now.to_i}"
      return false if params.fetch(:expires).to_i < Time.now.to_i
      Rails.logger.info "SIGNATURES MATCH? #{new(params.except(:signature)).signature == params.fetch(:signature)}"
      new(params.except(:signature)).signature == params.fetch(:signature)
    rescue KeyError
      false
    end

    def initialize(params, options={})
      self.params = params
      self.seed = options.fetch(:seed, SEED)
    end

    def signature
      encode(digest(query_string)).gsub('+', '_')
    end

    def to_query
      params.merge(signature: signature).to_query
    end

  private

    def digest(text)
      digest = OpenSSL::Digest.new(HASH)
      signature = OpenSSL::HMAC.digest(digest, seed, text)
    end

    def encode(value)
      Base64.encode64(value).chomp
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
