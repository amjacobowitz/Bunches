class Lesson < ApplicationRecord
  has_many :assignments
  belongs_to :teacher
  has_one :grouping
end
