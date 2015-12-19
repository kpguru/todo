class User < ActiveRecord::Base
  devise :token_authenticatable, :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  has_many :tasks
  
  scope :non_admins, where.not(admin: true)
  scope :approved, where(admin: false, approved: true)
  scope :pending, where(admin: false, approved: false)

  def clear_authentication_token!
    update_attribute(:authentication_token, nil)
  end
  
  def active_for_authentication? 
    super && (approved? || admin?)
  end 

  def inactive_message 
    if !approved? 
      :not_approved 
    else 
      super 
    end 
  end
  
end
