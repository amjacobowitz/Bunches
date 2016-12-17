class CreateStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :students, id: :uuid do |t|
      t.string :name
      t.references :group, index: true, foreign_key: true, null: false, type: :uuid

      t.timestamps null: false
    end
  end
end
