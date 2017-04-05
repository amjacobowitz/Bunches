module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = Teacher.first
    end

    def current_user=(arg)
      true
    end
  end
end
