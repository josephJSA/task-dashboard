import React from 'react';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FolderIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const defaultProjects = [
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
    id: 'task-dashboard',
    name: 'Task Dashboard',
    repository: 'josephJSA/task-dashboard',
    branch: 'feature/dashboard-sweep',
    status: 'Review',
    health: 'Stable',
    progress: 61,
    lastUpdated: '9 minutes ago',
    summary: 'Reviewing backlog items and polishing the active dashboard',
    mode: 'Plan'
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

const statusStyles = {
  Running: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  Review: 'bg-sky-100 text-sky-700 ring-sky-200',
  'Needs attention': 'bg-amber-100 text-amber-700 ring-amber-200'
};

const healthStyles = {
  Healthy: 'text-emerald-600',
  Stable: 'text-sky-600',
  Warning: 'text-amber-600'
};

function AgentDashboard({ projects = defaultProjects }) {
  const totalProjects = projects.length;
  const runningProjects = projects.filter((project) => project.status === 'Running').length;
  const healthyProjects = projects.filter((project) => project.health === 'Healthy' || project.health === 'Stable').length;
  const attentionProjects = projects.filter((project) => project.status === 'Needs attention').length;

  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-soft" data-testid="agent-dashboard">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">Operations</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-800">Agent Projects</h2>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700">
          <PlayIcon className="h-4 w-4" />
          Monitoring {totalProjects} active projects
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4" data-testid="agent-stat-total">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Total</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-2xl font-bold text-neutral-800">{totalProjects}</span>
            <FolderIcon className="h-5 w-5 text-neutral-400" />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4" data-testid="agent-stat-running">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Running</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-2xl font-bold text-neutral-800">{runningProjects}</span>
            <ArrowPathIcon className="h-5 w-5 text-emerald-500" />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4" data-testid="agent-stat-healthy">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Healthy</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-2xl font-bold text-neutral-800">{healthyProjects}</span>
            <CheckCircleIcon className="h-5 w-5 text-sky-500" />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4" data-testid="agent-stat-attention">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Needs attention</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-2xl font-bold text-neutral-800">{attentionProjects}</span>
            <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
            data-testid={`project-card-${project.id}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800">{project.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{project.repository}</p>
              </div>

              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[project.status] || 'bg-neutral-100 text-neutral-700 ring-neutral-200'}`}
              >
                {project.status}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
              <span>{project.branch}</span>
              <span className={`font-medium ${healthStyles[project.health] || 'text-neutral-600'}`}>{project.health}</span>
            </div>

            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs font-medium text-neutral-500">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-600">{project.summary}</p>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3 text-xs text-neutral-500">
              <span>Mode: {project.mode}</span>
              <span>{project.lastUpdated}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AgentDashboard;
