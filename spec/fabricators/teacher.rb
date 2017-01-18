Fabricator(:teacher) do
  first_name FFaker::Name.first_name
  last_name FFaker::Name.last_name
  password 'password'
  email FFaker::Internet.email
end

