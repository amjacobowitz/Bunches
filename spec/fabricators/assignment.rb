Fabricator(:assignment) do
  teacher

  title { FFaker::CheesyLingo.title }
  directions { FFaker::CheesyLingo.sentence }
end
