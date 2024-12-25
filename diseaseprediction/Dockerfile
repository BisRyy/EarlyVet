# Use the official Python image as the base
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Set environment variables
ENV MONGO_URI=mongodb://localhost:27017/earlyvet

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 5003

# Define the command to run the application
CMD ["python", "app.py"]