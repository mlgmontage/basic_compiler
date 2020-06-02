/**
 * Basic simple compiler
 * operation value
 * [word] [number] [width] [height]
 * <div class="box [word]" style="width: [width]; height: [height]">[number]</div>
 */

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
  let operation;
  let content;
  let width;
  let height;

  while (tokens.length > 0) {
    operation = tokens.shift();

    if (operation.type === "word") {
      content = tokens.shift();
      if (content.type === "number") {
      } else {
        throw Error("missing content argument");
      }

      width = tokens.shift();
      if (width.type === "number") {
      } else {
        throw Error("missing width argument");
      }

      height = tokens.shift();
      if (height.type === "number") {
      } else {
        throw Error("missing height argument");
      }
    } else {
      Error("Code have to start with operation");
    }

    AST.push({
      operation: operation.value,
      content: content.value,
      width: width.value,
      height: height.value,
    });
  }
  return AST;
};

// generator

generate = (tree) => {
  let code = [];

  while (tree.length > 0) {
    let current = tree.shift();
    code.push(
      `\t<div class="box ${current.operation}" style="width: ${current.width}px; height: ${current.height}px;"> ${current.content}</div>\n`
    );
  }
  return `<div>\n${code.join("")}</div>`;
};

const thread = "red 8 100 100 green 7 100 200 blue 3 50 50";
// const thread = "red 8 100 100";
const stream_of_tokens = tokenize(thread);
const parse_tree = parse(stream_of_tokens);
const code = generate(parse_tree);

// DOM element
const container = document.getElementById("container");
const tokens_elem = document.getElementById("token");
const parsing_tree_elem = document.getElementById("parse_tree");
const code_elem = document.getElementById("code");

tokens_elem.innerHTML = tokenize(thread)
  .map((token) => {
    return `<span class="word">${token.type}: </span> <span>${token.value}</span><br>`;
  })
  .join("");

parsing_tree_elem.innerHTML = parse(tokenize(thread))
  .map((expression) => {
    return `<span class="word">${expression.operation}</span>
    <span class="number">${expression.content}</span>
    <span class="number">${expression.width}</span>
    <span class="number">${expression.height}</span>
    <br>`;
  })
  .join("");

code_elem.innerHTML = `<pre>${code
  .replace(/>/gi, "&gt")
  .replace(/</gi, "&lt")}</pre>`;

container.innerHTML = code;

console.log(thread);
console.log(tokenize(thread));
console.log(parse(tokenize(thread)));
console.log(generate(parse(tokenize(thread))));
