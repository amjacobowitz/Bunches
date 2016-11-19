class GoalsStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :goals_students, id: :uuid do |t|
      t.uuid :goal_id
      t.uuid :student_id
    end
  end
end
