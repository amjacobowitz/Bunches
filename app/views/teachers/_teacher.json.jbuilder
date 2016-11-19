json.extract! teacher, :id, :name, :password, :email, :created_at, :updated_at
json.url teacher_url(teacher, format: :json)