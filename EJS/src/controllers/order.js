const knex = require("../../config/db");

class OrderController {
  // Read all orders for a specific user
  async allOrders(req, res) {
    try {
      const username = req.params.username;
      const orders = await knex("orders")
        .select('orders.*', 'meals.name', 'meals.price')
        .leftJoin('meals', 'meals.id', 'orders.meal_id')
        .where('orders.username', username);

      if (orders.length === 0) {
        return res.status(409).json({ message: "No orders found" });
      }

      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Read one order by ID
  async getOrderById(req, res) {
    try {
      const { username, orderId } = req.body;
      const order = await knex("orders")
      // const order = await knex("orders")
      .leftJoin("meals", "meals.id", "orders.meal_id")
      .where("username", username)
      .where("id", orderId)
      .first();

      if (!order) {
        return res.status(409).json({ message: "Order not found" });
      }

      return res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Delete one order by ID
  async deleteOrderById(req, res) {
    try {
      const id = req.params.id;
      const deletedRows = await knex("orders").where("id", id).del();

      if (deletedRows === 0) {
        return res.status(409).json({ message: "Order not found" });
      }

      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Delete all orders
  async deleteAllOrders(req, res) {
    try {
      const deletedRows = await knex("orders").del();

      if (deletedRows === 0) {
        return res.status(409).json({ message: "No orders found" });
      }

      return res.status(200).json({ message: "All orders deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Create a new order
  async Order(req, res) {
    try {
      const { meal_id, username } = req.body;

      // Check if the order already exists
      const existingOrder = await knex("orders")
        .where({ meal_id, username })
        .first();

      if (existingOrder) {
        return res.status(409).json({ message: "Order already exists" });
      }

      // If the order doesn't exist, insert it
      const [newOrderId] = await knex("orders").insert({ meal_id, username });

      if (!newOrderId) {
        return res.status(409).json({ message: "Order not created" });
      }

      return res.status(200).json({ message: "Order created successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Update an existing order (you need to specify 'id' and the updates in the request)
  async updateOrder(req, res) {
    try {
      const id = req.body.id; // Make sure 'id' and updates are provided in the request
      // Implement the update logic using knex here

      return res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Test endpoint
  test(req, res) {
    res.json({ message: "This is a test endpoint" });
  }
}

module.exports = new OrderController();