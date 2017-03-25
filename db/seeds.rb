teacher = Fabricate(:teacher)

klass = Fabricate(:klass, pin: '1234', teacher: teacher)
teacher.klasses << klass
assignment = Fabricate(:assignment, teacher: teacher)
lesson = Fabricate(:lesson, teacher: teacher)
day = Fabricate(:day, date: Date.new(2017, 2, 8))
lesson.assignments << assignment
teacher.lessons << lesson
teacher.days << day
day.lessons << lesson

4.times do
  grouping = Fabricate(:grouping)
  klass.groupings << grouping
  lesson.groupings << grouping

  4.times do
    goal = Fabricate(:goal)
    teacher.goals << goal

    group = Fabricate(:group)
    grouping.groups << group

    student = Fabricate(:student)
    group.students << student
    klass.students << student
    goal.students << student
    goal.groups << group
  end
end

student = Student.first
group = student.groups.first
group.update(assignment: assignment)
