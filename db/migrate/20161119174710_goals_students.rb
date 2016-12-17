class GoalsStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :goals_students, id: :uuid do |t|
      t.references :goal, foreign_key: true, index: true, null: false, type: :uuid
      t.references :student, foreign_key: true, index: true, null: false, type: :uuid
    end
  end
end
