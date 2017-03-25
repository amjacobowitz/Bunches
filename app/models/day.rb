class Day < ApplicationRecord
  has_and_belongs_to_many :lessons
  has_and_belongs_to_many :assignments
  belongs_to :teacher
end
