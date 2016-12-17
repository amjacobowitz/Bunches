class CreateAssignments < ActiveRecord::Migration[5.0]
  def change
    create_table :assignments, id: :uuid do |t|
      t.boolean :completed, default: false, null: false
      t.boolean :submitted, default: false, null: false
      t.string :title, null: false
      t.string :directions, null: false
      t.references :group, index: true, foriegn_key: true, null: false, type: :uuid
      t.references :teacher, index: true, foreign_key: true, null: false, type: :uuid

      t.timestamps null: false
    end
  end
end
