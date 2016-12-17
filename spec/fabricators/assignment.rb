Fabricator(:assignment) do
  group
  teacher

  completed false
  submitted false
  title { FFaker::CheesyLingo.title }
  directions { FFaker::CheesyLingo.sentence }
end
