Fabricator(:assignment) do
  student
  teacher

  completed false
  submitted false
  title { FFaker::CheesyLingo.title }
  directions { FFaker::CheesyLingo.sentence }
end
