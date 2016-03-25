module Maestro
  module Data
    module HttpService
      def ensure_successful_response response
        raise GatewayError          if response.status == 502
        raise GatewayError          if response.status == 504
        raise MethodNotAllowedError if response.status == 405
        raise UnauthorizedError     if response.status == 401
        raise ResponseError         unless response.success?
      end

      def parse_json data, fallback='{}'
        JSON.parse(data.presence || fallback)
      end
    end
  end
end
