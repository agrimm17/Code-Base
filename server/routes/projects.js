const express = require('express');
const router = express.Router();

const PLACEHOLDER_IMAGE = 'https://placehold.co/400x240?text=Project';

const projects = [
  {
    id: '1',
    name: 'PodMD',
    description: 'Kuberbetes management app that facilitates the automated reset of impacted pods',
    technologies: ['React', 'CSS', 'Node.js', 'Express', 'JavaScript', 'Kubernetes', 'Prometheus', 'Docker', 'Helm', 'Kubectl', 'PromQL', 'MiniKube', 'Chart.js', 'Electron', 'MUI', 'Jest', ],
    thumbnailUrl: '/thumbnails/PodMD.png',
    link: 'https://github.com/agrimm17/PodMD',
  },
  {
    id: '2',
    name: 'Mise-En-Plaice',
    description: 'AI powered recipe consolidation tool for multi-dish meals.',
    technologies: ['React', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MUI', 'OpenAI'],
    thumbnailUrl: '/thumbnails/Mise-En-Plaice.png',
    link: 'https://github.com/agrimm17/Mise-En-Plaice',
  },
  {
    id: '3',
    name: 'Placeholder Project Three',
    description: 'A short description of the third placeholder project. Replace with your real project details.',
    technologies: ['JavaScript', 'React', 'Node.js'],
    thumbnailUrl: PLACEHOLDER_IMAGE,
    link: '#',
  },
  {
    id: '4',
    name: 'API Dashboard',
    description: 'Dashboard for monitoring API health and usage. Placeholder for your real project.',
    technologies: ['React', 'TypeScript', 'Express', 'PostgreSQL'],
    thumbnailUrl: PLACEHOLDER_IMAGE,
    link: '#',
  },
  {
    id: '5',
    name: 'Task Manager App',
    description: 'Simple task manager with filters and due dates. Placeholder description.',
    technologies: ['Vue', 'JavaScript', 'Node.js', 'MongoDB'],
    thumbnailUrl: PLACEHOLDER_IMAGE,
    link: '#',
  },
  {
    id: '6',
    name: 'Data Pipeline Tool',
    description: 'ETL pipeline for batch processing. Replace with your real project details.',
    technologies: ['Python', 'Node.js', 'PostgreSQL', 'Docker'],
    thumbnailUrl: PLACEHOLDER_IMAGE,
    link: '#',
  },
];

router.get('/', (req, res) => {
  res.json(projects);
});

module.exports = router;
