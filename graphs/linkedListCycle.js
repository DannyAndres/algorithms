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

*/

const hasCycle = (start) => {
  let fast = start;
  let slow = start;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast === slow) {
      return true;
    }
  }

  return false;
};

// Test the hasCycle function
const hasCycleResult = hasCycle(startNode);
console.log(`Does the linked list have a cycle? ${hasCycleResult}`);
