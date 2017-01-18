# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170102165215) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "assignments", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.boolean  "completed",  default: false, null: false
    t.boolean  "submitted",  default: false, null: false
    t.string   "title",                      null: false
    t.string   "directions",                 null: false
    t.uuid     "student_id"
    t.uuid     "teacher_id"
    t.uuid     "lesson_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["lesson_id"], name: "index_assignments_on_lesson_id", using: :btree
    t.index ["student_id"], name: "index_assignments_on_student_id", using: :btree
    t.index ["teacher_id"], name: "index_assignments_on_teacher_id", using: :btree
  end

  create_table "goal_tags", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "category",   null: false
    t.uuid     "goal_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["goal_id"], name: "index_goal_tags_on_goal_id", using: :btree
  end

  create_table "goals", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "description", null: false
    t.uuid     "student_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["student_id"], name: "index_goals_on_student_id", using: :btree
  end

  create_table "groupings", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "title",      null: false
    t.uuid     "klass_id"
    t.uuid     "lesson_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["klass_id"], name: "index_groupings_on_klass_id", using: :btree
    t.index ["lesson_id"], name: "index_groupings_on_lesson_id", using: :btree
  end

  create_table "groups", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name"
    t.uuid     "grouping_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["grouping_id"], name: "index_groups_on_grouping_id", using: :btree
  end

  create_table "klasses", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "pin",        null: false
    t.string   "subject"
    t.uuid     "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["teacher_id"], name: "index_klasses_on_teacher_id", using: :btree
  end

  create_table "lessons", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "title"
    t.date     "date"
    t.uuid     "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["teacher_id"], name: "index_lessons_on_teacher_id", using: :btree
  end

  create_table "students", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.uuid     "group_id"
    t.uuid     "klass_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_students_on_group_id", using: :btree
    t.index ["klass_id"], name: "index_students_on_klass_id", using: :btree
  end

  create_table "submissions", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "review"
    t.integer  "score"
    t.string   "answer_file_name"
    t.string   "answer_content_type"
    t.integer  "answer_file_size"
    t.datetime "answer_updated_at"
    t.uuid     "assignment_id"
    t.uuid     "student_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.index ["assignment_id"], name: "index_submissions_on_assignment_id", using: :btree
    t.index ["student_id"], name: "index_submissions_on_student_id", using: :btree
  end

  create_table "teachers", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "password",   null: false
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "assignments", "lessons"
  add_foreign_key "assignments", "teachers"
  add_foreign_key "goal_tags", "goals"
  add_foreign_key "goals", "students"
  add_foreign_key "groupings", "klasses"
  add_foreign_key "groupings", "lessons"
  add_foreign_key "groups", "groupings"
  add_foreign_key "klasses", "teachers"
  add_foreign_key "lessons", "teachers"
  add_foreign_key "students", "groups"
  add_foreign_key "students", "klasses"
  add_foreign_key "submissions", "assignments"
  add_foreign_key "submissions", "students"
end
