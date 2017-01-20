json.extract! teacher, :id, :name, :assignments, :lessons

json.klasses teacher.klasses do |klass|
  json.id klass.id
  json.name klass.name
  json.subject klass.subject
  json.teacher_id klass.teacher_id

  json.groupings klass.groupings do |grouping|
    json.id grouping.id
    json.title grouping.title
    json.lesson_id grouping.lesson_id
    json.klass_id grouping.klass_id

    json.groups grouping.groups do |group|
      json.id group.id
      json.name group.name
      json.grouping_id group.grouping_id
    end
  end

  json.students klass.students do |student|
    json.id student.id
    json.first_name student.first_name
    json.last_name student.last_name
    json.group_id student.group_id
    json.klass_id student.klass_id

    json.goals student.goals do |goal|
      json.id goal.id
      json.description goal.description
      json.student_id goal.student_id
    end
  end
end
