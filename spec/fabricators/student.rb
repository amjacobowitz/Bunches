Fabricator(:student) do
  first_name FFaker::Name.first_name.downcase
  last_name FFaker::Name.last_name.downcase
end
