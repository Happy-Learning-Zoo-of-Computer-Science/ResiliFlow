class NodeController:
    """
    Controller for handling node-specific execution logic.
    """

    def __init__(self, logger):
        """
        Initialize the Node Controller with a logger.
        :param logger: Logging utility for recording node-specific execution progress.
        """
        self.logger = logger

    def execute(self, node):
        """
        Execute the logic of a single node.
        :param node: The node object containing execution details.
        """
        self.logger.log(f"Executing node: {node['id']}", level="info", node_id=node['id'])
        node_type = node.get("type")
        try:
            if node_type == "DataProcessor":
                result = self.process_data(node)
            elif node_type == "ModelTrainer":
                result = self.train_model(node)
            else:
                raise ValueError(f"Unknown node type: {node_type}")

            self.save_result(node, result)
        except Exception as e:
            self.logger.log(f"Error executing node {node['id']}: {str(e)}", level="error", node_id=node['id'])
            raise

    def process_data(self, node):
        """Simulate processing data in a node."""
        self.logger.log(f"Processing data for node {node['id']}", level="info", node_id=node['id'])
        # Simulate data processing logic here
        return {"status": "processed", "node_id": node["id"]}

    def train_model(self, node):
        """Simulate training a model in a node."""
        self.logger.log(f"Training model for node {node['id']}", level="info", node_id=node['id'])
        # Simulate model training logic here
        return {"status": "trained", "node_id": node["id"]}

    def save_result(self, node, result):
        """Save the execution result of a node."""
        self.logger.log(f"Saving result for node {node['id']}: {result}", level="info", node_id=node['id'])
        # Simulate saving logic, e.g., to a database or in-memory storage