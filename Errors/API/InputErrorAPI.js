class InputErrorAPI extends Error {
  constructor(message = "Either user_id or username must be provided.") {
    super(message);
    this.name = "InputError";
    this.status = 400;
  }
}

module.exports = InputErrorAPI;
