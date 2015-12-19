# Create admin user
admin_user = User.find_by_email('admin@example.com')
if admin_user.present?
  admin_user.admin = true
  admin_user.save!
  puts "Admin user updated"
else
  User.create(:email => 'admin@example.com', :password => '123456789', :password_confirmation => '123456789', :admin => true)
  puts "Admin user created"
end
