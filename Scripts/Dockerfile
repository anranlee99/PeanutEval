from python:3.11.1-buster

WORKDIR / 

RUN pip install runpod
RUN pip install e2b_code_interpreter

ADD serverlesse2b.py .

CMD ["python", "-u", "/serverlesse2b.py"]
