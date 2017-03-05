class Assignment < ApplicationRecord
  has_many :submissions, dependent: :destroy
  has_many :groups
  belongs_to :teacher
  belongs_to :lesson
end
