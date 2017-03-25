class AddManyToMany < ActiveRecord::Migration[5.0]
  def change
    create_table :days_lessons, id: false do |t|
      t.belongs_to :day, index: true, type: :uuid
      t.belongs_to :lesson, index: true, type: :uuid
    end

    create_table :groups_students, id: false do |t|
      t.belongs_to :group, index: true, type: :uuid
      t.belongs_to :student, index: true, type: :uuid
    end

    create_table :assignments_lessons, id: false do |t|
      t.belongs_to :assignment, index: true, type: :uuid
      t.belongs_to :lesson, index: true, type: :uuid
    end

    create_table :groupings_lessons, id: false do |t|
      t.belongs_to :grouping, index: true, type: :uuid
      t.belongs_to :lesson, index: true, type: :uuid
    end

    create_table :assignments_days, id: false do |t|
      t.belongs_to :assignment, index: true, type: :uuid
      t.belongs_to :day, index: true, type: :uuid
    end
  end
end
