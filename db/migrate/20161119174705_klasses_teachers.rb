class KlassesTeachers < ActiveRecord::Migration[5.0]
  def change
    create_table :klasses_teachers, id: :uuid do |t|
      t.references :teacher, index: true, foreign_key: true, null: false, type: :uuid
      t.references :klass, index: true, foreign_key: true, null: false, type: :uuid
    end
  end
end
