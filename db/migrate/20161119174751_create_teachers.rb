class CreateTeachers < ActiveRecord::Migration[5.0]
  def change
    create_table :teachers, id: :uuid do |t|
      t.string :name
      t.string :password
      t.string :email

      t.timestamps null: false
    end
  end
end
