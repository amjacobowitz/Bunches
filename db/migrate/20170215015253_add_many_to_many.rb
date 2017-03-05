class AddManyToMany < ActiveRecord::Migration[5.0]
  def change
    create_table :days_lessons, id: false do |t|
      t.belongs_to :day, index: true, type: :uuid
      t.belongs_to :lesson, index: true, type: :uuid
    end
  end
end
