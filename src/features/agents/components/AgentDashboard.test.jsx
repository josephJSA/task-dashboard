import React from 'react';
import { render, screen } from '@testing-library/react';
import AgentDashboard from './AgentDashboard';

describe('AgentDashboard', () => {
  const projects = [
    {
      id: 'repo-rocket',
      name: 'Repo Rocket',
      repository: 'josephJSA/repo-rocket',
      branch: 'feature/launch-automation',
      status: 'Running',
      health: 'Healthy',
      progress: 82,
      lastUpdated: '2 minutes ago',
      summary: 'Checking CI, merging fixes, and verifying deployment',
      mode: 'Autopilot'
    },
    {
      id: 'deploy-watch',
      name: 'Deploy Watch',
      repository: 'josephJSA/deploy-watch',
      branch: 'main',
      status: 'Needs attention',
      health: 'Warning',
      progress: 46,
      lastUpdated: '1 hour ago',
      summary: 'Waiting on a stalled deployment check and failed notification',
      mode: 'Monitor'
    }
  ];

  test('renders the agent project dashboard overview and cards', () => {
    render(<AgentDashboard projects={projects} />);

    expect(screen.getByTestId('agent-dashboard')).toBeInTheDocument();
    expect(screen.getByText('Agent Projects')).toBeInTheDocument();
    expect(screen.getByText('Repo Rocket')).toBeInTheDocument();
    expect(screen.getByText('Deploy Watch')).toBeInTheDocument();
    expect(screen.getByText('Monitoring 2 active projects')).toBeInTheDocument();
  });
});
