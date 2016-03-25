RSpec.shared_examples 'an HTTP error handling service' do
  it 'throws GatewayError for HTTP 502 response' do
    request.and_return(status: 502)
    expect { response }.to raise_error(Maestro::Data::GatewayError)
  end

  it 'throws GatewayError for HTTP 504 response' do
    request.and_return(status: 504)
    expect { response }.to raise_error(Maestro::Data::GatewayError)
  end

  it 'throws MethodNotAllowedError for HTTP 405 response' do
    request.and_return(status: 405)
    expect { response }.to raise_error(Maestro::Data::MethodNotAllowedError)
  end

  it 'throws UnauthorizedError for HTTP 401 response' do
    request.and_return(status: 401)
    expect { response }.to raise_error(Maestro::Data::UnauthorizedError)
  end

  it 'throws ResponseError for other HTTP error response' do
    request.and_return(status: 500)
    expect { response }.to raise_error(Maestro::Data::ResponseError)
  end
end
