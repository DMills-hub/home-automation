FROM alpine:latest
RUN apk update
RUN apk add py-pip
RUN apk add --no-cache python3-dev 
# Should try and move away from --break-system-packages flag
RUN pip install --upgrade pip --break-system-packages
WORKDIR /app
COPY . /app
# Should try and move away from --break-system-packages flag
RUN pip --no-cache-dir install -r requirements.txt --break-system-packages
CMD ["python3", "app.py"]