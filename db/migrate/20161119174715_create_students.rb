class CreateStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :students, id: :uuid do |t|
      t.string :name
      t.uuid :group_id, index: true

      t.timestamps null: false
    end
  end
end
