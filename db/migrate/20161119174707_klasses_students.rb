class KlassesStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :klasses_students, id: :uuid do |t|
      t.references :klass, index: true, foreign_key: true, null: false, type: :uuid
      t.references :student, index: true, foreign_key: true, null: false, type: :uuid
    end
  end
end
