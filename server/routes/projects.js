const express = require('express');
const router = express.Router();

const PLACEHOLDER_IMAGE = 'https://placehold.co/400x240?text=Project';

const projects = [
  {
    id: '1',
    name: 'PodMD',
    description: 'Kuberbetes management app that facilitates the automated reset of impacted pods',
    technologies: ['JavaScript',
  'React!',
  'Node.js',
  'Express',
  'CSS',
  'Docker',
  'Kubernetes',
  'Prometheus',
  'Helm',
  'Kubectl',
  'MiniKube',
  'Chart.js',
  'MUI',
  'Electron',
  'PromQL',
  'Jest',],
    thumbnailUrl: '/thumbnails/PodMD.png',
    link: 'https://github.com/agrimm17/PodMD',
  },
  {
    id: '2',
    name: 'Mise-En-Plaice',
    description: 'Recipe consolidation tool for multi-dish meals.',
    technologies: ['JavaScript',
  'React',
  'Node.js',
  'Express',
  'CSS',
  'MUI',
  'OpenAI',],
    thumbnailUrl: '/thumbnails/Mise-En-Plaice.png',
    link: 'https://github.com/agrimm17/Mise-En-Plaice',
  },
  {
    id: '3',
    name: 'NPC Generator',
    description: 'Setting specific NPC generation tool.',
    technologies: ['JavaScript',
  'React',
  'Node.js',
  'Express',
  'CSS',
  'MUI',
  'OpenAI',],
    thumbnailUrl: '/thumbnails/NPC_Generator.png',
    link: 'https://github.com/agrimm17/NPC-Generator',
  },
  {
    id: '4',
    name: 'Code-Base',
    description: 'Personal website to showcase projects and information about myself.',
    technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'CSS', 'MUI', 'Nodemailer'],
    thumbnailUrl: '/thumbnails/Code-Base.png',
    link: 'https://github.com/agrimm17/Code-Base',
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
