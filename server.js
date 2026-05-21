const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Placeholder Talk Data
const talks = [
  {
    id: 1,
    title: "The Future of Generative AI",
    speakers: ["Alice Smith"],
    categories: ["AI", "LLM"],
    duration: "1 hour",
    time: "10:00 AM - 11:00 AM",
    description: "Explore the latest breakthroughs in large language models and how they are transforming the software industry."
  },
  {
    id: 2,
    title: "Scaling Microservices with Kubernetes",
    speakers: ["Bob Jones"],
    categories: ["Cloud", "DevOps", "Kubernetes"],
    duration: "1 hour",
    time: "11:10 AM - 12:10 PM",
    description: "Deep dive into production-grade Kubernetes clusters, auto-scaling strategies, and service mesh patterns."
  },
  {
    id: 3,
    title: "Modern Frontend Architecture",
    speakers: ["Carol White"],
    categories: ["Frontend", "JavaScript", "Performance"],
    duration: "1 hour",
    time: "12:20 PM - 01:20 PM",
    description: "A look at the evolution of frontend frameworks, server-side rendering, and optimizing for the Core Web Vitals."
  },
  {
    id: 4,
    title: "Lunch Break",
    isBreak: true,
    time: "01:20 PM - 02:20 PM",
    description: "Networking and lunch break."
  },
  {
    id: 5,
    title: "Building Secure Cloud-Native Apps",
    speakers: ["Dave Brown", "Eve Green"],
    categories: ["Security", "Cloud"],
    duration: "1 hour",
    time: "02:20 PM - 03:20 PM",
    description: "Learn best practices for securing your cloud infrastructure, managing secrets, and implementing Zero Trust."
  },
  {
    id: 6,
    title: "Data Engineering at Scale",
    speakers: ["Frank Black"],
    categories: ["Data", "Python", "BigData"],
    duration: "1 hour",
    time: "03:30 PM - 04:30 PM",
    description: "Techniques for processing petabytes of data using modern data stacks and efficient pipeline orchestration."
  },
  {
    id: 7,
    title: "The Rise of Edge Computing",
    speakers: ["Grace Lee"],
    categories: ["Edge", "IoT", "Networking"],
    duration: "1 hour",
    time: "04:40 PM - 05:40 PM",
    description: "How moving computation closer to the data source is reducing latency and enabling new real-time applications."
  }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/talks', (req, res) => {
  res.json(talks);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
