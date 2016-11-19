class KlassesStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :klasses_students, id: :uuid do |t|
      t.uuid :klass_id, index: true
      t.uuid :student_id, index: true
    end
  end
end
