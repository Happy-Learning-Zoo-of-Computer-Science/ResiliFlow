import logging
from datetime import datetime


class Logger:



    def __init__(self, module_name: str, log_file: str = "pipeline.log", remote_logging: bool = False):

        self.module_name = module_name
        self.remote_logging = remote_logging
        self.logger = logging.getLogger(module_name)
        self.logger.setLevel(logging.DEBUG)

        # Create a file handler
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(logging.DEBUG)

        # Create a console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)

        # Define log format
        formatter = logging.Formatter(
            "%(asctime)s - [%(name)s] - %(levelname)s - %(message)s"
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)

        # Add handlers to the logger
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)

    def log(self, message: str, level: str = "info", **context):

        log_entry = f"{message} | Context: {context}"
        if level.lower() == "debug":
            self.logger.debug(log_entry)
        elif level.lower() == "warning":
            self.logger.warning(log_entry)
        elif level.lower() == "error":
            self.logger.error(log_entry)
        elif level.lower() == "critical":
            self.logger.critical(log_entry)
        else:
            self.logger.info(log_entry)

        # Optionally send logs to a remote service
        if self.remote_logging:
            self.send_to_remote_service(log_entry, level)

    def send_to_remote_service(self, log_data, level):

        # Placeholder for remote logging logic
        print(f"Sending to remote service: {log_data} | Level: {level}")