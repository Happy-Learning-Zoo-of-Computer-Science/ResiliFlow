from ExecutionController import PipelineExecutionModule
from NodeController import NodeController
from ReportGeneration import ReportGenerator
from logger import Logger
from flask import Flask, jsonify, request


class PipelineExecutionModuleMain:
    """
    主模块：用于初始化和整合管道执行项目中的所有模块。
    """

    def __init__(self):
        # 初始化日志模块
        self.logger = Logger(module_name="PipelineExecutionModuleMain")

        # 初始化报告生成模块
        self.report_generator = ReportGenerator(logger=self.logger)

        # 初始化节点控制模块
        self.node_controller = NodeController(logger=self.logger)

        # 初始化管道执行模块
        self.pipeline_execution = PipelineExecutionModule(
            pipeline_data={}, logger=self.logger
        )

        self.logger.log("PipelineExecutionModuleMain 初始化成功。")

    def execute_pipeline(self, pipeline_data):
        """
        使用 PipelineExecutionModule 执行整个管道。
        """
        try:
            self.pipeline_execution.pipeline_data = pipeline_data
            self.pipeline_execution.run_pipeline()

            # 更新报告
            for node_id, result in self.pipeline_execution.execution_context.items():
                self.report_generator.add_node_result(
                    node_id, "成功", details=result
                )

            self.report_generator.finalize_report("成功")
            self.logger.log("管道执行成功完成。")
            return {"status": "success", "execution_context": self.pipeline_execution.execution_context}
        except Exception as e:
            self.logger.log(f"管道执行错误: {str(e)}", level="error")
            self.report_generator.finalize_report("失败")
            raise

    def execute_node(self, node):
        """
        使用 NodeController 执行单个节点。
        """
        try:
            result = self.node_controller.execute(node)
            self.report_generator.add_node_result(
                node["id"], "成功", details=result
            )
            self.logger.log(f"节点 {node['id']} 执行成功。")
            return {"status": "success", "result": result}
        except Exception as e:
            self.logger.log(f"节点 {node['id']} 执行错误: {str(e)}", level="error")
            raise


# 使用 Flask 暴露 API
app = Flask(__name__)

# 初始化主模块
main_module = PipelineExecutionModuleMain()


@app.route("/run_pipeline", methods=["POST"])
def run_pipeline():
    """
    API 端点：运行整个管道。
    """
    try:
        pipeline_data = request.json.get("pipeline_data")
        if not pipeline_data:
            return jsonify({"error": "需要 pipeline_data"}), 400

        result = main_module.execute_pipeline(pipeline_data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/execute_node", methods=["POST"])
def execute_node():
    """
    API 端点：运行单个节点。
    """
    try:
        node = request.json.get("node")
        if not node:
            return jsonify({"error": "需要节点数据"}), 400

        result = main_module.execute_node(node)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/get_report", methods=["GET"])
def get_report():
    """
    API 端点：获取管道执行报告。
    """
    try:
        report_data = main_module.report_generator.get_report_data()
        return jsonify(report_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)