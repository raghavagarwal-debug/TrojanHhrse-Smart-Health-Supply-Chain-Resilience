FROM python:3.12-slim

WORKDIR /app

# Install dependencies for XGBoost and Scikit-learn
RUN apt-get update && apt-get install -y \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port
EXPOSE 8000

# Run Flask on port 8000
CMD ["flask", "--app", "main", "run", "--host=0.0.0.0", "--port=8000"]
