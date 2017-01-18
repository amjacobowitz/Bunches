class Klass < ApplicationRecord
  has_many :groupings
  has_many :students
  belongs_to :teacher
end
