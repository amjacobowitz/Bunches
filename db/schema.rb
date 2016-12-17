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

ActiveRecord::Schema.define(version: 20161119174711) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "assignments", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.boolean  "completed",  default: false, null: false
    t.boolean  "submitted",  default: false, null: false
    t.string   "title",                      null: false
    t.string   "directions",                 null: false
    t.uuid     "group_id",                   null: false
    t.uuid     "teacher_id",                 null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["group_id"], name: "index_assignments_on_group_id", using: :btree
    t.index ["teacher_id"], name: "index_assignments_on_teacher_id", using: :btree
  end

  create_table "goal_tags", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",       null: false
    t.uuid     "goal_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["goal_id"], name: "index_goal_tags_on_goal_id", using: :btree
  end

  create_table "goals", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "goals_students", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "goal_id",    null: false
    t.uuid "student_id", null: false
    t.index ["goal_id"], name: "index_goals_students_on_goal_id", using: :btree
    t.index ["student_id"], name: "index_goals_students_on_student_id", using: :btree
  end

  create_table "groups", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups_klasses", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "klass_id", null: false
    t.uuid "group_id", null: false
    t.index ["group_id"], name: "index_groups_klasses_on_group_id", using: :btree
    t.index ["klass_id"], name: "index_groups_klasses_on_klass_id", using: :btree
  end

  create_table "klasses", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "pin",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "klasses_students", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "klass_id",   null: false
    t.uuid "student_id", null: false
    t.index ["klass_id"], name: "index_klasses_students_on_klass_id", using: :btree
    t.index ["student_id"], name: "index_klasses_students_on_student_id", using: :btree
  end

  create_table "klasses_teachers", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "teacher_id", null: false
    t.uuid "klass_id",   null: false
    t.index ["klass_id"], name: "index_klasses_teachers_on_klass_id", using: :btree
    t.index ["teacher_id"], name: "index_klasses_teachers_on_teacher_id", using: :btree
  end

  create_table "students", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name"
    t.uuid     "group_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_students_on_group_id", using: :btree
  end

  create_table "teachers", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "password",   null: false
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "assignments", "teachers"
  add_foreign_key "goal_tags", "goals"
  add_foreign_key "goals_students", "goals"
  add_foreign_key "goals_students", "students"
  add_foreign_key "groups_klasses", "groups"
  add_foreign_key "groups_klasses", "klasses"
  add_foreign_key "klasses_students", "klasses"
  add_foreign_key "klasses_students", "students"
  add_foreign_key "klasses_teachers", "klasses"
  add_foreign_key "klasses_teachers", "teachers"
  add_foreign_key "students", "groups"
end
