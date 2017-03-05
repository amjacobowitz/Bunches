class CreateGoals < ActiveRecord::Migration[5.0]
  def change
    create_table :goals, id: :uuid do |t|
      t.string :description, null: false
      t.references :teacher, foreign_key: true, index: true, type: :uuid

      t.timestamps null: false
    end
  end
end
