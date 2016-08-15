module Maestro
  module Data
    module GetCategories
      extend HttpService

      def self.call(session)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/categories'
          request.params['token'] = session.token
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        headers = response.headers

        categories = data.fetch('categories', [])
          .map { |data| ::Maestro::Data::Category.new(data) }

        { headers: headers, categories: categories }
      end
    end
  end
end
