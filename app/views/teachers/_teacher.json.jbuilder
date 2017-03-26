json.extract! teacher, :id, :name

json.goals teacher.goals do |goal|
  json.id goal.id
  json.description goal.description
  json.students goal.students
  json.groups goal.groups
end

json.assignments teacher.assignments do |assignment|
  json.id assignment.id
  json.lessons assignment.lessons
  json.directions assignment.directions
  json.title assignment.title
  json.groups assignment.groups
  json.days assignment.days

  json.submissions assignment.submissions do |submission|
    json.id submission.id
    json.submitted submission.submitted
    json.completed  submission.completed
    json.score submission.score
    json.rating submission.rating
    json.answer submission.answer
    json.review submission.review
    json.assignment_id submission.assignment_id
    json.student_id submission.student_id
    json.day_id submission.day_id
  end
end

json.lessons teacher.lessons do |lesson|
  json.id lesson.id
  json.title lesson.title
  json.assignments lesson.assignments
  json.days lesson.days
  json.groupings lesson.groupings
end

json.days teacher.days do |day|
  json.id day.id
  json.date day.date
  json.lessons day.lessons
  json.assignments day.assignments
  json.submissions day.submissions
end

json.klasses teacher.klasses do |klass|
  json.id klass.id
  json.name klass.name
  json.subject klass.subject

  json.groupings klass.groupings do |grouping|
    json.id grouping.id
    json.title grouping.title
    json.lessons grouping.lessons
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
    json.groups student.group_ids
    json.klass_id student.klass_id
    json.goal_id student.goal_id
  end
end
