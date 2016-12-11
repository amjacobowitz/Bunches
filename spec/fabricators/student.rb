Fabricator(:student) do
  group
  name FFaker::Name.first_name.downcase
end
