Fabricator(:teacher) do
  name FFaker::Name.name
  password 'password'
  email FFaker::Internet.email
end

