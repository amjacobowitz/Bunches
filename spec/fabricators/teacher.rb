Fabricator(:teacher) do
  name FFaker::Name.first_name
  password 'password'
  email FFaker::Internet.email
end

