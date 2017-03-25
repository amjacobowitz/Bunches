class Lesson < ApplicationRecord
  has_and_belongs_to_many :assignments
  belongs_to :teacher
  has_and_belongs_to_many :days
  has_and_belongs_to_many :groupings
end
