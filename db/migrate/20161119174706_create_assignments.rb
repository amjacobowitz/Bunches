class CreateAssignments < ActiveRecord::Migration[5.0]
  def change
    create_table :assignments, id: :uuid do |t|
      t.string :title, null: false
      t.string :directions, null: false
      t.references :teacher, index: true, foreign_key: true, type: :uuid

      t.timestamps null: false
    end
  end
end
