json.extract! teacher, :id, :name

json.goals teacher.goals do |goal|
  json.id goal.id
  json.description goal.description
  json.students goal.students
  json.groups goal.groups
end

json.assignments teacher.assignments do |assignment|
  json.id assignment.id
  json.lesson_id assignment.lesson_id
  json.directions assignment.directions
  json.title assignment.title
  json.groups assignment.groups
end

json.lessons teacher.lessons do |lesson|
  json.id lesson.id
  json.title lesson.title
  json.assignments lesson.assignments
end

json.days teacher.days do |day|
  json.id day.id
  json.date day.date
  json.lessons day.lessons
end

json.klasses teacher.klasses do |klass|
  json.id klass.id
  json.name klass.name
  json.subject klass.subject

  json.groupings klass.groupings do |grouping|
    json.id grouping.id
    json.title grouping.title
    json.lesson_id grouping.lesson_id
    json.klass_id grouping.klass_id

    json.groups grouping.groups do |group|
      json.id group.id
      json.name group.name
      json.grouping_id group.grouping_id
      json.assignment_id group.assignment_id
      json.students group.students
      json.goal_id group.goal_id
    end
  end

  json.students klass.students do |student|
    json.id student.id
    json.first_name student.first_name
    json.last_name student.last_name
    json.group_id student.group_id
    json.klass_id student.klass_id
    json.goal_id student.goal_id
  end
end
