class Day < ApplicationRecord
  has_and_belongs_to_many :lessons
  has_and_belongs_to_many :assignments
  has_many :submissions
  belongs_to :teacher
end
