class CreateGoalTags < ActiveRecord::Migration[5.0]
  def change
    create_table :goal_tags, id: :uuid do |t|
      t.string :category, null: false
      t.belongs_to :goal, index: true, foreign_key: true, type: :uuid

      t.timestamps null: false
    end
  end
end
