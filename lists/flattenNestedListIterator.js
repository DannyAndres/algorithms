const nestedList = [[1, 2], 2, [1, 1]];

/*

  You're given a list which each element is either an integer or a list of integers
  Implement an iterator to flatten it

  SOLUTION

  using a stack we put the elements from last to first, so we have at the top of the stack and first
  to come out the first element of the nestedList

  stack => 1,1 | 2 | 1,2

  when we do pop to the stack we get 1,2

  what we are going to do is go through the stack again and if is a list do the same thing, put the elements in the stack in NORMAL
  order this time, but in a temporary stack that will be the memory of the original stack, it will be backwards and it will work
  to store the integers while we go through the stack

  at the end put the temp stack into the stack

  example:

  iteration 0
  pointer => 1,2
  temp_stack => 1 | 2
  stack => 1,1 | 2

  iteration 1
  pointer => 2
  temp_stack => 1 | 2 | 2
  stack => 1,1

  iteration 2
  pointer => 1,1
  temp_stack => 1 | 2 | 2 | 1 | 1
  stack =>

  Now put the stack back together
  O(N)
  temp_stack =>
  stack => 1 | 1 | 2 | 2 | 1

  now the list we get from the stack looks like this
  newNestedList = 1,2,2,1,1

  What if the list inside can other X lists inside too
  we do this with a tracker that says "is there any lists left?"
  that way we know if in the last pass if left a list to undo we just do this all over again

  If they ask about a next one you can just pop out the results and if stack is not empty
  there is a next one

*/

class NestedIterator {
  constructor(nestedList) {
    let stack = [];
    nestedList.forEach((e) => {
      stack.unshift(e); // putting the elements from the back
    });
    // filling temp stack
    let temp_stack = [];
    while (stack.length !== 0) {
      let pointer = stack.pop();
      if (Array.isArray(pointer)) {
        pointer.forEach((e) => {
          temp_stack.push(e);
        });
      } else {
        temp_stack.push(pointer);
      }
    }
    // returning temp stack to regular stack
    while (temp_stack.length !== 0) {
      stack.push(temp_stack.pop());
    }
    // we assign value to stack
    this.value = stack;
  }

  toList() {
    return this.value.reverse();
  }
}

// Iterator with unkown depth
class NestedIteratorDeep {
  constructor(nestedList) {
    let hasListsLeft = false;
    let stack = [];
    nestedList.forEach((e) => {
      stack.unshift(e); // putting the elements from the back
      // if we found a lists we need to start the iterator
      if (Array.isArray(e)) {
        hasListsLeft = true;
      }
    });

    while (hasListsLeft) {
      // we asume that in this iteration we get rid of all lists
      hasListsLeft = false;
      // filling temp stack
      let temp_stack = [];
      while (stack.length !== 0) {
        let pointer = stack.pop();
        if (Array.isArray(pointer)) {
          pointer.forEach((e) => {
            temp_stack.push(e);
            // if we find a new deep list we save that we need another iteration
            if (Array.isArray(e)) {
              hasListsLeft = true;
            }
          });
        } else {
          temp_stack.push(pointer);
        }
      }
      // returning temp stack to regular stack
      while (temp_stack.length !== 0) {
        stack.push(temp_stack.pop());
      }
    }
    // we assign value to stack
    this.value = stack;
  }

  toList() {
    return this.value.reverse();
  }
}

class NestedIteratorDeepNoStack {
  constructor(nestedList) {
    /*

      checking elements again and again can be taxing
      on time complexity when moving elements from one stack to another

      this option implements a deep recursive while to check every single element deeply
      and then reverse that to create the stack

    */

    const listFlattener = (list) => {
      let temp_list = [];
      list.forEach((e) => {
        if (Array.isArray(e)) {
          temp_list = [...temp_list, ...listFlattener(e)];
        } else {
          temp_list.push(e);
        }
      });
      return temp_list;
    };

    this.value = listFlattener(nestedList).reverse();
  }

  toList() {
    return this.value.reverse();
  }
}

console.log(
  '-------------------------------------------------------------------'
);
console.log('list to nest: ', nestedList);
const nestedIterator = new NestedIterator(nestedList);

console.log(nestedIterator.toList());

console.log(
  '-------------------------------------------------------------------'
);
const newNestedList = [[1, [1, 2, 3]], 2, [[4, 5], 1]];
console.log('list to nest: ', newNestedList);
const nestedIteratorDeep = new NestedIteratorDeep(newNestedList);

console.log(nestedIteratorDeep.toList());

console.log(
  '-------------------------------------------------------------------'
);
const recursiveNestedList = [[1, [1, 2, 3]], 2, [[4, 5], 1]];
console.log('list to nest: ', recursiveNestedList);
const nestedIteratorDeepNoStack = new NestedIteratorDeepNoStack(
  recursiveNestedList
);

console.log(nestedIteratorDeepNoStack.toList());
