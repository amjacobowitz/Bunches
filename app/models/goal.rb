class Goal < ApplicationRecord
  has_many :students
  has_many :groups
  belongs_to :teacher
end
