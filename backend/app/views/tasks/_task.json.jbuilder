json.extract! task, :id, :title, :body, :completed, :created_at, :updated_at
json.url task_url(task, format: :json)
