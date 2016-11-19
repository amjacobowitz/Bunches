class KlassesTeachers < ActiveRecord::Migration[5.0]
  def change
    create_table :klasses_teachers, id: :uuid do |t|
      t.uuid :teacher_id
      t.uuid :klass_id
    end
  end
end
