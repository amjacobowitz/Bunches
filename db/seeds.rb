teacher = Fabricate(:teacher)

klass = Fabricate(:klass, pin: '1234')
teacher.klasses << klass

4.times do
  group = Fabricate(:group)
  klass.groups << group
  goal = Fabricate(:goal)
  5.times do
    student = Fabricate(:student)
    group.students << student
    klass.students << student
    student.goals << goal
  end
end
