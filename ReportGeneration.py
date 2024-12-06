import json
import datetime
import os

from jinja2 import Template


class ReportGenerator:
    def __init__(self, report_file=None, logger=None):
        import os
        self.report_file = report_file or os.getenv("REPORT_FILE", "execution_report.json")
        self.logger = logger
        self.report_data = {
            "pipeline_name": None,
            "execution_date": None,
            "nodes": [],
            "overall_status": "Pending",
        }

    def set_pipeline_name(self, pipeline_name):
        self.report_data["pipeline_name"] = pipeline_name
        if self.logger:
            self.logger.log(f"Pipeline name set to: {pipeline_name}")

    def add_node_result(self, node_id, status, details=None):
        node_report = {
            "node_id": node_id,
            "status": status,
            "details": details or "No details provided.",
        }
        self.report_data["nodes"].append(node_report)
        if self.logger:
            self.logger.log(f"Node result added: {node_id} - Status: {status}")

    def finalize_report(self, overall_status):
        self.report_data["execution_date"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.report_data["overall_status"] = overall_status
        self._write_to_file()
        if self.logger:
            self.logger.log(f"Report finalized with status: {overall_status}")

    def _write_to_file(self):
        with open(self.report_file, "w") as file:
            json.dump(self.report_data, file, indent=4)
        if self.logger:
            self.logger.log(f"Report written to file: {self.report_file}")

    def generate_html_report(self, html_file=None):
        html_file = html_file or os.getenv("HTML_REPORT_FILE", "execution_report.html")
        template = Template("""
        <html>
        <head>
            <title>Pipeline Execution Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1, h2 { color: #333; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 10px; border: 1px solid #ccc; padding: 10px; }
            </style>
        </head>
        <body>
            <h1>Pipeline Execution Report</h1>
            <p><strong>Pipeline Name:</strong> {{ pipeline_name }}</p>
            <p><strong>Execution Date:</strong> {{ execution_date }}</p>
            <p><strong>Overall Status:</strong> {{ overall_status }}</p>
            <h2>Node Execution Details:</h2>
            <ul>
            {% for node in nodes %}
                <li>
                    <strong>Node ID:</strong> {{ node.node_id }}<br>
                    <strong>Status:</strong> {{ node.status }}<br>
                    <strong>Details:</strong> {{ node.details }}
                </li>
            {% endfor %}
            </ul>
        </body>
        </html>
        """)
        html_content = template.render(
            pipeline_name=self.report_data["pipeline_name"],
            execution_date=self.report_data["execution_date"],
            overall_status=self.report_data["overall_status"],
            nodes=self.report_data["nodes"]
        )
        with open(html_file, "w") as file:
            file.write(html_content)
        if self.logger:
            self.logger.log(f"HTML report generated at: {html_file}")

    def get_report_data(self):
        return self.report_data