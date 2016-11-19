class CreateGoalTags < ActiveRecord::Migration[5.0]
  def change
    create_table :goal_tags, id: :uuid do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
