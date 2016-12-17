class CreateTeachers < ActiveRecord::Migration[5.0]
  def change
    create_table :teachers, id: :uuid do |t|
      t.string :name, null: false
      t.string :password, null: false
      t.string :email

      t.timestamps null: false
    end
  end
end
