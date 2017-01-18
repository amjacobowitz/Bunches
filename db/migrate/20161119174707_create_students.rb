class CreateStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :students, id: :uuid do |t|
      t.string :first_name
      t.string :last_name
      t.references :group, index: true, foreign_key: true, type: :uuid
      t.references :klass, index: true, foreign_key: true, type: :uuid

      t.timestamps null: false
    end
  end
end
