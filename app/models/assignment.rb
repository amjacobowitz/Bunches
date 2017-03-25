class Assignment < ApplicationRecord
  has_many :submissions, dependent: :destroy
  has_many :groups
  belongs_to :teacher
  has_and_belongs_to_many :lessons
  has_and_belongs_to_many :days
end
