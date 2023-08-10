class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Create a linked list with a cycle
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
const node5 = new ListNode(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node2; // Creating a cycle

const startNode = node1;

/*

  Two pointers

  BIG O is O(N) for two pointers

  Fast pointer will move 2 steps
  Slow will move 1 steps

  If they both are at the same node after they started, there is a cycle

  Now What makes this a bit more difficult than version 1 is that you should return the node
  where the cycle begins


  With the fast and slow pointer approach there is no garantee that the pointer will meet
  at the start position of the cycle

  SOLUTION
  where the fast and slow pointers met use that as a starting point for a pointer that will go backwards
  and start another pointer from the initial of the list, whenever they meet both moving one step at a time
  that's the initial position of the cycle, just track the indexes

*/

const hasCycle = (start) => {
  // edge case
  // No cycle if there are any nodes or one node
  if (!start) return null;
  if (!start.next) return null;

  let fast = start;
  let slow = start;

  let pointer = start;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast === slow) break;
  }

  if (fast !== slow) return null;

  while (pointer !== slow) {
    pointer = pointer.next;
    slow = slow.next;
  }

  return slow;
};

// Test the hasCycle function
const hasCycleResult = hasCycle(startNode);
console.log(
  `Does the linked list have a cycle? Starting Node: ${hasCycleResult.value}`
);
