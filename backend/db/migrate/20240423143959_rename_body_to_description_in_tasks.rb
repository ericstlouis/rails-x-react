class RenameBodyToDescriptionInTasks < ActiveRecord::Migration[7.1]
  def change
    rename_column :tasks, :body, :description
  end
end
