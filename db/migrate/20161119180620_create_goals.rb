class CreateGoals < ActiveRecord::Migration[5.0]
  def change
    create_table :goals, id: :uuid do |t|
      t.string :description
      t.uuid :goal_type_id, index: true

      t.timestamps null: false
    end
  end
end
