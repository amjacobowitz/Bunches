teacher = Fabricate(:teacher)

klass = Fabricate(:klass, pin: '1234', teacher: teacher)
teacher.klasses << klass
assignment = Fabricate(:assignment, teacher: teacher)
lesson = Fabricate(:lesson, teacher: teacher)
lesson.assignments << assignment
teacher.lessons << lesson

4.times do
  goal = Fabricate(:goal)
  grouping = Fabricate(:grouping)
  klass.groupings << grouping
  lesson.grouping = grouping
  4.times do
    group = Fabricate(:group)
    student = Fabricate(:student)
    grouping.groups << group
    group.students << student
    klass.students << student
    student.goals << goal
    student.assignments << assignment
  end
end
