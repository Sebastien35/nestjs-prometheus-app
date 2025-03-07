const axios = require('axios');
const { faker } = require('@faker-js/faker');

// List of endpoints to target
const endpoints = [
  { method: 'GET', path: '/' },
  { method: 'GET', path: '/users' },
  {
    method: 'POST',
    path: '/users',
    data: () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }),
  },
  {
    method: 'PUT',
    path: '/users/1',
    data: () => ({ name: faker.person.fullName() }),
  },
  { method: 'DELETE', path: '/users/1' },
];

// Function to simulate errors (e.g., 10% chance of error)
const simulateError = () => Math.random() < 0.1; // 10% chance of error

// Function to send a random request
const sendRequest = async () => {
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  const url = `http://localhost:3000${endpoint.path}`;

  // Simulate an error for some requests
  if (simulateError()) {
    const errorStatusCodes = [400, 404, 500]; // Common error status codes
    const randomStatusCode =
      errorStatusCodes[Math.floor(Math.random() * errorStatusCodes.length)];

    console.error(
      `Simulated error: ${endpoint.method} ${url}, status: ${randomStatusCode}`,
    );
    return;
  }

  try {
    const response = await axios({
      method: endpoint.method,
      url,
      data: endpoint.data ? endpoint.data() : undefined,
    });
    console.log(
      `Request sent: ${endpoint.method} ${url}, status: ${response.status}`,
    );
  } catch (error) {
    console.error(`Error: ${endpoint.method} ${url}, ${error.message}`);
  }
};

// Function to generate traffic with random delays
const generateTraffic = () => {
  const minDelay = 200; // 0.5 seconds
  const maxDelay = 799; // 3 seconds

  const sendWithRandomDelay = () => {
    sendRequest();
    setTimeout(
      sendWithRandomDelay,
      Math.random() * (maxDelay - minDelay) + minDelay,
    );
  };

  sendWithRandomDelay();
};

// Start generating traffic
generateTraffic();