class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups, id: :uuid do |t|
      t.string :name
      t.references :grouping, index: true, foreign_key: true, type: :uuid
      t.references :assignment, foreign_key: true, index: true, type: :uuid
      t.references :goal, foreign_key: true, index: true, type: :uuid

      t.timestamps null: false
    end
  end
end
