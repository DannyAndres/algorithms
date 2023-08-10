// graph
const adjacencyList = new Map();

const addNode = (airport) => {
  // creates 'Node' => []
  adjacencyList.set(airport, []);
};

const addEdge = (origin, destination) => {
  // Adds 'Origin' => [destination]
  adjacencyList.get(origin).push(destination);
  // Adds 'Destination' => [origin]
  adjacencyList.get(destination).push(origin);
};

// Data
// Sample airport data
const airports = ['AirportA', 'AirportB', 'AirportC', 'AirportD', 'AirportE'];

// Sample routes data
const routes = [
  ['AirportA', 'AirportB'],
  ['AirportA', 'AirportC'],
  ['AirportB', 'AirportD'],
  ['AirportC', 'AirportD'],
  ['AirportD', 'AirportE'],
];

// Create Graph
airports.forEach(addNode);
routes.forEach((route) => addEdge(...route));

console.log(adjacencyList);

// Find out if there is a Route between Origin and Destination

// Breath First Search
const bfs = (start, goal) => {
  console.log(`Finding if there is a way to get from ${start} to ${goal}`);
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const airport = queue.shift(); // pops the first element and removes it from queue
    const destinations = adjacencyList.get(airport); // all destination for current Node
    for (const destination of destinations) {
      // Is the current Node the one that I'm looking for?
      if (destination === goal) {
        return true;
      }

      // If I have not visited this Node add it to the queue
      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push(destination);
      }
    }
  }
  return false;
};

const bfsWithPath = (start, goal) => {
  console.log(`Finding if there is a path to get from ${start} to ${goal}`);
  const visited = new Set();
  const queue = [[start]]; // Each element in the queue is a path

  while (queue.length > 0) {
    const path = queue.shift(); // pops the first path from the queue
    const airport = path[path.length - 1]; // get the last airport in the path
    const destinations = adjacencyList.get(airport); // all destinations for the current airport

    for (const destination of destinations) {
      // Is the current airport the goal?
      if (destination === goal) {
        path.push(destination); // add the goal to the path
        return path; // return the path from start to goal
      }

      // If I have not visited this airport, add it to the queue
      if (!visited.has(destination)) {
        visited.add(destination);
        const newPath = [...path, destination]; // create a new path by extending the current path
        queue.push(newPath);
      }
    }
  }

  return null; // No path found
};

// Depth First Search
const dfs = (start, goal, visited = new Set()) => {
  console.log(`Finding if there is a way to get from ${start} to ${goal}`);
  visited.add(start);
  const destinations = adjacencyList.get(start);
  for (const destination of destinations) {
    if (destination === goal) {
      return true;
    }
    if (!visited.has(destination)) {
      return dfs(destination, goal, visited);
    }
  }
  return false;
};

const dfsWithPath = (start, goal, visited = new Set(), path = []) => {
  console.log(`Finding if there is a way to get from ${start} to ${goal}`);
  visited.add(start);
  path.push(start);

  if (start === goal) {
    return path; // Return the path if the goal is reached
  }

  const destinations = adjacencyList.get(start);
  for (const destination of destinations) {
    if (!visited.has(destination)) {
      const newPath = dfsWithPath(destination, goal, visited, [...path]);
      if (newPath) {
        return newPath; // Return the path if it's found
      }
    }
  }

  return null; // Return null if no path is found
};

console.log(
  '-------------------------------------------------------------------'
);

// Testing BFS
console.log(bfs('AirportA', 'AirportD'));
console.log(bfsWithPath('AirportA', 'AirportD'));

console.log(
  '-------------------------------------------------------------------'
);

// Testing DFS
console.log(dfs('AirportA', 'AirportD'));
console.log(dfsWithPath('AirportA', 'AirportD'));

/*

  BIG O

  BFS and DFS

  (V+E) Nodes + Edges, Is O(N) due to only check every Node once and elements in Graph being N

*/
