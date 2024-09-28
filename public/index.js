let keyDown = {
  i: false,
  o: false,
  I: false,
  O: false,
  ":": false,
  Escape: false,
  Control: false,
  "[": false,
};

const inputFields = {
  first: "first",
  second: "second",
  third: "third",
  command: "command",
};

function getGetNextInput() {
  let current = inputFields.third;
  return function getNextInput() {
    console.log(current);
    if (current === inputFields.first) {
      current = inputFields.second;
      return current;
    } else if (current === inputFields.second) {
      current = inputFields.third;
      return current;
    } else if (current === inputFields.third) {
      current = inputFields.first;
      return current;
    }
    return null;
  };
}

let inputs = document.getElementsByTagName("input");

function isActive() {
  for (index = 0; index < inputs.length; ++index) {
    let input = inputs[index];
    if (input === document.activeElement) {
      return true;
    }
  }
  return false;
}

function fullFocus(elem, clear) {
  elem.scrollIntoView();
  clear ? (elem.value = "") : elem.value;
  elem.focus();
  // elem.select();
}

function handleInput(key, clear) {
  console.log(keyDown[key]);
  console.log(!isActive());
  const field = getNextInput();
  console.log(field);
  const input = document.getElementById(field);
  console.log(input);
  fullFocus(input, clear);
  keyDown[key] = false;
}

let getNextInput = getGetNextInput();

document.addEventListener("keyup", handleKeyup);

function handleKeyup(e) {
  // unset modifiers here because they have to be unset automagically in the case of not used
  if (e.key === "Control") {
    keyDown["Control"] = false;
  }
}

document.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
  // console.log(e.key);
  if (
    !Object.keys(keyDown).includes(e.key) ||
    (isActive() && e.key !== "Escape" && e.key !== "[" && e.key !== "Control")
  ) {
    return;
  }

  if (e.key === "[" && !keyDown["Control"]) {
    return;
  }
  e.preventDefault();

  keyDown[e.key] = true;
  if (
    (keyDown["Escape"] || (keyDown["Control"] && keyDown["["])) &&
    isActive()
  ) {
    document.activeElement.blur();
    keyDown["Escape"] = false;
    keyDown["Control"] = false;
    keyDown["["] = false;
    return;
  }
  if (keyDown["i"] && !isActive()) {
    handleInput(e.key, false);
  }
  if (keyDown["o"] && !isActive()) {
    handleInput(e.key, false);
  }
  if (keyDown["I"] && !isActive()) {
    handleInput(e.key, true);
  }
  if (keyDown["O"] && !isActive()) {
    handleInput(e.key, true);
  }
  if (keyDown[":"] && !isActive()) {
    console.log(keyDown[":"]);
    console.log(!isActive());
    const field = inputFields.command;
    console.log(field);
    const input = document.getElementById(field);
    console.log(input);
    fullFocus(input);
    keyDown[":"] = false;
  }
}
