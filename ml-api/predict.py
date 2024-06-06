import sys
import json
import joblib
import numpy as np

# Load mô hình đã lưu
model = joblib.load('regression_model.pkl')

# Nhận dữ liệu từ node.js
input_data = json.loads(sys.argv[1])
input_data = np.array(input_data).reshape(-1, 1)

# Thực hiện dự đoán
predictions = model.predict(input_data)

# In kết quả dưới dạng JSON
print(json.dumps(predictions.tolist()))
