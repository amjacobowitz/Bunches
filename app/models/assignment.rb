class Assignment < ApplicationRecord
  has_many :submissions
  belongs_to :student
  belongs_to :teacher
  belongs_to :lesson
end
