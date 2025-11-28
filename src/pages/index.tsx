import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProjectCard from '@/components/ui/ProjectCard';
import DiscordWidget from '@/components/DiscordWidget';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const stats = [
    { label: 'Total Projects', value: '7', change: '+2 this year' },
    { label: 'Live Apps', value: '4', change: '+1 this month', color: 'text-discord-success' },
    { label: 'GitHub Stars', value: '1.2k+', change: '+240 this quarter' },
  ];

  return (
    <div className="flex min-h-screen bg-discord-dark text-discord-text-primary">
      <Sidebar className="hidden md:block" />
      <div className="flex flex-1 flex-col w-full">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, <span className="text-discord-accent">Alex</span>
              </h1>
              <p className="text-discord-text-secondary max-w-2xl">
                Senior Full-Stack Engineer specializing in scalable web architectures, 
                real-time systems, and developer tooling. Building secure, performant 
                applications with TypeScript, React, and Node.js.
              </p>
            </motion.section>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {stats.map((stat, i) => (
                <Card key={i} className="text-center p-5">
                  <div className="text-sm text-discord-text-muted mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-xs ${stat.color || 'text-discord-text-secondary'}`}>
                    {stat.change}
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Featured Projects */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold">Featured Projects</h2>
                <a
                  href="/projects"
                  className="text-discord-accent hover:underline text-sm flex items-center gap-1"
                >
                  View all <i className="fas fa-arrow-right text-xs"></i>
                </a>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {projects.slice(0, 2).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </motion.section>

            {/* About Me */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <Card>
                <h2 className="text-2xl font-bold mb-4">About Me</h2>
                <div className="prose prose-discord max-w-none">
                  <p className="mb-4">
                    I'm a passionate <strong>Full-Stack Developer</strong> with 6+ years of experience 
                    designing and building high-impact web applications for startups and enterprise clients.
                  </p>
                  <p className="mb-4">
                    My expertise lies in creating <strong>real-time collaborative systems</strong> (think Figma, 
                    Notion, or Google Docs), secure authentication flows, and developer-first APIs.
                  </p>
                  <p>
                    I believe in <strong>clean architecture</strong>, comprehensive testing, and shipping 
                    value early. When I'm not coding, I contribute to open-source, write technical guides, 
                    and mentor junior developers in my Discord community.
                  </p>
                </div>
              </Card>
            </motion.section>

            {/* Discord */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              id="discord"
            >
              <Card>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <i className="fab fa-discord text-discord-accent"></i>
                  Join My Dev Community
                </h2>
                <p className="text-discord-text-secondary mb-5">
                  A space for open-source collaboration, tech discussions, and live coding sessions.
                </p>
                <DiscordWidget />
              </Card>
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  );
}
