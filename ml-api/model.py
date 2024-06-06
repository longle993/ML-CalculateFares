import numpy as np
from sklearn.linear_model import LinearRegression
import joblib

# 1. Chuẩn bị dữ liệu mẫu
# Tạo dữ liệu mẫu
X_train = np.random.rand(100, 1).astype(np.float32)
Y_train = 2 * X_train + 1 + np.random.normal(0, 0.1, (100, 1))

# 2. Xây dựng mô hình hồi quy
# Tạo mô hình hồi quy tuyến tính
model = LinearRegression()

# Huấn luyện mô hình
model.fit(X_train, Y_train)

# 3. Đóng gói mô hình để sử dụng dự đoán
# Lưu mô hình
joblib.dump(model, 'regression_model.pkl')

# Dự đoán với mô hình đã được huấn luyện
def predict(input_data):
    # Load mô hình
    model = joblib.load('regression_model.pkl')
    # Dự đoán
    predictions = model.predict(input_data)
    return predictions

# Ví dụ sử dụng hàm dự đoán
X_test = np.array([[0.5], [1.5], [2.5]])
predictions = predict(X_test)
print(predictions)
