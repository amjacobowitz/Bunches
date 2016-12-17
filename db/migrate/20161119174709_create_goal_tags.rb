class CreateGoalTags < ActiveRecord::Migration[5.0]
  def change
    create_table :goal_tags, id: :uuid do |t|
      t.string :name, null: false
      t.references :goal, index: true, foreign_key: true, null: false, type: :uuid

      t.timestamps null: false
    end
  end
end
