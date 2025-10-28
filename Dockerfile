FROM python:3.10

WORKDIR /app

# Copy only requirements.txt first
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the rest of the app
COPY . .

CMD ["python", "serve_model.py"]
