// lexer
tokenize = (thread) => {
  const tokens = thread
    .split(/\s+/)
    .filter((token) => token.length > 0)
    .map((token) => {
      return isNaN(token)
        ? { type: "word", value: token }
        : { type: "number", value: token };
    });
  return tokens;
};

// parser
parse = (tokens) => {
  const AST = [];

  while (tokens.length > 0) {
    let current_op = tokens.shift();

    if (current_op.type === "word") {
      current_val = tokens.shift();

      if (current_val.type === "number") {
      } else {
        throw Error("argument have to be number");
      }
    } else {
      throw Error("Code have to start with operation");
    }
    AST.push({ operation: current_op.value, value: current_val.value });
  }
  return AST;
};

// generator

const thread = "red 8 green 7 blue 3";
const stream_of_tokens = tokenize(thread);
const parse_tree = parse(stream_of_tokens);

console.log(thread);
console.log(tokenize(thread));
console.log(parse_tree);
