import { defineCommand } from "@z0fa/roboticus";

export default defineCommand({
  name: "hello",
  description: "hello",
  handler(req, res) {
    return res.message("hello world!!!")
  },
});
