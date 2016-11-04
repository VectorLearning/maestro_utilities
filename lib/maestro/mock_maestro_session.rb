class MockMaestroSession
  delegate :last_name, :first_name, :email, :role, to: :user

  def initialize(organization, user)
    @organization = organization
    @user = user
  end

  def user_id
    user.lms_u_id
  end

  def valid?
    true
  end

  def lms_id
    organization.lms_id
  end

  def lms_data
    { "organization_name" => organization.name,
      "organization_id" => organization.lms_organization_id }
  end

  private

  attr_reader :organization, :user
end
