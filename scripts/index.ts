export function step(name: string, command: string, condition: () => boolean = () => true) {
  return {
    name,
    command,
    condition,
  };
}

export type Step = ReturnType<typeof step>;

function log(message: string) {
  console.log(`\n${message}\n`);
}

export async function run(name: string, ...steps: Step[]) {
  const { execSync } = await import('child_process');

  for (const step of steps) {
    if (!step.condition()) {
      log(`- Skipping step "${name}/${step.name}"...`);
      continue;
    }

    try {
      log(`> Running step "${name}/${step.name}"...`);
      execSync(step.command, { stdio: 'inherit' });
    } catch {
      console.error(`x Step "${name}/${step.name}" failed.`);
      process.exit(1);
    }
  }
}
