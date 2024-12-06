from flask import Flask, request, jsonify
from PipelineMain import PipelineExecutionModuleMain
import logging

# 初始化 Flask 应用
app = Flask(__name__)

# 初始化日志模块
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 创建 PipelineExecutionModuleMain 的实例
pipeline_execution_main = PipelineExecutionModuleMain()


@app.route("/run_pipeline", methods=["POST"])
def run_pipeline():
    """
    REST API 接口：接收管道数据并运行整个管道
    """
    try:
        # 从请求中提取 JSON 数据
        pipeline_data = request.json.get("pipeline_data")
        if not pipeline_data:
            return jsonify({"error": "pipeline_data is required"}), 400

        # 调用主模块运行管道
        result = pipeline_execution_main.execute_pipeline(pipeline_data)
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Error running pipeline: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/execute_node", methods=["POST"])
def execute_node():
    """
    REST API 接口：运行单个节点
    """
    try:
        # 从请求中提取 JSON 数据
        node = request.json.get("node")
        if not node:
            return jsonify({"error": "node is required"}), 400

        # 调用主模块运行节点
        result = pipeline_execution_main.execute_node(node)
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Error executing node: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/get_report", methods=["GET"])
def get_report():
    """
    REST API 接口：获取管道执行报告
    """
    try:
        report_data = pipeline_execution_main.report_generator.get_report_data()
        return jsonify(report_data), 200
    except Exception as e:
        logger.error(f"Error getting report: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/status", methods=["GET"])
def get_status():
    """
    检查模块是否运行正常
    """
    return jsonify({"status": "PipelineExecutionModuleMain is running"}), 200


# 启动 Flask 服务
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)


class PipelineExecutionModule:
    """

    """
    pass